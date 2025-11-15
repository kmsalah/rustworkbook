# Automated Test Suite

## Overview
This test suite provides automated regression testing for the Rustlings Web IDE. These tests run on every code change to ensure core functionality remains intact.

## Test Structure

```
tests/
├── setup.ts                          # Test environment setup
├── api/                              # API endpoint tests
│   ├── exercises.test.ts             # Exercise endpoints
│   ├── compilation.test.ts           # Compilation endpoints
│   └── progress.test.ts              # Progress tracking endpoints
└── integration/                      # Integration tests
    └── progress-tracking.test.ts     # Database integration tests
```

## Running Tests

### Run all tests once
```bash
npm test
```

### Run tests in watch mode (auto-rerun on changes)
```bash
npm run test:watch
```

### Run tests with UI
```bash
npm run test:ui
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## Test Coverage

### ✅ Exercise API (`tests/api/exercises.test.ts`)
- GET /api/exercises - Returns all 30 exercises
- GET /api/exercises/:id - Returns specific exercise
- GET /api/hint/:id - Returns exercise hint
- Validates all 21 topics are present
- Validates exercise structure (id, name, topic, code, hint, mode)

### ✅ Compilation API (`tests/api/compilation.test.ts`)
- POST /api/compile - Requires authentication
- Request validation
- Rust code pattern detection

### ✅ Progress API (`tests/api/progress.test.ts`)
- GET /api/progress - Requires authentication
- POST /api/progress/:exerciseId - Requires authentication

### ✅ Progress Tracking Integration (`tests/integration/progress-tracking.test.ts`)
**CRITICAL FOR MONETIZATION** - These tests verify:
- ✅ Empty progress for new users
- ✅ Marking exercises as complete
- ✅ Idempotent operations (no duplicates)
- ✅ Per-user isolation (User A ≠ User B)
- ✅ Database unique constraints
- ✅ Same exercise completion by different users

## Required Scripts in package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run db:push
      - run: npm test
```

### Replit Deployment
Tests automatically run on deployment when configured in `.replit`:
```toml
[deployment]
run = ["sh", "-c", "npm test && npm run build && npm start"]
```

## Writing New Tests

### API Test Template
```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('My API Tests', () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  it('should test something', async () => {
    const response = await request(app)
      .get('/api/my-endpoint')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});
```

### Integration Test Template
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../../server/db';
import { DatabaseStorage } from '../../server/storage';

describe('My Integration Tests', () => {
  let storage: DatabaseStorage;

  beforeEach(async () => {
    storage = new DatabaseStorage();
    // Clean up test data
  });

  it('should test database operations', async () => {
    // Test your database logic
  });
});
```

## Debugging Failed Tests

### View detailed error output
```bash
npm test -- --reporter=verbose
```

### Run specific test file
```bash
npm test tests/api/exercises.test.ts
```

### Run specific test
```bash
npm test -- -t "should return all exercises"
```

## Pre-Deployment Checklist

Before deploying or releasing:
- [ ] All tests pass: `npm test`
- [ ] No TypeScript errors: `npm run check`
- [ ] Progress tracking tests pass (critical for paid users)
- [ ] Database migrations applied: `npm run db:push`

## Test Maintenance

### When to Update Tests
- Adding new API endpoints → Add to `tests/api/`
- Modifying database schema → Update `tests/integration/`
- Changing exercise data → Update `tests/api/exercises.test.ts`
- Adding new features → Add corresponding test coverage

### Test Data Cleanup
Tests use unique identifiers (timestamps) to avoid conflicts. Database records are cleaned up in `beforeEach` hooks.

## Notes
- Tests require DATABASE_URL environment variable
- Progress tracking tests create temporary user records
- Tests run against development database
- Compilation tests verify authentication only (no actual rustc execution in tests)
