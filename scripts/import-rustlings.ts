import fs from 'fs';
import path from 'path';

interface ExerciseData {
  id: string;
  name: string;
  path: string;
  topic: string;
  mode: 'compile' | 'test';
  hint: string;
  code: string;
}

// Define exercise order and topics
const exerciseOrder = [
  // Modules (ch 14)
  { topic: 'modules', files: ['modules1', 'modules2', 'modules3'] },
  // Hashmaps (ch 15)
  { topic: 'hashmaps', files: ['hashmaps1', 'hashmaps2', 'hashmaps3'] },
  // Lifetimes (ch 16 - skipping quiz3)
  { topic: 'lifetimes', files: ['lifetimes1', 'lifetimes2', 'lifetimes3'] },
  // Tests (ch 17)
  { topic: 'tests', files: ['tests1', 'tests2', 'tests3', 'tests4'] },
  // Iterators (ch 18)
  { topic: 'iterators', files: ['iterators1', 'iterators2', 'iterators3', 'iterators4', 'iterators5'] },
  // Threads (ch 19)
  { topic: 'threads', files: ['threads1', 'threads2', 'threads3'] },
  // Smart Pointers (ch 20)
  { topic: 'smart_pointers', files: ['box1', 'arc1', 'cow1', 'rc1'] },
  // Macros (ch 21)
  { topic: 'macros', files: ['macros1', 'macros2', 'macros3', 'macros4'] },
  // Conversions (ch 22)
  { topic: 'conversions', files: ['from_into', 'from_str', 'try_from_into', 'as_ref_mut', 'using_as'] },
];

function extractHint(code: string): string {
  // Look for hint in comments (usually in first few lines)
  const hintMatch = code.match(/\/\/ Execute `rustlings hint .*?` or use the `hint` watch subcommand for a\n\/\/ hint\./);
  
  // Look for more detailed hints in comments
  const lines = code.split('\n');
  const hintLines: string[] = [];
  let inHintBlock = false;
  
  for (const line of lines) {
    if (line.includes('// Hint:') || line.includes('// Help:')) {
      inHintBlock = true;
      continue;
    }
    if (inHintBlock && line.startsWith('//')) {
      hintLines.push(line.replace(/^\/\/ ?/, ''));
    } else if (inHintBlock) {
      break;
    }
  }
  
  if (hintLines.length > 0) {
    return hintLines.join(' ').trim();
  }
  
  // Default hints based on topic
  return "Fix the code to make it compile!";
}

function detectMode(code: string): 'compile' | 'test' {
  return code.includes('#[cfg(test)]') || code.includes('#[test]') ? 'test' : 'compile';
}

function parseExercise(topic: string, filename: string): ExerciseData | null {
  const filePath = `/tmp/${filename}.rs`;
  
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File ${filePath} not found`);
    return null;
  }
  
  const code = fs.readFileSync(filePath, 'utf-8');
  const hint = extractHint(code);
  const mode = detectMode(code);
  
  return {
    id: filename,
    name: filename,
    path: `exercises/${topic}/${filename}.rs`,
    topic,
    mode,
    hint,
    code,
  };
}

function formatExerciseAsTS(ex: ExerciseData): string {
  const escapedHint = ex.hint.replace(/"/g, '\\"');
  const escapedCode = ex.code.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  
  return `  {
    id: "${ex.id}",
    name: "${ex.name}",
    path: "${ex.path}",
    topic: "${ex.topic}",
    mode: "${ex.mode}",
    hint: "${escapedHint}",
    code: \`${escapedCode}\`,
  }`;
}

// Main execution
const exercises: ExerciseData[] = [];

for (const { topic, files } of exerciseOrder) {
  for (const filename of files) {
    const exercise = parseExercise(topic, filename);
    if (exercise) {
      exercises.push(exercise);
    }
  }
}

console.log(`Parsed ${exercises.length} exercises`);
console.log('\nGenerated TypeScript entries:');
console.log('');

// Output the exercises as TypeScript
for (const ex of exercises) {
  console.log(formatExerciseAsTS(ex) + ',');
  console.log('');
}

console.log('\n✅ Script complete! Copy the output above into server/exercises-data.ts');
