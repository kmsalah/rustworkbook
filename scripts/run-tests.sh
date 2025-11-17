#!/bin/bash
# Run tests once with verbose output

echo "🧪 Running Rust Workbook Test Suite..."
echo "========================================="
echo ""

# Ensure database is ready
echo "📦 Ensuring database schema is up to date..."
npm run db:push

echo ""
echo "🔬 Running tests..."
npx vitest run --reporter=verbose

# Capture exit code
TEST_EXIT_CODE=$?

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ All tests passed!"
else
    echo ""
    echo "❌ Some tests failed. Exit code: $TEST_EXIT_CODE"
fi

exit $TEST_EXIT_CODE