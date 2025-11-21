// Referenced from Replit Auth blueprint
import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  
  // Only treat as production if explicitly set AND deployed
  const isProduction = process.env.NODE_ENV === "production" && process.env.REPLIT_DEPLOYMENT === '1';
  
  // Determine cookie domain for production
  let cookieOptions: any = {
    httpOnly: true,
    secure: isProduction,
    maxAge: sessionTtl,
    sameSite: 'lax', // Lax allows navigation from external sites
  };
  
  // Only set cookie domain in actual production deployment
  // In development, let the browser handle cookies normally for replit.dev domains
  if (isProduction) {
    console.log('[Auth] Actual production deployment detected, setting cookie domain to .rustworkbook.com');
    cookieOptions.domain = '.rustworkbook.com';
  }
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false, // Only save sessions that have been modified
    cookie: cookieOptions,
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };

  // Get canonical host from environment
  const replitDomains = process.env.REPLIT_DOMAINS?.split(',') || [];
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Find the best host to use for callbacks
  let callbackHost;
  if (isProduction && replitDomains.includes('rustworkbook.com')) {
    // Prefer rustworkbook.com if it's configured
    callbackHost = 'rustworkbook.com';
  } else if (replitDomains.length > 0) {
    // Use first available domain
    callbackHost = replitDomains[0];
  } else {
    // Fallback to repl.co domain
    callbackHost = process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co';
  }
  
  // Register strategy with the callback URL
  const strategy = new Strategy(
    {
      name: "replitauth",
      config,
      scope: "openid email profile offline_access",
      callbackURL: `https://${callbackHost}/api/callback`,
    },
    verify,
  );
  passport.use(strategy);

  passport.serializeUser((user: any, cb) => {
    // Persist the entire user object including claims
    cb(null, user);
  });
  
  passport.deserializeUser((user: any, cb) => {
    // Restore the user object from session
    cb(null, user);
  });

  app.get("/api/login", (req, res, next) => {
    // Use the actual request hostname for the callback URL
    const protocol = req.protocol;
    const host = req.get("host");
    const callbackURL = `${protocol}://${host}/api/callback`;
    
    console.log(`[Auth] Login initiated from ${protocol}://${host}, callback URL: ${callbackURL}`);
    
    passport.authenticate("replitauth", {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
      callbackURL: callbackURL, // Dynamic callback URL based on request
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    // Use the actual request hostname for validation
    const protocol = req.protocol;
    const host = req.get("host");
    const callbackURL = `${protocol}://${host}/api/callback`;
    
    console.log(`[Auth] Callback received at ${protocol}://${host}`);
    
    passport.authenticate("replitauth", {
      successReturnToOrRedirect: "/ide",
      failureRedirect: "/api/login",
      callbackURL: callbackURL, // Dynamic callback URL for validation
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    const origin = `${req.protocol}://${req.get("host")}`;
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: origin,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;

  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken, {
      clientId: process.env.REPL_ID!,
    });
    updateUserSession(user, tokenResponse);
    
    // Persist refreshed tokens to session
    req.login(user, (err) => {
      if (err) {
        console.error("Failed to persist refreshed session:", err);
        return res.status(401).json({ message: "Unauthorized" });
      }
      return next();
    });
  } catch (error) {
    console.error("Token refresh failed:", error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
