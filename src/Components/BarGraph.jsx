
import { Bar } from 'react-chartjs-2';
const BarGraph = ({exams,sortedAttempts}) => {

  
  //console.log(examsFiltered);
  if(exams){
    let examNames = exams.map(function (e) {
      return e.name;
    })
    let passCount = exams.map(function (e) {
      return e.passCount;
    })
    let failCount = exams.map(function (e) {
      return e.failCount;
    })
  
    const barData = {
      labels: examNames,
      datasets: [{
        label: 'Passed',
        stack: "Base",
        backgroundColor: "#1cc88a",
        borderWidth: 0,
        data: passCount
      },
      {
        label: 'Failed',
        stack: "Base",
        backgroundColor: "#da291c",
        borderWidth: 0,
        data: failCount
      }]
    };
 
    const barOptions = {
      indexAxis: 'y',
      maintainAspectRatio: true,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          stacked: true,
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 6
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            min: 0,
            max: 20,
            maxTicksLimit: 5,
            padding: 10,
            /*/ Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return '$' + number_format(value);
            }*/
          },
          gridLines: {
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: true
      },
  
    };

    
  
    return (
      <div className="col-xl-6 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Attempts</h6>
            
          </div>
          <div className="card-body">
  
            <div className='header'>
              <div className='links'>
  
              </div>
            </div>
            <Bar data={barData} options={barOptions} />
  
  
  
          </div>
        </div>
      </div>
    )
  }else return null
 
}

export default BarGraph
