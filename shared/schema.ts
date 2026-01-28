import { z } from "zod";
import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Exercise data structure based on Rustlings format
export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(),
  topic: z.string(),
  mode: z.enum(["compile", "test"]),
  hint: z.string(),
  code: z.string(),
});

export type Exercise = z.infer<typeof exerciseSchema>;

// Compilation result from Rust compiler
export const compilationResultSchema = z.object({
  success: z.boolean(),
  output: z.string(),
  stderr: z.string(),
  exitCode: z.number(),
});

export type CompilationResult = z.infer<typeof compilationResultSchema>;

// Progress tracking
export const progressSchema = z.object({
  completedExercises: z.array(z.string()),
  currentExercise: z.string().optional(),
});

export type Progress = z.infer<typeof progressSchema>;

// Request schemas
export const compileRequestSchema = z.object({
  code: z.string(),
  mode: z.enum(["compile", "test"]),
  exerciseId: z.string(),
});

export type CompileRequest = z.infer<typeof compileRequestSchema>;

// Database Tables - Referenced from Replit Auth blueprint

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  referrer: varchar("referrer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// User progress table - tracks completed exercises per user
export const userProgress = pgTable("user_progress", {
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  exerciseId: varchar("exercise_id").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
}, (table) => ({
  // Unique constraint: a user can only complete each exercise once
  userExerciseUnique: uniqueIndex("user_exercise_unique_idx").on(table.userId, table.exerciseId),
}));
