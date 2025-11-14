
/**
 * Failpercent Component
 * 
 * Renders a horizontal bar chart showing the failure percentage for each exam.
 * Displays what percentage of attempts failed for each exam type to identify
 * which exams are most challenging for students.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.exams - Array of exam objects with failure statistics
 *   Each exam object should have: { name, failPercent } where failPercent is decimal (0-1)
 * @param {Array} props.sortedAttempts - Array of attempts sorted by exam (currently unused)
 * 
 * @returns {JSX.Element|null} Horizontal bar chart showing fail percentages or null if no data
 */

import { Bar } from 'react-chartjs-2';

const Failpercent = ({ exams, sortedAttempts }) => {
  // Early return if no exam data is provided
  if (!exams) {
    return null;
  }

  /**
   * Extract exam names from the exams array for chart labels
   * Maps over exams to create an array of exam names for the y-axis labels
   */
  let examNames = exams.map(function (e) {
    return e.name;
  });

  /**
   * Convert fail percentages from decimal to percentage format
   * Multiplies failPercent (0-1) by 100 to get percentage (0-100)
   * Used to display meaningful percentages on the chart
   */
  let failPercent = exams.map(function (e) {
    return e.failPercent * 100;
  });
  
  /**
   * Chart.js data configuration for the fail percentage bar chart
   * Creates a simple horizontal bar chart showing failure rates
   */
  const barData = {
    labels: examNames, // Y-axis labels (exam names)
    datasets: [{
      label: 'Fail Percentage', // Legend label
      backgroundColor: "#da291c", // Red color to indicate failures
      borderWidth: 0, // No border on bars
      data: failPercent // Failure percentage data (0-100)
    }]
  };

  /**
   * Chart.js configuration options for the fail percentage chart
   * Configures styling similar to other charts but optimized for percentage display
   */
  const barOptions = {
    indexAxis: 'y', // Makes bars horizontal instead of vertical
    maintainAspectRatio: true, // Maintains chart proportions
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      // X-axis configuration (percentage values 0-100)
      xAxes: [{
        stacked: true,
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false, // Hide grid lines for cleaner look
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6, // Limit number of ticks on x-axis
          // Could add percentage formatting here if needed
        },
        maxBarThickness: 25, // Limit bar thickness
      }],
      // Y-axis configuration (exam names)
      yAxes: [{
        stacked: true,
        ticks: {
          min: 0,
          max: 20, // May need adjustment based on number of exams
          maxTicksLimit: 5,
          padding: 10,
          // Commented out currency formatting - not needed for percentages
          /*/ Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + number_format(value);
          }*/
        },
        gridLines: {
          drawBorder: false,
          borderDash: [2], // Dashed grid lines
          zeroLineBorderDash: [2] // Dashed zero line
        }
      }],
    },
    legend: {
      display: true // Show legend
    },
  };

  /**
   * Render the fail percentage chart component
   * Wraps the Chart.js Bar component in a Bootstrap card layout
   */
  return (
    <div className="col-xl-6 col-lg-12">
      {/* Bootstrap card container for the chart */}
      <div className="card shadow mb-4">
        {/* Card header with descriptive title */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Attempts - Fail Percentage</h6>
        </div>
        
        {/* Card body containing the chart */}
        <div className="card-body">
          <div className='header'>
            <div className='links'>
              {/* Additional header content area - currently empty */}
            </div>
          </div>
          
          {/* Render the Chart.js Bar component with data and options */}
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Failpercent;
