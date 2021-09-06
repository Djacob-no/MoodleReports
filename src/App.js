
import './App.css';
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"
import SmallCard from './Components/SmallCard';
import LargeCard from './Components/LargeCard';
import AreaChart from './Components/AreaChart';

function App() {
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
              <LargeCard Chart={AreaChart} />
            </div>

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

export default App;
