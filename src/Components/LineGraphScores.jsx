
/**
 * LineGraphScores Component
 * 
 * Renders a scatter plot showing individual exam scores over time. Each point represents
 * a single exam attempt with its score percentage and relative timing within the selected
 * time range. Only processes data for periods up to 365 days to maintain performance.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.exams - Array of monthly exam data (currently unused in this component)
 * @param {Object} props.timeframe - Object with 'from' and 'to' date strings for filtering
 * @param {Array} props.examDataRaw - Raw array of individual exam attempts with dateFormat and scorePercent
 * 
 * @returns {JSX.Element|null} Scatter plot showing scores over time or null if no data or period > 365 days
 */

import { Scatter } from 'react-chartjs-2';

const LineGraphScores = ({ exams, timeframe, examDataRaw }) => {
  // Early return if no exam data is provided
  if (!exams) {
    return null;
  }

  /**
   * Date Processing and Time Range Calculation
   * Same logic as LineGraph component but with different constraints
   */
  
  // Create date objects from the timeframe strings
  const dateTo = new Date(timeframe.to); // End date of the time range
  let dateFrom = new Date(timeframe.from); // Start date of the time range
  
  // Calculate the difference in days between start and end dates
  const time_difference = dateTo.getTime() - dateFrom.getTime();
  const days_difference = time_difference / (1000 * 60 * 60 * 24);

  /**
   * Arrays for storing scatter plot data
   * Each point will have x (relative day) and y (score percentage) coordinates
   */
  let daysArray = []; // Array of {x, y} objects for scatter plot points
  let daysArrayLabels = []; // Day labels (currently unused but maintained for consistency)

  /**
   * Score Data Processing (only for periods <= 365 days)
   * Creates scatter plot points for each exam attempt within the time range
   */
  if (days_difference < 365) {
    // Loop through each day from the start to end date
    for (let i = days_difference; i >= 0; i--) {
      // Calculate the current day being processed
      let thisLoopDay = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() - i);
      
      /**
       * Find all exam attempts that occurred on this specific day
       * For each match, create a scatter plot point
       */
      for (let j = 0; j < examDataRaw.length; j++) {
        // Compare dates using ISO string format for exact matching
        if (examDataRaw[j].dateFormat.toISOString().split('T')[0] === thisLoopDay.toISOString().split('T')[0]) {
          // Create scatter plot point with relative time position and score
          daysArray.push({
            "x": -i, // Negative value positions points chronologically (older = more negative)
            "y": examDataRaw[j].scorePercent // Score percentage (0-100)
          });
        }
      }
      
      // Create readable day label (for potential future use)
      daysArrayLabels.push("D:" + (thisLoopDay.getDate() - 1) + "M:" + (thisLoopDay.getMonth() + 1));
    }
  } else {
    // Return null for periods longer than 365 days to avoid performance issues
    return null;
  }

  /**
   * Scatter Plot Data Configuration
   * Creates a dataset with score points plotted against relative time
   */
  const data_days = {
    datasets: [
      {
        label: 'Scores', // Legend label for the scatter points
        data: daysArray, // Array of {x, y} coordinate objects
        backgroundColor: '#f1db43', // Yellow color for score points
      },
    ],
  };

  /**
   * Chart.js options configuration
   * Sets up the y-axis to start from zero for proper score scale (0-100%)
   */
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // Ensure y-axis starts from 0
          },
        },
      ],
    },
  };

  /**
   * Render the scatter plot component
   * Shows individual exam scores plotted against their timing within the selected period
   */
  return (
    <div className="col-xl-6 col-lg-12">
      {/* Bootstrap card container for the chart */}
      <div className="card shadow mb-4">
        {/* Card header with chart title */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Attempt Scores</h6>
        </div>
        
        {/* Card body containing the chart */}
        <div className="card-body">
          <div className='header'>
            <div className='links'>
              {/* Additional header content area - currently empty */}
            </div>
          </div>
          
          {/* Render the Chart.js Scatter component with score data */}
          <Scatter data={data_days} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineGraphScores;
