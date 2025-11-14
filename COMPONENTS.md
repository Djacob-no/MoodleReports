# Component reference (src/Components)

This document summarizes the UI components in `src/Components/`, lists their primary props and the shapes of data they consume, and gives short usage notes.

Note: the app uses Bootstrap classes and FontAwesome icons. Charts are rendered using Chart.js via `react-chartjs-2` in the chart components.

## SmallCard.jsx
- Purpose: Small summary card used in the dashboard header (Attempts Total, Final Grades, Passed Attempts, Failed Attempts).
- Props:
  - `title` (string) — card title and used for the clickable element id
  - `value` (number|string) — primary value displayed
  - `color` (string) — bootstrap color name used in `border-left-{color}` and text
  - `icon` (string) — fontawesome icon name (without `fa-` prefix)
  - `onClick` (function) — optional click handler. The component sets the anchor href to a placeholder when provided.

## SortableTable.jsx
- Purpose: Displays a sortable table of attempts or grades. Sort toggles between up/down/default on the Date column.
- Props:
  - `data` (array) — array of attempt/grade objects; expected fields: `firstname`, `lastname`, `name`, `scorePercent` or `grade`, `dateFormat` (Date object)

Notes: The sort function operates on `dateFormat` and expects valid Date objects for proper behavior.

## SearchBar.jsx
- Purpose: A small form that emits search text and date range back to the parent.
- Props:
  - `onChange` (function) — called on submit with an object: `{ text, from, to }`

Notes: Default `from` is `2021-01-01`; default `to` is today's date. This component manages its own local state and is the primary UI used to filter data shown across the app.

## Modal.jsx
- Purpose: Simple modal to show raw table data when a SmallCard is clicked.
- Props:
  - `title` (string) — used to display which dataset is being shown
  - `show` (boolean) — whether the modal is visible
  - `handleClose` (function) — callback to close the modal
  - `data` (array) — raw data to render; likely passed `examDataRaw` or `finalGrades`

## BarGraph.jsx, LineGraph.jsx, LineGraphScores.jsx, Failpercent.jsx
- Purpose: Chart components that visualize the processed data. They accept data objects produced by `useDataManager`.
- Expected props (examples):
  - `exams` / `examsOverview` (array) — summary objects for bars / percentages
  - `sortedAttempts` / `examData` (array) — sorted arrays of attempts for per-exam charts
  - `timeframe` (object) — `{ from, to }` used to label axis
  - `examDataRaw` — raw filtered attempts with `dateFormat` and `scorePercent` fields

Notes: Internally these components use Chart.js configuration and the global color palette defined in `src/index.js`.

## Usage tips for contributors
- When adding or changing fields to the raw API responses, update `useDataManager` to compute derived fields (e.g., `scorePercent`, `passed`, `dateFormat`).
- If you need offline development, create a small stub that returns `{ data: require('./Hooks/databaseMoodle.json') }` for `useAttempts()` and similar for grades.

---
End of component reference
