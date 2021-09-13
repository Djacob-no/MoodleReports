
import { Bar } from 'react-chartjs-2';
const BarGraph = ({exams,sortedAttempts}) => {


  //console.log(examsFiltered);

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
      backgroundColor: "#fff",
      borderWidth: 0,
      data: passCount
    },
    {
      label: 'Failed',
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
    <div className="col-xl-8 col-lg-12">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Attempts per month</h6>
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
          <Bar data={barData} options={barOptions} />



        </div>
      </div>
    </div>
  )
}

export default BarGraph
