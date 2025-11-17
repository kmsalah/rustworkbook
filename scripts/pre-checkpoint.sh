#!/bin/bash
# Pre-checkpoint validation - ensures tests pass before saving project state

echo "🔒 Pre-Checkpoint Validation"
echo "============================"
echo ""

echo "Running tests before checkpoint creation..."
bash scripts/run-tests.sh

TEST_EXIT_CODE=$?

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Pre-checkpoint validation passed!"
    echo "Checkpoint can be safely created."
    exit 0
else
    echo ""
    echo "❌ Pre-checkpoint validation FAILED!"
    echo "Fix failing tests before creating checkpoint."
    exit 1
fi