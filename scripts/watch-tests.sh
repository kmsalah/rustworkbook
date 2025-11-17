#!/bin/bash
# Run tests in watch mode - automatically reruns on file changes

echo "🧪 Starting Rust Workbook Test Watcher..."
echo "========================================="
echo "Tests will automatically re-run when code changes are detected."
echo "Press Ctrl+C to stop watching."
echo ""

# Run vitest in watch mode
npx vitest --reporter=verbose