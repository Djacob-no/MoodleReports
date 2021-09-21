
import { Line } from 'react-chartjs-2';
const LineGraph = ({ exams, timeframe, examDataRaw }) => {

  //if statement to return something only if user has searched for something. Else dont show diagram
  if (exams) {

    console.log(timeframe);
    const today = new Date(); // create a date object today
    let minusAMonth = new Date(); //initialize this 
    minusAMonth.setMonth(minusAMonth.getMonth() - 1); //make this variable date object 1month back in time
    const time_difference = today.getTime() - minusAMonth.getTime(); // gets time difference from today and a month back in time
    const days_difference = time_difference / (1000 * 60 * 60 * 24); //converts time difference from milliseconds to days
    let daysArray = [];//stores an array of each day in the timeframe(1month back from today)
    let daysArrayPassed = [];//stores an array of each day in the timeframe(1month back from today)
    let daysArrayFailed = [];//stores an array of each day in the timeframe(1month back from today)
    let daysArrayLabels =[];//stores days of the month cooresponding to the daysArray above [20,21,21,23....]

    //loop through everyday from today and a month back in time
    for (let i = 0; i < days_difference; i++) {
      let thisDay = new Date();
      thisDay.setDate(thisDay.getDate() - i);
      let thisDaysAttempts = 0;
      let thisDaysPassed = 0;
      let thisDaysFailed = 0;
      //loop through exam attemps and look for date matching this date count up attempt and passed and failed counter
      //console.log(examDataRaw);
      for (let j = 0; j < examDataRaw.length; j++) {
        if (examDataRaw[j].dateFormat.getDate() === thisDay.getDate()) {
          thisDaysAttempts++
          if(examDataRaw[j].passed === true){thisDaysPassed++} else thisDaysFailed++;
        }
      }
      daysArray.push(thisDaysAttempts);
      daysArrayFailed.push(thisDaysFailed);
      daysArrayPassed.push(thisDaysPassed);
    }

    const data_days = {
      labels: daysArrayLabels,
      datasets: [
        {
          label: 'Passed',
          data: daysArrayPassed,
          fill: false,
          backgroundColor: '#1cc88a',
          borderColor: '#1cc88a',
        },
        {
          label: 'Failed',
          data: daysArrayFailed,
          fill: false,
          backgroundColor: '#e74a3b',
          borderColor: '#e74a3b',
        },
        {
          label: 'Total',
          data: daysArray,
          fill: false,
          backgroundColor: '#36b9cc',
          borderColor: '#36b9cc',
        },
      ],
    };

    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'nov', 'dec'];
    const data_months = {
      labels: months,
      datasets: [
        {
          label: 'Passed',
          data: exams.passedAttempts,
          fill: false,
          backgroundColor: '#1cc88a',
          borderColor: '#1cc88a',
        },
        {
          label: 'Failed',
          data: exams.failedAttempts,
          fill: false,
          backgroundColor: '#e74a3b',
          borderColor: '#e74a3b',
        },
        {
          label: 'Total',
          data: exams.totalAttempts,
          fill: false,
          backgroundColor: '#36b9cc',
          borderColor: '#36b9cc',
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };



    return (
      <div className="col-xl-8 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Attempts</h6>
            <div className="dropdown no-arrow">
              <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                <div className="dropdown-header">Dropdown Header:</div>
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <div className="card-body">

            <div className='header'>
              <div className='links'>

              </div>
            </div>
            <Line data={timeframe === "month" ? data_days : data_months} options={options} />



          </div>
        </div>
      </div>
    )
  } else return null

}

export default LineGraph
