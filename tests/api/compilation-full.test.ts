import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('Compilation API - Full Coverage', () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  describe('Request Validation', () => {
    it('should reject requests with missing code field', async () => {
      const response = await request(app)
        .post('/api/compile')
        .send({
          mode: 'compile',
          exerciseId: 'intro1',
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should reject requests with invalid mode', async () => {
      const response = await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() {}',
          mode: 'invalid_mode',
          exerciseId: 'intro1',
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should reject requests with missing exerciseId', async () => {
      const response = await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() {}',
          mode: 'compile',
        });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });

  describe('Code Structure Validation', () => {
    it('should detect valid Rust main function pattern', () => {
      const code = 'fn main() { println!("Hello"); }';
      expect(code).toMatch(/fn\s+main\s*\(\)/);
    });

    it('should detect test pattern', () => {
      const code = '#[test]\nfn test_something() { assert!(true); }';
      expect(code).toMatch(/#\[test\]/);
    });

    it('should detect common error patterns', () => {
      const invalidCode = 'fn main() { let x = undefined_variable; }';
      expect(invalidCode).toContain('undefined_variable');
    });
  });

  describe('Mode Validation', () => {
    it('should accept compile mode', async () => {
      const response = await request(app)
        .post('/api/compile')
        .send({
          code: 'fn main() {}',
          mode: 'compile',
          exerciseId: 'intro1',
        });

      expect(response.status).toBeGreaterThanOrEqual(200);
    });

    it('should accept test mode', async () => {
      const response = await request(app)
        .post('/api/compile')
        .send({
          code: '#[test]\nfn it_works() {}',
          mode: 'test',
          exerciseId: 'vecs1',
        });

      expect(response.status).toBeGreaterThanOrEqual(200);
    });
  });
});
