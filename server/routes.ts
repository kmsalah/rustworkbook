// Referenced from Replit Auth blueprint
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compileRequestSchema } from "@shared/schema";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { compileRateLimiter, anonymousRateLimiter, SecurityMonitor } from "./security";
import { pistonClient } from "./piston";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware - must be called first
  await setupAuth(app);

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

  // Educators one-pager - printable HTML page optimized for PDF
  app.get("/api/educators/one-pager", (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rust Workbook for Educators</title>
  <style>
    @page { 
      size: letter; 
      margin: 0.75in; 
    }
    * { 
      box-sizing: border-box; 
      margin: 0; 
      padding: 0; 
    }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      color: #1a1a1a;
      max-width: 8.5in;
      margin: 0 auto;
      padding: 0.5in;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f97316;
    }
    .logo {
      width: 60px;
      height: 60px;
    }
    .header-text h1 {
      font-size: 28px;
      color: #1a1a1a;
      margin-bottom: 4px;
    }
    .header-text p {
      color: #666;
      font-size: 14px;
    }
    .section {
      margin-bottom: 20px;
    }
    .section h2 {
      font-size: 16px;
      color: #f97316;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .section p {
      font-size: 14px;
      color: #444;
    }
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    .benefit-list {
      list-style: none;
    }
    .benefit-list li {
      font-size: 13px;
      padding: 6px 0;
      padding-left: 24px;
      position: relative;
    }
    .benefit-list li::before {
      content: "✓";
      color: #22c55e;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
    .topics {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .topic {
      background: #f3f4f6;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      color: #374151;
    }
    .cta {
      background: linear-gradient(135deg, #f97316, #ea580c);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin-top: 16px;
    }
    .cta h3 {
      font-size: 18px;
      margin-bottom: 8px;
    }
    .cta p {
      font-size: 14px;
      opacity: 0.95;
    }
    .cta .url {
      font-size: 20px;
      font-weight: bold;
      margin-top: 12px;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 16px 0;
    }
    .stat {
      text-align: center;
      padding: 12px;
      background: #fef3c7;
      border-radius: 6px;
    }
    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: #f97316;
    }
    .stat-label {
      font-size: 11px;
      color: #666;
    }
    .footer {
      margin-top: 20px;
      padding-top: 12px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      font-size: 11px;
      color: #888;
    }
    @media print {
      body { padding: 0; }
      .cta { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .stat { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <svg class="logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="12" fill="#f97316"/>
      <path d="M25 75V25h10v50H25zm15-25h25c2.5 0 4.5-2 4.5-4.5V35c0-2.5-2-4.5-4.5-4.5H40v-5h25c5.2 0 9.5 4.3 9.5 9.5v10.5c0 5.2-4.3 9.5-9.5 9.5H45v20h-5V50z" fill="white"/>
    </svg>
    <div class="header-text">
      <h1>Rust Workbook</h1>
      <p>Free browser-based Rust learning platform</p>
    </div>
  </div>

  <div class="section">
    <h2>Why Teach Rust?</h2>
    <p>Rust is revolutionizing systems programming. It's used by Microsoft, Google, Amazon, Meta, and now the Linux kernel. 
    Voted #1 most loved language on Stack Overflow for 8 consecutive years, Rust skills are in high demand.</p>
  </div>

  <div class="stats">
    <div class="stat">
      <div class="stat-number">96</div>
      <div class="stat-label">Exercises</div>
    </div>
    <div class="stat">
      <div class="stat-number">22</div>
      <div class="stat-label">Topics</div>
    </div>
    <div class="stat">
      <div class="stat-number">0</div>
      <div class="stat-label">Setup Required</div>
    </div>
    <div class="stat">
      <div class="stat-number">Free</div>
      <div class="stat-label">Forever</div>
    </div>
  </div>

  <div class="two-column">
    <div class="section">
      <h2>Platform Benefits</h2>
      <ul class="benefit-list">
        <li>No installations - works in any browser</li>
        <li>Real Rust compiler with actual error messages</li>
        <li>Progress tracking for each student</li>
        <li>Mobile-responsive design</li>
        <li>Based on official Rustlings curriculum</li>
        <li>Instant feedback on code</li>
      </ul>
    </div>
    <div class="section">
      <h2>Perfect For</h2>
      <ul class="benefit-list">
        <li>Computer Science courses</li>
        <li>Systems programming classes</li>
        <li>Bootcamp curriculum supplements</li>
        <li>Self-paced learning assignments</li>
        <li>Introduction to memory safety</li>
        <li>Modern language exploration</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>Topics Covered</h2>
    <div class="topics">
      <span class="topic">Variables</span>
      <span class="topic">Functions</span>
      <span class="topic">Control Flow</span>
      <span class="topic">Primitive Types</span>
      <span class="topic">Vectors</span>
      <span class="topic">Move Semantics</span>
      <span class="topic">Structs</span>
      <span class="topic">Enums</span>
      <span class="topic">Strings</span>
      <span class="topic">Modules</span>
      <span class="topic">HashMaps</span>
      <span class="topic">Options</span>
      <span class="topic">Error Handling</span>
      <span class="topic">Generics</span>
      <span class="topic">Traits</span>
      <span class="topic">Lifetimes</span>
      <span class="topic">Iterators</span>
      <span class="topic">Smart Pointers</span>
      <span class="topic">Threads</span>
      <span class="topic">Macros</span>
    </div>
  </div>

  <div class="cta">
    <h3>Get Started Today</h3>
    <p>Share this link with your students - they can start learning immediately.</p>
    <div class="url">rustworkbook.com</div>
  </div>

  <div class="footer">
    Rust Workbook uses exercises from the open-source Rustlings project under MIT License. 
    Not affiliated with the Rust Foundation or official Rust project.
  </div>
</body>
</html>
    `;
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  const httpServer = createServer(app);
  return httpServer;
}
