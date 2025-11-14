import { z } from "zod";

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
