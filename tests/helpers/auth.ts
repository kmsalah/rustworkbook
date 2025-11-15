import { type Express } from 'express';
import request from 'supertest';

export async function createAuthenticatedSession(app: Express, userId: string = 'test_user_123'): Promise<string> {
  const agent = request.agent(app);
  
  agent.set('X-Test-User-Id', userId);
  
  return userId;
}

export function getAuthHeaders(userId: string = 'test_user_123') {
  return {
    'X-Test-User-Id': userId,
  };
}
