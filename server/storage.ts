// Referenced from Replit Auth blueprint and PostgreSQL database blueprint
import type { Exercise, User, UpsertUser } from "@shared/schema";
import { users, userProgress } from "@shared/schema";
import { exercises } from "./exercises-data";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Exercise operations (still in-memory)
  getAllExercises(): Promise<Exercise[]>;
  getExerciseById(id: string): Promise<Exercise | undefined>;
  
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Progress tracking (database-backed)
  getUserProgress(userId: string): Promise<string[]>;
  markExerciseComplete(userId: string, exerciseId: string): Promise<void>;
  isExerciseComplete(userId: string, exerciseId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  private exercises: Map<string, Exercise>;

  constructor() {
    // Keep exercises in memory (they don't change)
    this.exercises = new Map();
    exercises.forEach(ex => this.exercises.set(ex.id, ex));
  }

  // Exercise operations
  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExerciseById(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }

  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Progress tracking
  async getUserProgress(userId: string): Promise<string[]> {
    const progress = await db
      .select({ exerciseId: userProgress.exerciseId })
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
    
    return progress.map(p => p.exerciseId);
  }

  async markExerciseComplete(userId: string, exerciseId: string): Promise<void> {
    await db
      .insert(userProgress)
      .values({ userId, exerciseId })
      .onConflictDoNothing({
        target: [userProgress.userId, userProgress.exerciseId],
      });
  }

  async isExerciseComplete(userId: string, exerciseId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.exerciseId, exerciseId)
        )
      );
    
    return !!result;
  }
}

export const storage = new DatabaseStorage();
