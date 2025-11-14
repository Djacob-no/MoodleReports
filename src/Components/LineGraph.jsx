
import { Line } from 'react-chartjs-2';
const LineGraph = ({ exams, timeframe, examDataRaw }) => {

  //if statement to return something only if user has searched for something. Else dont show diagram
  if (exams) {

    //console.log("timefilter = "+timeframe.from);
    const dateTo = new Date(timeframe.to); // create a date object from the "to" timeframe
    //dateTo.freeze();
    let dateFrom = new Date(timeframe.from); // create a date object from the "from" timeframe
    const time_difference = dateTo.getTime() - dateFrom.getTime(); // gets time difference from today and a month back in time
    const days_difference = time_difference / (1000 * 60 * 60 * 24); //converts time difference from milliseconds to days
    let daysArray = [];//stores an array of attempts for each day between to and from in timeframe
    let daysArrayPassed = [];//stores an array of passed attempts for each day between to and from in timeframe
    let daysArrayFailed = [];//stores an array of failed attempts for each day between to and from in timeframe
    let daysArrayLabels =[];//stores days of the month cooresponding to the daysArray above [20,21,21,23....]

    //console.log("dateto "+days_difference);
    //loop through everyday between dateFrom and dateTo 
    if(days_difference<80){
      for (let i = days_difference; i >= 0; i--) {
        let thisLoopDay = new Date(dateTo.getFullYear(),dateTo.getMonth(),dateTo.getDate()-i) 
        let thisDaysAttempts = 0;
        let thisDaysPassed = 0;
        let thisDaysFailed = 0;
  
        //loop through exam attemps and look for date matching thisLoopday count up attempt and passed and failed counter
        for (let j = 0; j < examDataRaw.length; j++) {
          if (examDataRaw[j].dateFormat.toISOString().split('T')[0] === thisLoopDay.toISOString().split('T')[0]) {
            thisDaysAttempts++
            if(examDataRaw[j].passed === true){thisDaysPassed++} else thisDaysFailed++;
          }
        }
        daysArray.push(thisDaysAttempts);
        daysArrayFailed.push(thisDaysFailed);
        daysArrayPassed.push(thisDaysPassed);
        //dont know why i had to put a -1 to thisLoopDayGetDate but that corrects the date label compared to attempts
        daysArrayLabels.push("D:"+(thisLoopDay.getDate()-1)+"M:"+(thisLoopDay.getMonth()+1));
    
      }
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

    
    const months = exams.map(e => {return e.date});
    //console.log(months);
    //const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'nov', 'dec'];
    const data_months = {
      labels: months,
      datasets: [
        {
          label: 'Passed',
          data: exams.map(e => {return e.passed}),
          fill: false,
          backgroundColor: '#1cc88a',
          borderColor: '#1cc88a',
        },
        {
          label: 'Failed',
          data: exams.map(e => {return e.failed}),
          fill: false,
          backgroundColor: '#e74a3b',
          borderColor: '#e74a3b',
        },
        {
          label: 'Total',
          data: exams.map(e => {return e.total}),
          fill: false,
          backgroundColor: '#4e73df',
          borderColor: '#4e73df',
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
      <div className="col-xl-6 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Attempts Over Time</h6>
            
          </div>
          <div className="card-body">

            <div className='header'>
              <div className='links'>

              </div>
            </div>
            <Line data={(days_difference<80) ? data_days : data_months} options={options} />



          </div>
        </div>
      </div>
    )
  } else return null

}

export default LineGraph
