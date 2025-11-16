// Piston API client for secure, sandboxed Rust code execution
// Docs: https://piston.readthedocs.io/en/latest/api-v2/

export interface PistonExecuteRequest {
  language: string;
  version: string;
  files: Array<{
    name?: string;
    content: string;
  }>;
  stdin?: string;
  args?: string[];
  compile_timeout?: number;
  run_timeout?: number;
  compile_memory_limit?: number;
  run_memory_limit?: number;
}

export interface PistonExecuteResponse {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
}

export class PistonClient {
  private baseUrl = 'https://emkc.org/api/v2/piston';

  async execute(request: PistonExecuteRequest): Promise<PistonExecuteResponse> {
    // Retry logic for transient failures
    const maxRetries = 2;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}/execute`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
          signal: AbortSignal.timeout(45000), // 45s total timeout
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Unknown error');
          throw new Error(`Piston API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return await response.json();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Don't retry on last attempt
        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          console.warn(`Piston API retry ${attempt + 1}/${maxRetries}:`, lastError.message);
        }
      }
    }

    // All retries failed
    throw new Error(`Piston API unavailable after ${maxRetries + 1} attempts: ${lastError?.message}`);
  }

  async getRuntimes() {
    const response = await fetch(`${this.baseUrl}/runtimes`);
    
    if (!response.ok) {
      throw new Error(`Piston API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Helper method to compile and run Rust code
  async compileRust(code: string, mode: 'compile' | 'test'): Promise<{
    success: boolean;
    output: string;
    stderr: string;
    exitCode: number;
  }> {
    try {
      const request: PistonExecuteRequest = {
        language: 'rust',
        version: '*', // Use latest available Rust version
        files: [
          {
            name: mode === 'test' ? 'main.rs' : 'main.rs',
            content: mode === 'test' ? this.wrapTestCode(code) : code,
          },
        ],
        compile_timeout: 30000, // 30 seconds
        run_timeout: 10000,     // 10 seconds
      };

      const result = await this.execute(request);

      // Check compilation result
      if (result.compile && result.compile.code !== 0) {
        return {
          success: false,
          output: result.compile.stdout || '',
          stderr: result.compile.stderr || result.compile.output || '',
          exitCode: result.compile.code,
        };
      }

      // If compilation succeeded, return run result
      return {
        success: result.run.code === 0,
        output: result.run.stdout || result.run.output || '',
        stderr: result.run.stderr || '',
        exitCode: result.run.code,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Provide user-friendly error messages
      if (errorMessage.includes('unavailable') || errorMessage.includes('timeout')) {
        return {
          success: false,
          output: '',
          stderr: 'Compilation service temporarily unavailable. Please try again in a moment.',
          exitCode: 1,
        };
      }

      return {
        success: false,
        output: '',
        stderr: `Compilation error: ${errorMessage}`,
        exitCode: 1,
      };
    }
  }

  // Wrap code for test mode (similar to cargo test)
  private wrapTestCode(code: string): string {
    // If code already has test infrastructure, use as-is
    if (code.includes('#[test]') || code.includes('#[cfg(test)]')) {
      return code;
    }

    // Otherwise, wrap in a test runner
    return `
${code}

fn main() {
    println!("Running tests...");
    // Note: Piston doesn't support cargo test directly
    // For basic testing, we'd need to implement a simple test runner
    // or use the code as-is if it has #[test] attributes
}
`;
  }
}

export const pistonClient = new PistonClient();
