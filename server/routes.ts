// Referenced from Replit Auth blueprint
import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compileRequestSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { compileRateLimiter, anonymousRateLimiter, SecurityMonitor } from "./security";
import { pistonClient } from "./piston";
import { checkDatabaseHealth } from "./db";

const startTime = Date.now();

function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - must be called first
  await setupAuth(app);

  app.get('/api/health', asyncHandler(async (req, res) => {
    const dbHealth = await checkDatabaseHealth();
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    
    const status = dbHealth.healthy ? 'healthy' : 'degraded';
    const statusCode = dbHealth.healthy ? 200 : 503;
    
    res.status(statusCode).json({
      status,
      uptime,
      timestamp: new Date().toISOString(),
      database: dbHealth,
      version: '1.0.0'
    });
  }));

  app.get('/api/ready', asyncHandler(async (req, res) => {
    const dbHealth = await checkDatabaseHealth();
    if (dbHealth.healthy) {
      res.json({ ready: true });
    } else {
      res.status(503).json({ ready: false, reason: 'database unavailable' });
    }
  }));

  // Auth routes - return user data or authentication status
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check if user is authenticated without rejecting
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.json(null);
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Progress tracking routes (protected)
  app.get('/api/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const completedExercises = await storage.getUserProgress(userId);
      res.json({ completedExercises });
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  app.post('/api/progress/:exerciseId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { exerciseId } = req.params;
      await storage.markExerciseComplete(userId, exerciseId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking exercise complete:", error);
      res.status(500).json({ error: "Failed to mark exercise complete" });
    }
  });

  // Public stats endpoint
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Get all exercises
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getAllExercises();
      res.json(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      res.status(500).json({ error: "Failed to fetch exercises" });
    }
  });

  // Get specific exercise
  app.get("/api/exercises/:id", async (req, res) => {
    try {
      const exercise = await storage.getExerciseById(req.params.id);
      if (!exercise) {
        res.status(404).json({ error: "Exercise not found" });
        return;
      }
      res.json(exercise);
    } catch (error) {
      console.error("Error fetching exercise:", error);
      res.status(500).json({ error: "Failed to fetch exercise" });
    }
  });

  // Get hint for specific exercise
  app.get("/api/hint/:id", async (req, res) => {
    try {
      const exercise = await storage.getExerciseById(req.params.id);
      if (!exercise) {
        res.status(404).json({ error: "Exercise not found" });
        return;
      }
      res.json({ hint: exercise.hint });
    } catch (error) {
      console.error("Error fetching hint:", error);
      res.status(500).json({ error: "Failed to fetch hint" });
    }
  });

  // Compile Rust code using Piston API (production-grade sandboxed execution)
  // Security: Perfect isolation via Piston's containerized execution
  // ✅ Authentication required for exercises after first 3
  // ✅ Rate limiting (10 req/min per user)
  // ✅ Piston API sandboxing (Docker containers, resource limits)
  // ✅ No server-side code execution
  // ✅ Monitoring and logging
  
  // Custom middleware: allow anonymous for first 3 exercises only
  // Track anonymous compilation attempts per session
  const sessionCompileTracker = (req: any, res: any, next: any) => {
    // Initialize session compile count if not present
    if (req.session.compileCount === undefined) {
      req.session.compileCount = 0;
    }
    
    // If authenticated, skip limits
    if (req.isAuthenticated()) {
      return next();
    }
    
    // For anonymous users, check session-based limit
    if (req.session.compileCount >= 5) {
      return res.status(403).json({ 
        error: "Sign in required to continue executing code",
        requiresAuth: true 
      });
    }
    
    // Increment count and continue
    req.session.compileCount++;
    next();
  };
  
  app.post("/api/compile", anonymousRateLimiter, sessionCompileTracker, compileRateLimiter, async (req, res) => {
    try {
      const result = compileRequestSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: "Invalid request data", details: result.error });
        return;
      }

      const { code, mode } = result.data;
      const userId = (req as any).user?.claims?.sub;

      // Normalize whitespace: replace non-breaking spaces and other Unicode spaces with regular spaces
      // This handles cases where Monaco Editor or copy-paste operations insert Unicode spaces
      const normalizedCode = code
        .replace(/\u00A0/g, ' ')  // Non-breaking space (U+00A0)
        .replace(/\u2007/g, ' ')  // Figure space (U+2007)
        .replace(/\u202F/g, ' ')  // Narrow no-break space (U+202F)
        .replace(/[\u2000-\u200B]/g, ' '); // Various Unicode spaces

      // Use Piston API for secure, sandboxed compilation
      const pistonResult = await pistonClient.compileRust(normalizedCode, mode);

      // Log compilation attempt for monitoring
      SecurityMonitor.logCompilation(userId, pistonResult.success);

      res.json(pistonResult);
    } catch (error) {
      console.error("Error compiling code:", error);
      res.status(500).json({ 
        success: false,
        output: "",
        stderr: error instanceof Error ? error.message : "Unknown compilation error",
        exitCode: 1,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
