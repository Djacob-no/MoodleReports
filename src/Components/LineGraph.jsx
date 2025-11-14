
/**
 * LineGraph Component
 * 
 * Renders a line chart showing exam attempts over time. Automatically switches between
 * daily view (for periods <= 80 days) and monthly view (for longer periods).
 * Shows three lines: Total attempts, Passed attempts, and Failed attempts.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.exams - Array of monthly exam data with date, passed, failed, total counts
 * @param {Object} props.timeframe - Object with 'from' and 'to' date strings for filtering
 * @param {Array} props.examDataRaw - Raw array of individual exam attempts with dateFormat and passed properties
 * 
 * @returns {JSX.Element|null} Line chart showing attempts over time or null if no data
 */

import { Line } from 'react-chartjs-2';

const LineGraph = ({ exams, timeframe, examDataRaw }) => {
  // Early return if no exam data is provided
  if (!exams) {
    return null;
  }

  /**
   * Date Processing and Time Range Calculation
   * Determines if we should show daily or monthly view based on the time range
   */
  
  // Create date objects from the timeframe strings
  const dateTo = new Date(timeframe.to); // End date of the time range
  let dateFrom = new Date(timeframe.from); // Start date of the time range
  
  // Calculate the difference in days between start and end dates
  const time_difference = dateTo.getTime() - dateFrom.getTime(); // Difference in milliseconds
  const days_difference = time_difference / (1000 * 60 * 60 * 24); // Convert to days

  /**
   * Arrays for storing daily data (used when time range <= 80 days)
   * Each index corresponds to a specific day in the time range
   */
  let daysArray = []; // Total attempts per day
  let daysArrayPassed = []; // Passed attempts per day
  let daysArrayFailed = []; // Failed attempts per day
  let daysArrayLabels = []; // Day labels in format "D:20M:3" (Day 20, Month 3)

  /**
   * Daily Data Processing (for time ranges <= 80 days)
   * Iterates through each day in the range and counts attempts
   */
  if (days_difference < 80) {
    // Loop through each day from the start to end date
    for (let i = days_difference; i >= 0; i--) {
      // Calculate the current day being processed
      let thisLoopDay = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() - i);
      
      // Initialize counters for this day
      let thisDaysAttempts = 0;
      let thisDaysPassed = 0;
      let thisDaysFailed = 0;

      /**
       * Count attempts for the current day by checking each exam attempt
       * Compares dates using ISO string format (YYYY-MM-DD) for exact matching
       */
      for (let j = 0; j < examDataRaw.length; j++) {
        // Compare dates by converting both to ISO date strings (ignoring time)
        if (examDataRaw[j].dateFormat.toISOString().split('T')[0] === thisLoopDay.toISOString().split('T')[0]) {
          thisDaysAttempts++; // Increment total attempts counter
          
          // Count passed vs failed attempts
          if (examDataRaw[j].passed === true) {
            thisDaysPassed++;
          } else {
            thisDaysFailed++;
          }
        }
      }
      
      // Store the day's data in the respective arrays
      daysArray.push(thisDaysAttempts);
      daysArrayFailed.push(thisDaysFailed);
      daysArrayPassed.push(thisDaysPassed);
      
      // Create readable day label: "D:20M:3" means Day 20 of Month 3
      // Note: -1 correction applied to getDate() for display purposes
      daysArrayLabels.push("D:" + (thisLoopDay.getDate() - 1) + "M:" + (thisLoopDay.getMonth() + 1));
    }
  }
  /**
   * Daily View Chart Data Configuration
   * Used when the time range is 80 days or less for detailed daily tracking
   */
  const data_days = {
    labels: daysArrayLabels, // Day labels in "D:20M:3" format
    datasets: [
      {
        label: 'Passed', // Green line for successful attempts
        data: daysArrayPassed,
        fill: false, // No area fill under the line
        backgroundColor: '#1cc88a', // Green color for points
        borderColor: '#1cc88a', // Green color for line
      },
      {
        label: 'Failed', // Red line for failed attempts
        data: daysArrayFailed,
        fill: false, // No area fill under the line
        backgroundColor: '#e74a3b', // Red color for points
        borderColor: '#e74a3b', // Red color for line
      },
      {
        label: 'Total', // Blue line for total attempts
        data: daysArray,
        fill: false, // No area fill under the line
        backgroundColor: '#36b9cc', // Light blue color for points
        borderColor: '#36b9cc', // Light blue color for line
      },
    ],
  };

  /**
   * Monthly View Chart Data Configuration
   * Used when the time range is more than 80 days for broader trend analysis
   */
  const months = exams.map(e => { return e.date }); // Extract month labels from exam data
  
  const data_months = {
    labels: months, // Monthly labels
    datasets: [
      {
        label: 'Passed', // Green line for monthly passed attempts
        data: exams.map(e => { return e.passed }),
        fill: false,
        backgroundColor: '#1cc88a',
        borderColor: '#1cc88a',
      },
      {
        label: 'Failed', // Red line for monthly failed attempts
        data: exams.map(e => { return e.failed }),
        fill: false,
        backgroundColor: '#e74a3b',
        borderColor: '#e74a3b',
      },
      {
        label: 'Total', // Blue line for monthly total attempts
        data: exams.map(e => { return e.total }),
        fill: false,
        backgroundColor: '#4e73df', // Darker blue for monthly view
        borderColor: '#4e73df',
      },
    ],
  };

  /**
   * Chart.js options configuration
   * Sets up the y-axis to start from zero for proper scale representation
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
   * Render the line chart component
   * Automatically chooses between daily and monthly data based on time range
   */
  return (
    <div className="col-xl-6 col-lg-12">
      {/* Bootstrap card container for the chart */}
      <div className="card shadow mb-4">
        {/* Card header with chart title */}
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Attempts Over Time</h6>
        </div>
        
        {/* Card body containing the chart */}
        <div className="card-body">
          <div className='header'>
            <div className='links'>
              {/* Additional header content area - currently empty */}
            </div>
          </div>
          
          {/* 
            Conditional rendering: Use daily data for periods <= 80 days, 
            monthly data for longer periods 
          */}
          <Line 
            data={(days_difference < 80) ? data_days : data_months} 
            options={options} 
          />
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
