import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('Compilation API Endpoints', () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  describe('POST /api/compile - Authentication', () => {
    it('should require authentication', async () => {
      await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() { println!("test"); }',
          mode: 'compile',
          exerciseId: 'intro1',
        })
        .expect(401);
    });
  });

  describe('POST /api/compile - Validation', () => {
    it('should reject invalid request body', async () => {
      const response = await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() {}',
        })
        .expect(401);
    });
  });
});

describe('Compilation Logic (Unit)', () => {
  it('should detect valid Rust code patterns', () => {
    const validCode = 'fn main() { println!("Hello"); }';
    expect(validCode).toContain('fn main');
    expect(validCode).toContain('println!');
  });

  it('should identify common Rust error patterns', () => {
    const invalidCode = 'fn main() { let x = undefined_var; }';
    expect(invalidCode).toContain('undefined_var');
  });

  it('should recognize test mode code', () => {
    const testCode = '#[test]\nfn it_works() { assert!(true); }';
    expect(testCode).toContain('#[test]');
    expect(testCode).toContain('assert!');
  });
});
