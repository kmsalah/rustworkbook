import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('Progress API Endpoints', () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  describe('GET /api/progress', () => {
    it('should require authentication', async () => {
      await request(app)
        .get('/api/progress')
        .expect(401);
    });
  });

  describe('POST /api/progress/:exerciseId', () => {
    it('should require authentication', async () => {
      await request(app)
        .post('/api/progress/intro1')
        .expect(401);
    });
  });
});
