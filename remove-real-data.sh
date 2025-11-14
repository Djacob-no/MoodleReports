#!/bin/bash

# Script to safely remove real data files and clean up repository

echo "🗑️  Removing real data files..."

# Remove the real data files (they contain sensitive information)
rm -f src/Hooks/databaseMoodle.json
rm -f src/Hooks/grades.json

echo "✅ Real data files removed"

# Add them to .gitignore to prevent future commits
echo "" >> .gitignore
echo "# Real data files (never commit these)" >> .gitignore
echo "src/Hooks/databaseMoodle.json" >> .gitignore
echo "src/Hooks/grades.json" >> .gitignore
echo "src/Hooks/apiKey.js" >> .gitignore

echo "✅ Added real data files to .gitignore"

# Show what's now available for testing
echo ""
echo "📊 Available synthetic test data:"
echo "  - src/Hooks/testAttempts.json (50 attempts)"
echo "  - src/Hooks/testGrades.json (35 grades)"
echo ""
echo "🚀 To run with synthetic data:"
echo "  export REACT_APP_USE_LOCAL_DATA=true"
echo "  npm start"
echo ""
echo "⚠️  Don't forget to also remove these files from Git history!"
echo "    See the previous instructions for using git-filter-repo"