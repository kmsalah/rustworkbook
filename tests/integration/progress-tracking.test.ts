import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../../server/db';
import { userProgress, users } from '../../shared/schema';
import { eq, and } from 'drizzle-orm';
import { DatabaseStorage } from '../../server/storage';

describe('Progress Tracking Integration', () => {
  let storage: DatabaseStorage;
  const testUserId1 = 'test_user_' + Date.now();
  const testUserId2 = 'test_user_2_' + Date.now();

  beforeEach(async () => {
    storage = new DatabaseStorage();
    
    await db.delete(userProgress).where(eq(userProgress.userId, testUserId1));
    await db.delete(userProgress).where(eq(userProgress.userId, testUserId2));
    await db.delete(users).where(eq(users.id, testUserId1));
    await db.delete(users).where(eq(users.id, testUserId2));
    
    await db.insert(users).values({
      id: testUserId1,
      email: `test1_${Date.now()}@example.com`,
    });
    await db.insert(users).values({
      id: testUserId2,
      email: `test2_${Date.now()}@example.com`,
    });
  });

  describe('getUserProgress', () => {
    it('should return empty array for new user', async () => {
      const progress = await storage.getUserProgress(testUserId1);
      expect(progress).toEqual([]);
    });

    it('should return completed exercises', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');
      await storage.markExerciseComplete(testUserId1, 'intro2');

      const progress = await storage.getUserProgress(testUserId1);
      expect(progress).toHaveLength(2);
      expect(progress).toContain('intro1');
      expect(progress).toContain('intro2');
    });
  });

  describe('markExerciseComplete', () => {
    it('should mark exercise as complete', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');

      const isComplete = await storage.isExerciseComplete(testUserId1, 'intro1');
      expect(isComplete).toBe(true);
    });

    it('should not create duplicates (idempotent)', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');
      await storage.markExerciseComplete(testUserId1, 'intro1');
      await storage.markExerciseComplete(testUserId1, 'intro1');

      const progress = await storage.getUserProgress(testUserId1);
      expect(progress).toHaveLength(1);
    });

    it('should maintain per-user isolation', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');
      await storage.markExerciseComplete(testUserId1, 'intro2');
      await storage.markExerciseComplete(testUserId2, 'variables1');

      const user1Progress = await storage.getUserProgress(testUserId1);
      const user2Progress = await storage.getUserProgress(testUserId2);

      expect(user1Progress).toHaveLength(2);
      expect(user1Progress).toContain('intro1');
      expect(user1Progress).toContain('intro2');
      expect(user1Progress).not.toContain('variables1');

      expect(user2Progress).toHaveLength(1);
      expect(user2Progress).toContain('variables1');
      expect(user2Progress).not.toContain('intro1');
    });
  });

  describe('isExerciseComplete', () => {
    it('should return false for incomplete exercise', async () => {
      const isComplete = await storage.isExerciseComplete(testUserId1, 'intro1');
      expect(isComplete).toBe(false);
    });

    it('should return true for completed exercise', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');
      
      const isComplete = await storage.isExerciseComplete(testUserId1, 'intro1');
      expect(isComplete).toBe(true);
    });
  });

  describe('Database Constraints', () => {
    it('should enforce unique constraint on (userId, exerciseId)', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');
      await storage.markExerciseComplete(testUserId1, 'intro1');

      const records = await db
        .select()
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, testUserId1),
            eq(userProgress.exerciseId, 'intro1')
          )
        );

      expect(records).toHaveLength(1);
    });

    it('should allow same exercise for different users', async () => {
      await storage.markExerciseComplete(testUserId1, 'intro1');
      await storage.markExerciseComplete(testUserId2, 'intro1');

      const user1Complete = await storage.isExerciseComplete(testUserId1, 'intro1');
      const user2Complete = await storage.isExerciseComplete(testUserId2, 'intro1');

      expect(user1Complete).toBe(true);
      expect(user2Complete).toBe(true);
    });
  });
});
