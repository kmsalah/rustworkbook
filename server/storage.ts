// Referenced from Replit Auth blueprint and PostgreSQL database blueprint
import type { Exercise, User, UpsertUser } from "@shared/schema";
import { users, userProgress } from "@shared/schema";
import { exercises } from "./exercises-data";
import { db } from "./db";
import { eq, and, sql, gte, not, like, or } from "drizzle-orm";

export interface UserStats {
  totalUsers: number;
  monthlyUsers: number;
  dailyUsers: number;
  topReferrers: { referrer: string; count: number }[];
}

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
  
  // Stats
  getUserStats(): Promise<UserStats>;
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
    try {
      const userId = userData.id;
      
      // Must have an ID to upsert
      if (!userId) {
        throw new Error("User ID is required for upsert");
      }
      
      // First, try to find user by ID
      const existingUser = await this.getUser(userId);
      
      if (existingUser) {
        // Update existing user by ID
        const [user] = await db
          .update(users)
          .set({
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileImageUrl: userData.profileImageUrl,
            updatedAt: new Date(),
          })
          .where(eq(users.id, userId))
          .returning();
        return user;
      } else {
        // Check if email already exists (different user with same email)
        if (userData.email) {
          const [existingByEmail] = await db
            .select()
            .from(users)
            .where(eq(users.email, userData.email));
          
          if (existingByEmail) {
            // Update existing user by email (user might have changed their ID)
            const [user] = await db
              .update(users)
              .set({
                id: userId, // Update to new ID
                firstName: userData.firstName,
                lastName: userData.lastName,
                profileImageUrl: userData.profileImageUrl,
                updatedAt: new Date(),
              })
              .where(eq(users.email, userData.email))
              .returning();
            return user;
          }
        }
        
        // Insert new user
        const [user] = await db
          .insert(users)
          .values(userData)
          .returning();
        return user;
      }
    } catch (error: any) {
      // If we still get a unique constraint error, log and rethrow
      console.error("Error upserting user:", error?.message || error);
      throw error;
    }
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

  // Get user statistics excluding test accounts
  async getUserStats(): Promise<UserStats> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Filter out test accounts: exclude @example.com, @rustlings.dev emails and test_ IDs
    const isRealUser = and(
      not(like(users.email, '%@example.com')),
      not(like(users.email, '%@rustlings.dev')),
      not(like(users.id, 'test_%'))
    );

    // Total real users
    const [totalResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(isRealUser);

    // Monthly users (signed up this month)
    const [monthlyResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(and(isRealUser, gte(users.createdAt, startOfMonth)));

    // Daily users (signed up today)
    const [dailyResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(and(isRealUser, gte(users.createdAt, startOfDay)));

    // Top referrers
    const referrerResults = await db
      .select({
        referrer: users.referrer,
        count: sql<number>`count(*)::int`,
      })
      .from(users)
      .where(and(isRealUser, sql`${users.referrer} IS NOT NULL AND ${users.referrer} != ''`))
      .groupBy(users.referrer)
      .orderBy(sql`count(*) DESC`)
      .limit(10);

    return {
      totalUsers: totalResult?.count ?? 0,
      monthlyUsers: monthlyResult?.count ?? 0,
      dailyUsers: dailyResult?.count ?? 0,
      topReferrers: referrerResults.map(r => ({
        referrer: r.referrer || 'unknown',
        count: r.count,
      })),
    };
  }
}

export const storage = new DatabaseStorage();
