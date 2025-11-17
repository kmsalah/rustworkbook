// localStorage utilities for code persistence

const CODE_STORAGE_PREFIX = 'rustworkbook_code_';
const PROGRESS_STORAGE_KEY = 'rustworkbook_local_progress';

// Save user's code for a specific exercise
export function saveExerciseCode(exerciseId: string, code: string) {
  try {
    localStorage.setItem(`${CODE_STORAGE_PREFIX}${exerciseId}`, code);
  } catch (error) {
    console.error('Failed to save code to localStorage:', error);
  }
}

// Load user's saved code for a specific exercise
export function loadExerciseCode(exerciseId: string): string | null {
  try {
    return localStorage.getItem(`${CODE_STORAGE_PREFIX}${exerciseId}`);
  } catch (error) {
    console.error('Failed to load code from localStorage:', error);
    return null;
  }
}

// Clear saved code for a specific exercise
export function clearExerciseCode(exerciseId: string) {
  try {
    localStorage.removeItem(`${CODE_STORAGE_PREFIX}${exerciseId}`);
  } catch (error) {
    console.error('Failed to clear code from localStorage:', error);
  }
}

// Clear all saved exercise code
export function clearAllExerciseCode() {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CODE_STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Failed to clear all code from localStorage:', error);
  }
}

// Get local progress (for merging on sign-in)
export function getLocalProgress(): Set<string> {
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error('Failed to load local progress:', error);
    return new Set();
  }
}

// Save local progress
export function saveLocalProgress(completedExercises: Set<string>) {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(Array.from(completedExercises)));
  } catch (error) {
    console.error('Failed to save local progress:', error);
  }
}

// Clear local progress
export function clearLocalProgress() {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear local progress:', error);
  }
}