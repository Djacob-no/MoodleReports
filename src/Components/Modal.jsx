/**
 * Modal Component
 * 
 * A reusable modal dialog that displays exam data in a sortable table format.
 * Used to show detailed raw data when users click on summary cards in the dashboard.
 * Provides a popup overlay with a close button and scrollable table content.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Modal title displayed at the top
 * @param {Function} props.handleClose - Callback function to close the modal
 * @param {boolean} props.show - Whether the modal should be visible
 * @param {Array} props.data - Array of exam data to display in the table
 * 
 * @returns {JSX.Element|null} Modal with sortable table or null if no data
 */

import React from "react";
import SortableTable from "./SortableTable";

const Modal = ({ title, handleClose, show, data }) => {
  /**
   * Dynamic CSS class for modal visibility
   * Uses Bootstrap classes to show/hide the modal with proper styling
   */
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  // Early return if no data is provided
  if (!data) {
    return null;
  }

  /**
   * Render the modal with overlay and content
   * Contains a close button, title, and sortable table of data
   */
  return (
    <div className={showHideClassName}>
      {/* Modal container with content area */}
      <div className="modal-container">
        {/* 
          Close button using JavaScript href (accessibility warning expected)
          This is a legacy pattern - consider using button element for better accessibility 
        */}
        <a href="javascript:;" className="modal-close" onClick={handleClose}>
          close
        </a>
        
        {/* Modal title */}
        <h1>{title}</h1>
        
        {/* Table wrapper for scrollable content */}
        <div className="table-wrapper">
          {/* Sortable table component displaying the exam data */}
          <SortableTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Modal;