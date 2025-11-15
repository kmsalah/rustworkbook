// Referenced from Replit Auth blueprint
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { compileRequestSchema } from "@shared/schema";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { setupAuth, isAuthenticated } from "./replitAuth";

const execAsync = promisify(exec);

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

  // Compile Rust code (protected)
  // SECURITY WARNING: This endpoint executes user-supplied Rust code on the server.
  // For production use or untrusted environments, this MUST be sandboxed using:
  // - Docker containers with seccomp profiles and resource limits
  // - WebAssembly-based Rust execution (e.g., rust-wasm)
  // - Dedicated sandboxed execution services
  // This implementation is suitable ONLY for:
  // - Personal/local development environments
  // - Trusted single-user educational tools
  // - Internal learning platforms with authenticated, trusted users
  app.post("/api/compile", isAuthenticated, async (req, res) => {
    try {
      const result = compileRequestSchema.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ error: "Invalid request data", details: result.error });
        return;
      }

      const { code, mode } = result.data;

      // Normalize whitespace: replace non-breaking spaces and other Unicode spaces with regular spaces
      // This handles cases where Monaco Editor or copy-paste operations insert Unicode spaces
      const normalizedCode = code
        .replace(/\u00A0/g, ' ')  // Non-breaking space (U+00A0)
        .replace(/\u2007/g, ' ')  // Figure space (U+2007)
        .replace(/\u202F/g, ' ')  // Narrow no-break space (U+202F)
        .replace(/[\u2000-\u200B]/g, ' '); // Various Unicode spaces

      // Create a temporary directory for the Rust file
      const tempDir = join(tmpdir(), `rustlings-${Date.now()}-${Math.random().toString(36).substring(7)}`);
      await mkdir(tempDir, { recursive: true });
      const tempFile = join(tempDir, "temp.rs");

      try {
        // Write normalized code to temporary file
        await writeFile(tempFile, normalizedCode, "utf-8");

        let output = "";
        let stderr = "";
        let exitCode = 0;
        let success = false;

        if (mode === "compile") {
          // Just compile the code
          try {
            const { stdout, stderr: stderrOutput } = await execAsync(
              `rustc --crate-type bin "${tempFile}" -o "${join(tempDir, "output")}"`,
              { 
                cwd: tempDir,
                timeout: 30000, // 30 second timeout
              }
            );
            output = stdout;
            stderr = stderrOutput;
            success = true;
            
            // If compilation succeeded, try to run the binary
            if (success) {
              try {
                const { stdout: runOutput } = await execAsync(
                  `"${join(tempDir, "output")}"`,
                  { 
                    cwd: tempDir,
                    timeout: 10000, // 10 second timeout for running
                  }
                );
                output = runOutput;
              } catch (runError: any) {
                // Running failed, but compilation succeeded
                stderr = runError.stderr || runError.message;
                output = runError.stdout || "";
              }
            }
          } catch (error: any) {
            stderr = error.stderr || error.message;
            output = error.stdout || "";
            exitCode = error.code || 1;
            success = false;
          }
        } else {
          // Test mode - run cargo test
          // Create a minimal Cargo.toml
          const cargoToml = `[package]
name = "rustlings-test"
version = "0.1.0"
edition = "2021"

[[bin]]
name = "test"
path = "temp.rs"
`;
          await writeFile(join(tempDir, "Cargo.toml"), cargoToml, "utf-8");

          try {
            const { stdout, stderr: stderrOutput } = await execAsync(
              `cargo test --color never`,
              { 
                cwd: tempDir,
                timeout: 60000, // 60 second timeout for tests
              }
            );
            output = stdout;
            stderr = stderrOutput;
            success = true;
          } catch (error: any) {
            stderr = error.stderr || error.message;
            output = error.stdout || "";
            exitCode = error.code || 1;
            success = false;
          }
        }

        res.json({
          success,
          output,
          stderr,
          exitCode,
        });
      } finally {
        // Clean up temporary files
        try {
          await unlink(tempFile);
          await unlink(join(tempDir, "Cargo.toml")).catch(() => {});
          await unlink(join(tempDir, "output")).catch(() => {});
        } catch (cleanupError) {
          // Ignore cleanup errors
        }
      }
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
