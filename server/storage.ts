import type { Exercise } from "@shared/schema";
import { exercises } from "./exercises-data";

export interface IStorage {
  getAllExercises(): Promise<Exercise[]>;
  getExerciseById(id: string): Promise<Exercise | undefined>;
}

export class MemStorage implements IStorage {
  private exercises: Map<string, Exercise>;

  constructor() {
    this.exercises = new Map();
    exercises.forEach(ex => this.exercises.set(ex.id, ex));
  }

  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExerciseById(id: string): Promise<Exercise | undefined> {
    return this.exercises.get(id);
  }
}

export const storage = new MemStorage();
