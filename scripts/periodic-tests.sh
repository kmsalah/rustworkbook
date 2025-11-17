#!/bin/bash
# Periodic test runner for scheduled deployment health checks

echo "🔄 Rust Workbook Periodic Health Check"
echo "======================================"
echo "Timestamp: $(date)"
echo ""

# Test environment setup
export NODE_ENV=test
echo "Environment: $NODE_ENV"
echo ""

# Check database connectivity
echo "🔌 Checking database connection..."
if npm run db:push > /dev/null 2>&1; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed!"
    exit 1
fi
echo ""

# Run the full test suite
echo "🧪 Running full test suite..."
npx vitest run --reporter=verbose

TEST_EXIT_CODE=$?

# Test Piston API availability
echo ""
echo "🔗 Testing Piston API availability..."
PISTON_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "https://emkc.org/api/v2/piston/runtimes")
if [ "$PISTON_RESPONSE" -eq 200 ]; then
    echo "✅ Piston API is reachable"
else
    echo "⚠️  Piston API returned status code: $PISTON_RESPONSE"
fi

# Summary
echo ""
echo "======================================"
echo "Health Check Summary:"
echo "- Test Suite: $([ $TEST_EXIT_CODE -eq 0 ] && echo '✅ PASSED' || echo '❌ FAILED')"
echo "- Database: ✅ Connected"
echo "- Piston API: $([ "$PISTON_RESPONSE" -eq 200 ] && echo '✅ Available' || echo '⚠️  Issues detected')"
echo "- Timestamp: $(date)"
echo "======================================"

# Exit with test suite exit code
exit $TEST_EXIT_CODE