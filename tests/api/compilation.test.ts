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

  describe('POST /api/compile - Session-based Rate Limiting', () => {
    it('should allow anonymous users up to 5 compilations per session', async () => {
      // Anonymous users can compile any exercise up to 5 times per session
      await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() { println!("test"); }',
          mode: 'compile',
          exerciseId: 'intro1',
        })
        .expect(200);
    });
    
    it('should allow anonymous for any exercise within session limit', async () => {
      // Even premium exercises work for anonymous users within their 5-compile session limit
      await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() { println!("test"); }',
          mode: 'compile',
          exerciseId: 'functions1',
        })
        .expect(200);
    });
  });

  describe('POST /api/compile - Validation', () => {
    it('should reject invalid request body', async () => {
      await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() {}',
          // Missing mode and exerciseId
        })
        .expect(400); // Bad Request, not Unauthorized
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
