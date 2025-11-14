# Local Development Guide

This guide helps you run the MoodleReports app locally using test data instead of requiring API access.

## Quick Start (No API Key Required)

The repository includes sample JSON data files that contain synthetic test data:
- `src/Hooks/testAttempts.json` - 50 synthetic exam attempts 
- `src/Hooks/testGrades.json` - 35 synthetic final grades

### Option 1: Use Local Test Data (Recommended for Development)

```bash
# Set environment variable to use local JSON files
export REACT_APP_USE_LOCAL_DATA=true

# Install and run
cd MoodleReports/MoodleReports
npm install
npm start
```

The app will use the local JSON files and display real sample data including:
- Multiple exam types (Mechanical Level 0, Section Review Assessment, etc.)
- Various users and attempt scores
- Date range from 2020-2021
- Pass/fail scenarios

### Option 2: Use Remote API

If you have API access:

```bash
# Set your API key
export REACT_APP_MOODLE_API_KEY='your_api_key_here'

# Or create src/Hooks/apiKey.js:
echo "const apiKey = 'your_key_here'; export default apiKey;" > src/Hooks/apiKey.js

# Install and run
npm install
npm start
```

### Option 3: Hybrid Mode (API with Fallback)

The app now automatically falls back to local data if API calls fail, so you can:
1. Try the API first
2. Automatically use local data if API is unavailable
3. See console messages indicating which data source is being used

## What You'll See

With local test data, you'll see:
- **Total attempts**: 50
- **Final grades**: 35  
- **Sample exams**: "Basic Safety Assessment", "Equipment Operation Exam", "Advanced Operations Test", etc.
- **Users**: Alice Johnson, Bob Smith, Carol Davis, David Wilson, and others (all synthetic)
- **Date range**: November 2023 - December 2023
- **Charts**: Monthly attempts, pass/fail rates, score distributions

## Modifying Test Data

You can edit the JSON files to test different scenarios:
- Add/remove attempts in `testAttempts.json`
- Modify scores, dates, or user names
- Test edge cases (null scores, future dates, etc.)

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_USE_LOCAL_DATA` | Use local JSON instead of API | `true` |
| `REACT_APP_MOODLE_API_KEY` | API key for remote data | `abc123...` |

## Console Output

When running locally, check the browser console for:
- `"Using local test data for attempts"`
- `"Using local test data for grades"`
- `"Falling back to local test data"` (if API fails)

This helps you understand which data source is active.