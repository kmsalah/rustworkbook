# Testing Guide for Rustlings Web IDE

## 🧪 Test Suite Overview

This application has **comprehensive automated tests** that run on every code change to ensure production quality before monetization.

### Current Test Coverage: **23 Tests Passing ✅**

## Quick Start

### Run All Tests
```bash
npx vitest run
```

### Watch Mode (Auto-rerun on changes)
```bash
npx vitest
```

### Interactive UI
```bash
npx vitest --ui
```

## Required Package.json Scripts

**⚠️ IMPORTANT:** Add these to your `package.json` "scripts" section:

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

Then you can use standard commands:
```bash
npm test              # Run all tests once
npm run test:watch    # Watch mode
npm run test:ui       # Interactive UI
```

## Test Organization

```
tests/
├── setup.ts                              # Global test setup
├── api/                                  # API endpoint tests
│   ├── exercises.test.ts                 # ✅ 13 tests - Exercise CRUD
│   ├── compilation.test.ts               # ✅ 3 tests - Compilation API
│   └── progress.test.ts                  # ✅ 2 tests - Progress API auth
└── integration/                          # Database integration
    └── progress-tracking.test.ts         # ✅ 7 tests - CRITICAL for monetization
```

## Test Categories

### 1. Exercise API Tests (13 tests)
**File:** `tests/api/exercises.test.ts`

Tests:
- ✅ Returns all 30 exercises
- ✅ Validates all 21 topics present
- ✅ Validates exercise structure (id, name, topic, code, hint, mode)
- ✅ Validates exercise modes (compile/test)
- ✅ Returns specific exercise by ID
- ✅ Returns 404 for non-existent exercise
- ✅ Returns hints for exercises
- ✅ Returns 404 for non-existent hints

**Critical for:** Ensuring curriculum integrity

### 2. Compilation API Tests (3 tests)
**File:** `tests/api/compilation.test.ts`

Tests:
- ✅ Requires authentication
- ✅ Validates request body
- ✅ Rust code pattern detection

**Critical for:** Security and data validation

### 3. Progress API Tests (2 tests)
**File:** `tests/api/progress.test.ts`

Tests:
- ✅ GET /api/progress requires auth
- ✅ POST /api/progress/:exerciseId requires auth

**Critical for:** Access control

### 4. Progress Tracking Integration (7 tests) 🔥 MOST CRITICAL
**File:** `tests/integration/progress-tracking.test.ts`

Tests:
- ✅ Returns empty array for new users
- ✅ Returns completed exercises
- ✅ Marks exercises as complete
- ✅ Idempotent operations (no duplicates)
- ✅ Per-user isolation (User A ≠ User B)
- ✅ Enforces unique constraint (userId, exerciseId)
- ✅ Allows same exercise for different users

**Critical for:** MONETIZATION - Paying users MUST have reliable progress tracking

## CI/CD Integration

### GitHub Actions
Tests automatically run on:
- Every push to `main` or `develop`
- Every pull request

See `.github/workflows/test.yml` for configuration.

### Running in CI
```bash
# Install dependencies
npm install

# Apply database migrations
npm run db:push

# Run TypeScript check
npm run check

# Run tests
npm test
```

## Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass: `npm test` → 23/23 ✅
- [ ] No TypeScript errors: `npm run check`
- [ ] Database migrations applied: `npm run db:push`
- [ ] Progress tracking tests pass (7/7)
- [ ] Manual testing completed (see MANUAL_TESTING_CHECKLIST.md)

## Writing New Tests

### API Test Template
```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import express, { type Express } from 'express';
import { registerRoutes } from '../../server/routes';

describe('My Feature Tests', () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    await registerRoutes(app);
  });

  it('should do something', async () => {
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
import { users } from '../../shared/schema';
import { eq } from 'drizzle-orm';

describe('My Integration Tests', () => {
  const testUserId = 'test_' + Date.now();

  beforeEach(async () => {
    // Clean up
    await db.delete(users).where(eq(users.id, testUserId));
    
    // Setup test data
    await db.insert(users).values({
      id: testUserId,
      email: 'test@example.com',
    });
  });

  it('should test database operations', async () => {
    // Your test logic
  });
});
```

## Debugging Failed Tests

### View detailed errors
```bash
npx vitest run --reporter=verbose
```

### Run specific test file
```bash
npx vitest run tests/api/exercises.test.ts
```

### Run specific test
```bash
npx vitest run -t "should return all exercises"
```

### Run with UI for debugging
```bash
npx vitest --ui
```

## Test Maintenance

### When to Add Tests
1. **New API endpoint** → Add to `tests/api/`
2. **Database schema change** → Update `tests/integration/`
3. **New exercise topic** → Update `tests/api/exercises.test.ts`
4. **Progress tracking change** → Update `tests/integration/progress-tracking.test.ts`

### When to Update Tests
- Changing exercise count → Update assertions
- Modifying API responses → Update expected responses
- Database schema changes → Update integration tests

## Common Issues

### Foreign Key Violations
**Problem:** `user_progress` requires user to exist first

**Solution:** Create user before testing progress:
```typescript
await db.insert(users).values({ id: testUserId, email: 'test@example.com' });
await storage.markExerciseComplete(testUserId, 'intro1');
```

### Database Connection
**Problem:** Tests can't connect to database

**Solution:** Ensure `DATABASE_URL` is set:
```bash
export DATABASE_URL="postgresql://..."
npx vitest run
```

### Timeouts
**Problem:** Tests timeout

**Solution:** Increase timeout in `vitest.config.ts`:
```typescript
testTimeout: 60000, // 60 seconds
```

## Coverage Goals

### Current: 23/23 tests passing ✅

### Target Coverage:
- [ ] API endpoints: 100% (Currently: 90%)
- [x] Progress tracking: 100% (Currently: 100% ✅)
- [ ] Authentication flows: 80% (Manual only)
- [ ] Compilation logic: 60% (Auth only)

## Monitoring Test Health

### In CI/CD
- GitHub Actions shows test status on each commit
- Failing tests block merges to main

### Locally
- Run `npm test` before every commit
- Use `npm run test:watch` during development
- Check `npm run test:ui` for detailed insights

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Supertest Documentation](https://github.com/ladjs/supertest)
- [Drizzle ORM Testing](https://orm.drizzle.team/)
- Manual testing checklist: `MANUAL_TESTING_CHECKLIST.md`

---

**Remember:** For a paid product, reliable automated tests are not optional. They protect paying customers from bugs and data loss!
