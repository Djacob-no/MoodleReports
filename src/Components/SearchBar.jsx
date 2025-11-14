/**
 * SearchBar Component (formerly FieldEditor)
 * 
 * A form component that allows users to filter exam data by search term and date range.
 * Provides a text input for searching exam/student names and date pickers for selecting
 * the time period to analyze. Triggers the parent component's data filtering on form submission.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onChange - Callback function called when search parameters change
 *   Called with object: { text: string, from: string, to: string }
 * 
 * @returns {JSX.Element} Form with search input and date range selectors
 */

import React, { useState } from 'react';

const SearchBar = ({ onChange }) => {
  /**
   * Get current date for setting default "to" date
   * Formats current date as YYYY-MM-DD string for date input default value
   */
  const date = new Date();
  
  /**
   * Component state for form inputs
   * Manages search text and date range independently
   */
  const [search, setSearch] = useState(""); // Text search term (exam names, student names, etc.)
  const [from, setFrom] = useState("2021-01-01"); // Start date for filtering (default: beginning of 2021)
  
  /**
   * Default "to" date set to today
   * Formats current date as YYYY-MM-DD for HTML date input compatibility
   */
  const [to, setTo] = useState(
    date.getFullYear() + '-' + 
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' + 
    ('0' + date.getDate()).slice(-2)
  );

  /**
   * Handle input changes for all form fields
   * Updates the appropriate state variable based on the input's ID
   * 
   * @param {Event} event - Input change event
   */
  const handleChange = event => {
    if (event.target.id === "search") setSearch(event.target.value);
    if (event.target.id === "from") setFrom(event.target.value);
    if (event.target.id === "to") setTo(event.target.value);
  };

  /**
   * Handle form submission
   * Prevents default form submission and calls parent's onChange with current search parameters
   * 
   * @param {Event} e - Form submit event
   */
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Call parent component's onChange with current search criteria
    onChange({ 
      "text": search,  // Search term for filtering by name
      "from": from,    // Start date (YYYY-MM-DD)
      "to": to         // End date (YYYY-MM-DD)
    });
  };

  /**
   * Render the search form
   * Contains text input for search terms and date inputs for time range selection
   */
  return (
    <div className="field-editor">
      <form onSubmit={onSubmit}>
        {/* Text search input for exam names, student names, etc. */}
        <input  
          id="search" 
          className="main-search" 
          placeholder="Search" 
          onChange={handleChange}  
        />
        
        {/* Date range selection container */}
        <div>
          {/* Start date picker */}
          <input 
            value={from} 
            className="dateInput" 
            type="date" 
            id="from" 
            onChange={handleChange}
          />
          -
          {/* End date picker */}
          <input 
            value={to} 
            className="dateInput" 
            type="date" 
            id="to" 
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;