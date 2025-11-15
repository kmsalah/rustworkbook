import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('Exercise API Endpoints', () => {
  let app: Express;
  let server: any;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    server = await registerRoutes(app);
  });

  describe('GET /api/exercises', () => {
    it('should return all exercises without authentication', async () => {
      const response = await request(app)
        .get('/api/exercises')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(30);
      
      const firstEx = response.body[0];
      expect(firstEx).toHaveProperty('id');
      expect(firstEx).toHaveProperty('name');
      expect(firstEx).toHaveProperty('topic');
      expect(firstEx).toHaveProperty('code');
      expect(firstEx).toHaveProperty('hint');
      expect(firstEx).toHaveProperty('mode');
    });

    it('should include all 21 topics', async () => {
      const response = await request(app)
        .get('/api/exercises')
        .expect(200);

      const topics = [...new Set(response.body.map((ex: any) => ex.topic))];
      
      expect(topics).toContain('intro');
      expect(topics).toContain('variables');
      expect(topics).toContain('functions');
      expect(topics).toContain('modules');
      expect(topics).toContain('hashmaps');
      expect(topics).toContain('lifetimes');
      expect(topics).toContain('tests');
      expect(topics).toContain('iterators');
      expect(topics).toContain('threads');
      expect(topics).toContain('smart_pointers');
      expect(topics).toContain('macros');
      expect(topics).toContain('conversions');
      
      expect(topics.length).toBe(21);
    });

    it('should have valid exercise modes', async () => {
      const response = await request(app)
        .get('/api/exercises')
        .expect(200);

      const modes = response.body.map((ex: any) => ex.mode);
      modes.forEach((mode: string) => {
        expect(['compile', 'test']).toContain(mode);
      });
    });
  });

  describe('GET /api/exercises/:id', () => {
    it('should return a specific exercise', async () => {
      const response = await request(app)
        .get('/api/exercises/intro1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 'intro1');
      expect(response.body).toHaveProperty('name', 'intro1');
      expect(response.body).toHaveProperty('topic', 'intro');
      expect(response.body.code).toContain('main');
    });

    it('should return 404 for non-existent exercise', async () => {
      await request(app)
        .get('/api/exercises/nonexistent')
        .expect(404);
    });
  });

  describe('GET /api/hint/:id', () => {
    it('should return hint for an exercise', async () => {
      const response = await request(app)
        .get('/api/hint/intro1')
        .expect(200);

      expect(response.body).toHaveProperty('hint');
      expect(typeof response.body.hint).toBe('string');
      expect(response.body.hint.length).toBeGreaterThan(0);
    });

    it('should return 404 for non-existent exercise hint', async () => {
      await request(app)
        .get('/api/hint/nonexistent')
        .expect(404);
    });
  });
});
