# MoodleReports (project documentation)

This repository contains a React application (bootstrapped with Create React App) named "Moodle Reports". The app fetches Moodle attempt and grade data from remote APIs and provides dashboards and tables to inspect attempts, pass/fail rates, and scores over time.

This file is a project-focused README intended to help contributors and maintainers quickly understand the code structure, data flow, and how to run and extend the app.

## Quick summary
- Tech: React 17, Chart.js, react-chartjs-2
- Bundler/Tooling: Create React App (`react-scripts`)
- Purpose: Visualize Moodle attempt/grade data (time series, pass/fail breakdown, sortable attempt table)
- Data sources: Two remote API endpoints (attempts and grades) authenticated with an API key stored in `src/Hooks/apiKey` (not included in repo)

## Project layout (important files)
- `public/` — static assets and the base `index.html` which mounts the React app
- `src/index.js` — app entry, mounts `<App />` and sets some global chart color variables
- `src/App.js` — top-level component: wires hooks, manages modal and search state, renders small summary cards and charts
- `src/Hooks/` — data hooks and static fixtures
  - `databaseHook.js` — contains two hooks: `useAttempts()` and `useGrades()` which fetch from remote APIs
  - `useDataManager.js` — transforms raw data into app-ready structures (filters, monthly aggregation, exam summaries, pass/fail counts)
  - `databaseMoodle.json`, `grades.json` — sample/local fixtures used for development (small datasets)
- `src/Components/` — UI components: charts, cards, search bar, modal, sortable table, etc.

## Data flow and behavior
1. `App` calls `useAttempts()` and `useGrades()` on mount to fetch remote JSON data.
2. The `SearchBar` component emits search text plus `from`/`to` date range.
3. `useDataManager(search, from, to, attemptsRaw, gradesRaw, passingScore)` filters raw attempts and grades by search and time range, computes per-exam pass/fail counts, score percentages, a monthly attempts array, and final grades list.
4. Transformed data is stored in `App`'s `stateDB` and passed down to charts (`LineGraph`, `BarGraph`, `LineGraphScores`, `Failpercent`), `SmallCard` summaries, and `Modal`/`SortableTable` for raw-tables.

## Key runtime/config notes
- API endpoints are hardcoded in `src/Hooks/databaseHook.js` and require a valid `src/Hooks/apiKey.js` exporting the API key. The repository does not include that file for security.
- Default passing score is set inside `App.js` and can be changed via the settings form in the UI (note: currently that input updates a local variable, not component state — see next steps).

## Running locally (developer workflow)

### Quick Start - No API Key Required! 🎉

The repository includes synthetic test data files with 50 realistic exam attempts and 35 grades. You can run the app immediately:

```bash
cd MoodleReports/MoodleReports

# Use local test data (no API key needed)
export REACT_APP_USE_LOCAL_DATA=true
npm install
npm start
```

Open http://localhost:3000 and you'll see charts and data from the included synthetic JSON fixtures.

### Local Development with Test Data

See `LOCAL_DEV.md` for detailed instructions on using the included synthetic test data files (`testAttempts.json` and `testGrades.json`) for offline development. The app now has three modes:

1. Install dependencies:

```bash
cd MoodleReports
cd MoodleReports
npm install
```

2. Provide an API key file (create `src/Hooks/apiKey.js`) with the following content:

```js
// src/Hooks/apiKey.js
const apiKey = 'YOUR_KEY_HERE';
export default apiKey;
```

Or set an environment variable:
```bash
export REACT_APP_MOODLE_API_KEY='YOUR_KEY_HERE'
```

3. Start the dev server:

```bash
npm start
```

4. Open http://localhost:3000 in a browser.

### Local Development with Test Data

See `LOCAL_DEV.md` for detailed instructions on using the included test data files (`databaseMoodle.json` and `grades.json`) for offline development. The app now has three modes:

1. **Local-only mode**: `REACT_APP_USE_LOCAL_DATA=true` (recommended for development)
2. **API mode**: Provide API key via env var or `apiKey.js` file  
3. **Hybrid mode**: Try API first, fallback to local data if it fails

### Production Setup (with API)

## Known issues & TODOs (quick)
- The passing score input in the settings form mutates a local variable (`pscore`) and does not trigger a state update; consider lifting it to `useState` so the UI has an effective control.
- `useDataManager` expects valid `from` and `to` dates; there is limited validation around empty or invalid ranges.
- `src/Hooks/apiKey.js` is required but not included. Consider using environment variables (REACT_APP_*) for safer configuration.

## Next steps for documentation
- Add per-component docs (`COMPONENTS.md`) describing props, expected shapes, and usage examples.
- Add a CONTRIBUTING.md with how to run tests, linting, and add features.
- Add screenshots or animated GIFs for the UI and charts.

## License
See repository root for license information (if any).

---
End of project README
