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

  it('should allow anonymous for first 3 exercises', async () => {
    const response = await request(app)
      .post('/api/compile')
      .send({
        code: 'fn main() { println!("test"); }',
        mode: 'compile',
        exerciseId: 'intro1',
      });

    expect(response.status).toBe(200);
  });
  
  it('should require authentication for premium exercises', async () => {
    const response = await request(app)
      .post('/api/compile')
      .send({
        code: 'fn main() { println!("test"); }',
        mode: 'compile',
        exerciseId: 'functions1',
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
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
