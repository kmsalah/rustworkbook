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
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
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
  referrer?: string,
) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
    referrer: referrer || undefined,
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Capture referrer on first visit (before login)
  app.use((req: any, res, next) => {
    if (!req.session.referrer) {
      // Check for UTM source first, then document referrer header
      const utmSource = req.query.utm_source || req.query.ref;
      const httpReferrer = req.get('Referer');
      
      if (utmSource) {
        req.session.referrer = String(utmSource);
      } else if (httpReferrer) {
        // Extract domain from referrer URL
        try {
          const url = new URL(httpReferrer);
          req.session.referrer = url.hostname;
        } catch {
          req.session.referrer = httpReferrer;
        }
      }
    }
    next();
  });

  const config = await getOidcConfig();
  
  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    const user = {};
    updateUserSession(user, tokens);
    // Initial upsert without referrer - referrer is added in callback handler
    await upsertUser(tokens.claims());
    verified(null, user);
  };

  // Keep track of registered strategies per domain
  const registeredStrategies = new Set<string>();

  // Helper function to ensure strategy exists for a domain
  const ensureStrategy = (domain: string) => {
    const strategyName = `replitauth:${domain}`;
    if (!registeredStrategies.has(strategyName)) {
      console.log(`[Auth] Registering strategy for domain: ${domain}`);
      const strategy = new Strategy(
        {
          name: strategyName,
          config,
          scope: "openid email profile offline_access",
          callbackURL: `https://${domain}/api/callback`,
        },
        verify,
      );
      passport.use(strategy);
      registeredStrategies.add(strategyName);
    }
  };

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req: any, res, next) => {
    const hostname = req.hostname;
    console.log(`[Auth] Login initiated from hostname: ${hostname}`);
    ensureStrategy(hostname);
    passport.authenticate(`replitauth:${hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    } as any)(req, res, next);
  });

  app.get("/api/callback", (req: any, res, next) => {
    const hostname = req.hostname;
    console.log(`[Auth] Callback received at hostname: ${hostname}`);
    ensureStrategy(hostname);
    
    // Use custom callback to handle referrer after successful auth
    passport.authenticate(`replitauth:${hostname}`, async (err: any, user: any, info: any) => {
      if (err) {
        console.error("[Auth] Authentication error:", err);
        return res.redirect("/api/login");
      }
      if (!user) {
        console.log("[Auth] No user returned, redirecting to login");
        return res.redirect("/api/login");
      }
      
      // Check if this is a new user before upserting
      const isNewUser = user.claims?.sub ? await storage.isUserNew(user.claims.sub) : false;
      
      // Log the user in
      req.login(user, async (loginErr: any) => {
        if (loginErr) {
          console.error("[Auth] Login error:", loginErr);
          return res.redirect("/api/login");
        }
        
        // Now update the user with referrer from session (request-scoped, no race)
        const referrer = req.session?.referrer;
        if (referrer && user.claims?.sub) {
          try {
            await upsertUser(user.claims, referrer);
            console.log(`[Auth] Updated user ${user.claims.sub} with referrer: ${referrer}`);
            // Clear the referrer after successful use to prevent reuse
            delete req.session.referrer;
          } catch (e) {
            console.error("[Auth] Failed to update referrer:", e);
          }
        }
        
        // Redirect all users to IDE after login
        if (isNewUser) {
          console.log(`[Auth] New user signup: ${user.claims?.sub}`);
        }
        res.redirect("/ide");
      });
    })(req, res, next);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
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
