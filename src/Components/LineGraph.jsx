
import { Line } from 'react-chartjs-2';
const LineGraph = ({exams,sortedAttempts}) => {

  //if statement to return something only if user has searched for something. Else dont show diagram
  if(exams){
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','nov','dec'];
  const data = {
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
            <Line data={data} options={options} />
  
  
  
          </div>
        </div>
      </div>
    )
  }else return null
 
}

export default LineGraph
