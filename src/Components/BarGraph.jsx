
/**
 * BarGraph Component
 * 
 * Renders a horizontal stacked bar chart displaying pass/fail statistics for each exam.
 * Uses Chart.js through react-chartjs-2 to create an interactive visualization.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.exams - Array of exam objects with pass/fail statistics
 *   Each exam object should have: { name, passCount, failCount }
 * @param {Array} props.sortedAttempts - Array of attempts sorted by exam (currently unused)
 * 
 * @returns {JSX.Element|null} Horizontal bar chart or null if no exam data
 */

import { Bar } from 'react-chartjs-2';

const BarGraph = ({ exams, sortedAttempts }) => {
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
   * Extract pass counts for each exam
   * Creates dataset for the green "Passed" bars in the stacked chart
   */
  let passCount = exams.map(function (e) {
    return e.passCount;
  });

  /**
   * Extract fail counts for each exam
   * Creates dataset for the red "Failed" bars in the stacked chart
   */
  let failCount = exams.map(function (e) {
    return e.failCount;
  });
  
  /**
   * Chart.js data configuration for the stacked bar chart
   * Creates a horizontal stacked bar chart with pass/fail data
   */
  const barData = {
    labels: examNames, // Y-axis labels (exam names)
    datasets: [
      {
        label: 'Passed', // Legend label for passed attempts
        stack: "Base", // Stack identifier for grouping bars
        backgroundColor: "#1cc88a", // Green color for passed attempts
        borderWidth: 0, // No border on bars
        data: passCount // Pass count data for each exam
      },
      {
        label: 'Failed', // Legend label for failed attempts
        stack: "Base", // Same stack as passed (creates stacked effect)
        backgroundColor: "#da291c", // Red color for failed attempts
        borderWidth: 0, // No border on bars
        data: failCount // Fail count data for each exam
      }
    ]
  };
 
  /**
   * Chart.js configuration options for styling and behavior
   * Configures the chart as a horizontal stacked bar chart with custom styling
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
      // X-axis configuration (horizontal values)
      xAxes: [{
        stacked: true, // Enable stacking for pass/fail bars
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false, // Hide grid lines for cleaner look
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6 // Limit number of ticks on x-axis
        },
        maxBarThickness: 25, // Limit bar thickness
      }],
      // Y-axis configuration (exam names)
      yAxes: [{
        stacked: true, // Enable stacking to align with x-axis
        ticks: {
          min: 0,
          max: 20,
          maxTicksLimit: 5,
          padding: 10,
          // Commented out currency formatting - could be used for custom formatting
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
      display: true // Show legend for pass/fail labels
    },
  };

  /**
   * Render the bar chart component
   * Wraps the Chart.js Bar component in a Bootstrap card layout
   */
  return (
    <div className="col-xl-6 col-lg-12">
      {/* Bootstrap card container for the chart */}
      <div className="card shadow mb-4">
        {/* Card header with chart title */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Attempts</h6>
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

export default BarGraph;
