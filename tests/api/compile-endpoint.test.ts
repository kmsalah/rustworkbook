import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('/api/compile Endpoint (E2E)', () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  it('should allow anonymous users up to 5 compilations per session', async () => {
    const response = await request(app)
      .post('/api/compile')
      .send({
        code: 'fn main() { println!("test"); }',
        mode: 'compile',
        exerciseId: 'intro1',
      });

    expect(response.status).toBe(200);
  });
  
  it('should allow anonymous for any exercise within session limit', async () => {
    // Even premium exercises work for anonymous users within their 5-compile session limit
    const response = await request(app)
      .post('/api/compile')
      .send({
        code: 'fn main() { println!("test"); }',
        mode: 'compile',
        exerciseId: 'functions1',
      });

    expect(response.status).toBe(200); // Should work within session limit
  });

  it('should validate request body', async () => {
    const response = await request(app)
      .post('/api/compile')
      .send({
        code: 'fn main() {}',
        // missing mode and exerciseId
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  // Note: Real compilation tests require authentication
  // These are tested in piston-integration.test.ts
});
