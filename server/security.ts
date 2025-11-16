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
  message: { error: 'Authentication required' },
  skip: (req: any) => req.isAuthenticated && req.isAuthenticated(),
});

// Code validation
export interface CodeValidationResult {
  valid: boolean;
  error?: string;
}

export function validateCode(code: string): CodeValidationResult {
  // Size limit: 100KB (way more than any Rustlings exercise needs)
  const MAX_CODE_SIZE = 100 * 1024;
  if (code.length > MAX_CODE_SIZE) {
    return {
      valid: false,
      error: `Code exceeds maximum size of ${MAX_CODE_SIZE} bytes`
    };
  }

  // Detect potentially dangerous patterns - comprehensive blocking
  const dangerousPatterns = [
    // Process execution
    /std::process::/i,                  // ALL process operations
    /Command::/i,                       // Command execution
    
    // File system operations (READ and WRITE)
    /std::fs::/i,                       // ALL filesystem operations  
    /File::/i,                          // File operations
    /OpenOptions::/i,                   // File opening
    /read_to_string/i,                  // File reading
    /read_dir/i,                        // Directory reading
    /metadata/i,                        // File metadata
    
    // Include macros (compile-time file reading)
    /include_str!/i,                    // Include file as string
    /include_bytes!/i,                  // Include file as bytes
    
    // Environment variables
    /std::env::/i,                      // ALL environment access
    /env::var/i,                        // Env var reading
    /env::vars/i,                       // Env vars iteration
    
    // Network access
    /std::net::/i,                      // ALL network operations
    /TcpStream/i,                       // TCP connections
    /UdpSocket/i,                       // UDP connections
    
    // Unsafe operations
    /unsafe\s*\{/i,                     // Unsafe blocks
    /std::ptr::/i,                      // Pointer operations
    /std::mem::transmute/i,             // Memory transmutation
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      return {
        valid: false,
        error: 'Code contains blocked operations. Rustlings exercises do not require: file system access, environment variables, network operations, unsafe code, or external processes. If you believe this is an error, please contact support.'
      };
    }
  }
  
  // Additional check: block "use" statements that might alias dangerous modules
  if (/use\s+std::(fs|env|net|process)/i.test(code)) {
    return {
      valid: false,
      error: 'Code imports blocked standard library modules (fs, env, net, process). These are not needed for Rustlings exercises.'
    };
  }

  return { valid: true };
}

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
