
import { Scatter } from 'react-chartjs-2';
const LineGraphScores = ({ exams, timeframe, examDataRaw }) => {

  //if statement to return something only if user has searched for something. Else dont show diagram
  if (exams) {

    //console.log("timefilter = "+timeframe.from);
    const dateTo = new Date(timeframe.to); // create a date object from the "to" timeframe
    //dateTo.freeze();
    let dateFrom = new Date(timeframe.from); // create a date object from the "from" timeframe
    const time_difference = dateTo.getTime() - dateFrom.getTime(); // gets time difference from today and a month back in time
    const days_difference = time_difference / (1000 * 60 * 60 * 24); //converts time difference from milliseconds to days
    let daysArray = [];//stores an array of attempts for each day between to and from in timeframe
    let daysArrayLabels = [];//stores days of the month cooresponding to the daysArray above [20,21,21,23....]

    //loop through everyday between dateFrom and dateTo 
    if (days_difference < 365) {
      for (let i = days_difference; i >= 0; i--) {
        let thisLoopDay = new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() - i);
        //loop through exam attemps and look for date matching thisLoopday count up attempt and passed and failed counter
        for (let j = 0; j < examDataRaw.length; j++) {
          if (examDataRaw[j].dateFormat.toISOString().split('T')[0] === thisLoopDay.toISOString().split('T')[0]) {
            daysArray.push(
              { "x": -i, "y": examDataRaw[j].scorePercent }
            );
          }
        }
        //dont know why i had to put a -1 to thisLoopDayGetDate but that corrects the date label compared to attempts
        daysArrayLabels.push("D:" + (thisLoopDay.getDate() - 1) + "M:" + (thisLoopDay.getMonth() + 1));
      }
    } else return null;

    //console.log(daysArray);
  


  const data_days = {
    datasets: [
      {
        label: 'Scores',
        data: daysArray,
        backgroundColor: '#f1db43',
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
          <h6 className="m-0 font-weight-bold text-primary">Attempt Scores</h6>
        
        </div>
        <div className="card-body">

          <div className='header'>
            <div className='links'>

            </div>
          </div>
          <Scatter data={data_days} options={options} />



        </div>
      </div>
    </div>
  )
} else return null

}

export default LineGraphScores
