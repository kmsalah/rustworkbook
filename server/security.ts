import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

// Rate limiting for compilation endpoint
export const compileRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per user
  message: {
    error: 'Too many compilation requests. Please wait before trying again.',
    retryAfter: '60 seconds'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Use user ID for rate limiting if authenticated, otherwise use IP (with IPv6 support)
  keyGenerator: (req: any) => {
    if (req.user?.claims?.sub) {
      return `user:${req.user.claims.sub}`;
    }
    return ipKeyGenerator(req);
  },
});

// Stricter rate limiter for anonymous users (shouldn't happen, but defense in depth)
export const anonymousRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3, // Only 3 requests per minute for non-authenticated
  message: { error: 'Sign in required to continue executing code' },
  skip: (req: any) => req.isAuthenticated && req.isAuthenticated(),
});

// Security monitoring
export class SecurityMonitor {
  private static compilationAttempts: Map<string, number> = new Map();
  private static failedAttempts: Map<string, number> = new Map();

  static logCompilation(userId: string | undefined, success: boolean) {
    if (!userId) return; // Skip if no user ID
    
    const key = userId;
    const attempts = this.compilationAttempts.get(key) || 0;
    this.compilationAttempts.set(key, attempts + 1);

    if (!success) {
      const failed = this.failedAttempts.get(key) || 0;
      this.failedAttempts.set(key, failed + 1);

      // Alert if user has too many failures (potential attack)
      if (failed > 50) {
        console.error(`⚠️ SECURITY ALERT: User ${userId} has ${failed} failed compilations`);
      }
    }

    // Cleanup old entries periodically (simple memory management)
    if (this.compilationAttempts.size > 1000) {
      const firstKey = this.compilationAttempts.keys().next().value;
      if (firstKey) {
        this.compilationAttempts.delete(firstKey);
        this.failedAttempts.delete(firstKey);
      }
    }
  }

  static getStats(userId: string | undefined) {
    if (!userId) return { total: 0, failed: 0 };
    return {
      total: this.compilationAttempts.get(userId) || 0,
      failed: this.failedAttempts.get(userId) || 0,
    };
  }
}
