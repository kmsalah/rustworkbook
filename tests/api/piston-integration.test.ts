import { describe, it, expect } from 'vitest';
import { pistonClient } from '../../server/piston';

describe('Piston API Integration', () => {
  it('should compile and run simple Rust code', async () => {
    const code = 'fn main() { println!("Hello from Piston!"); }';
    const result = await pistonClient.compileRust(code, 'compile');

    expect(result.success).toBe(true);
    expect(result.output).toContain('Hello from Piston!');
    expect(result.exitCode).toBe(0);
  }, 30000); // 30s timeout for API call

  it('should handle compilation errors', async () => {
    const code = 'fn main() { this_will_not_compile(); }';
    const result = await pistonClient.compileRust(code, 'compile');

    expect(result.success).toBe(false);
    expect(result.stderr).toBeTruthy();
    expect(result.exitCode).toBeGreaterThan(0);
  }, 30000);

  it('should handle runtime errors', async () => {
    const code = 'fn main() { panic!("Test panic"); }';
    const result = await pistonClient.compileRust(code, 'compile');

    // Compilation succeeds, but runtime fails
    expect(result.stderr).toContain('panic');
  }, 30000);

  it('should execute code without dangerous operations', async () => {
    // This would fail with local execution security, but Piston handles it safely
    const code = 'fn main() { println!("Safe code"); }';
    const result = await pistonClient.compileRust(code, 'compile');

    expect(result.success).toBe(true);
    expect(result.output).toContain('Safe code');
  }, 30000);
});
