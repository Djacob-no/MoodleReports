
import './App.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import SmallCard from './Components/SmallCard';
import LargeCard from './Components/BarGraph';
import FormEditor from './Components/FormEditor';

function App() {

  const fields = ["field1", "field2", "anotherField"];


  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >

            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value="58" />
              <SmallCard icon="address-card" color="info" title="Final Grades" value="45" />
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value="50" />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value="8" />
            </div>

            <div className="row">
              <LargeCard data={data} options={options} />
            </div>

            <FormEditor fields={fields} />;

          </div>
        </div>
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright © Your Website 2020</span>
                </div>
            </div>
        </footer>
      </div>
    </div>
    
  );
}




const data = {
  labels: ['Mechanical 0', 'Electrical 0', 'Hydraulical 0', 'Novos Amphion 0', 'Cyberbase 0'],
  datasets: [{
    label: 'Passed',
    backgroundColor: "#1cc88a",
    borderWidth: 0,
    data: [
      5,
      12,
      14,
      3,
      6
    ]
  },
  {
    label: 'Failed',
    backgroundColor: "#da291c",
    borderWidth: 0,
    data: [
      2,
      3,
      5,
      1,
      2
    ]
  }]
};

const options = {
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

export default App;
