
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SmallCard from './Components/SmallCard';
import BarGraph from './Components/BarGraph';
import BarGraph_failpercent from './Components/BarGraph_failpercent';
import usePosts from './Hooks/databaseHook';
import useDataManager from './Hooks/useDataManager.js';
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import LineGraph from './Components/LineGraph';

function App() {

  //get data from database hook
  //const moodleData = usePosts();

  //SearchBar inputs, trigger datamanager to update app state with filtered database data
  const [timeframe, setTimeframe] = useState({ "from": "09/22/1980", "to": "09/22/2040" });
  const [stateDB, setDBState] = useState({ "totalAttempts": 0 });
  const [gSearch, setgSearch] = useState("");
  const databaseRaw = usePosts();


  const SearchUpdate = (search) => {
    if (search)setgSearch(search);
      setDBState(useDataManager((search) ? search:"", timeframe, databaseRaw))
 
  };

  const TimeUpdate = (t) => {
    const now = new Date();
    let tempfrom = now;
    let to = (now.getMonth() + 1) + '/' + now.getDate() + '/' + now.getFullYear();
    switch (t) {
        case "month":
            tempfrom.setMonth(tempfrom.getMonth() - 1);
            break;
        case "year":
            tempfrom.setFullYear(tempfrom.getFullYear() - 1);
            break;
        default:
            tempfrom.setFullYear(tempfrom.getFullYear() - 30);
            break;
    }
    let from = (tempfrom.getMonth() + 1) + '/' + tempfrom.getDate() + '/' + tempfrom.getFullYear();
    setTimeframe({ "from": from, "to": to, "scope":t });
  };
 

  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >


            <div className="row" id="btnRow">
              <button type="button" onClick={() => TimeUpdate("month")} className="btn btn-primary">Month</button>
              <button type="button" onClick={() => TimeUpdate("year")} className="btn btn-primary">Year</button>
              <button type="button" onClick={() => TimeUpdate("all")} className="btn btn-primary">All Time</button>
            </div>

            <div className="row">
              <div className="col-md-12">
                <SearchBar onChange={SearchUpdate} />
              </div>
            </div>
          
            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value={stateDB.totalAttempts} />
              <SmallCard icon="address-card" color="info" title="Final Grades" value={"stateDB.finalGrades.length"} />
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value={stateDB.passCountFunction ? stateDB.passCountFunction("pass") : "0"} />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value={stateDB.passCountFunction ? stateDB.passCountFunction("fail") : "0"} />
            </div>

            <div className="row">
              <LineGraph exams={stateDB.monthlyAttempts} timeframe={timeframe} examDataRaw={stateDB.examDataRaw}/>
              <BarGraph exams={stateDB.examsOverview} sortedAttempts={stateDB.examData} />
              <BarGraph_failpercent exams={stateDB.examsOverview} />
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
