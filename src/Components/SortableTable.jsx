/**
 * SortableTable Component
 * 
 * A class-based React component that renders exam/grade data in a sortable table format.
 * Provides sorting functionality on the date column with three states: default (newest first),
 * ascending (oldest first), and descending (newest first). Used within modals to display
 * detailed raw data for exam attempts and final grades.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of exam/grade objects to display in the table
 *   Expected fields: firstname, lastname, name, scorePercent/grade, dateFormat (Date object)
 * 
 * @returns {JSX.Element|boolean} Table with sortable date column or false if no data
 */

import React from "react";

/**
 * Sort configuration object defining different sort modes
 * Each mode has a CSS class for icon display and a comparison function
 */
const sortTypes = {
  up: {
    class: 'sort-up', // FontAwesome class for up arrow icon
    fn: (a, b) => {
      // Ascending sort: older dates first
      // Note: Commented out code shows previous score-based sorting attempts
      //if (a.scorePercent) return a.scorePercent - b.scorePercent;
      //if (a.grade) return a.grade - b.grade;
      return a.dateFormat - b.dateFormat; // Date comparison (ascending)
    }
  },
  down: {
    class: 'sort-down', // FontAwesome class for down arrow icon
    fn: (a, b) => {
      // Descending sort: newer dates first
      // Note: Commented out code shows previous score-based sorting attempts
      //if (a.scorePercent) return b.scorePercent - a.scorePercent;
      //if (a.grade) return b.grade - a.grade;
      return b.dateFormat - a.dateFormat; // Date comparison (descending)
    }
  },
  default: {
    class: 'sort', // FontAwesome class for neutral sort icon
    fn: (a, b) => b.dateFormat - a.dateFormat // Default: newest first (descending)
  }
};

class SortableTable extends React.Component {
  /**
   * Component state to track current sort mode
   * Cycles through: default -> down -> up -> default
   */
  state = {
    currentSort: 'default'
  };

  /**
   * Handle sort button click - cycles through sort modes
   * Changes sort direction each time the date column header is clicked
   */
  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;
    
    // Cycle through sort modes
    if (currentSort === 'down') nextSort = 'up';           // down -> up
    else if (currentSort === 'up') nextSort = 'default';   // up -> default
    else if (currentSort === 'default') nextSort = 'down'; // default -> down
    
    this.setState({
      currentSort: nextSort
    });
  };

  render() {
    const { data } = this.props;
    const { currentSort } = this.state;

    /**
     * Conditional rendering: only show table if data exists
     * Returns false (renders nothing) if data array is empty
     */
    return (data.length > 0 && (
      <div className="t">
        <table className="fl-table">
          {/* Table header with column titles */}
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Exam</th>
              <th>Grade</th>
              <th>
                {/* 
                  Clickable date column header with sort functionality
                  Shows sort direction icon and handles click events 
                */}
                <a onClick={this.onSortChange} href="scr:"> 
                  DateModified
                  {/* Dynamic icon showing current sort direction */}
                  <i className={`fas fa-${sortTypes[currentSort].class}`}></i>
                </a>
              </th>
            </tr>
          </thead>

          {/* Table body with sortable data rows */}
          <tbody>
            {/* 
              Sort data using current sort function and map to table rows
              Creates a copy of data array before sorting to avoid mutation
            */}
            {[...data].sort(sortTypes[currentSort].fn).map((e, index) => (
              <tr key={index}> {/* Added key prop for React list rendering */}
                {/* Candidate name - concatenate first and last name */}
                <td>{`${e.firstname} ${e.lastname}`}</td>
                
                {/* Exam name */}
                <td>{e.name}</td>
                
                {/* 
                  Grade/Score display - handles both scorePercent and grade fields
                  scorePercent is used for attempts, grade for final grades
                */}
                <td>
                  {e.scorePercent ? e.scorePercent : (e.grade).toFixed(2)}
                </td>
                
                {/* 
                  Formatted date display - converts Date object to readable format
                  Format: MM/DD/YYYY 
                */}
                <td>
                  {e.dateFormat.getMonth() + 1}/{e.dateFormat.getDate()}/{e.dateFormat.getFullYear()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  }
}

export default SortableTable;