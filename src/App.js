
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SmallCard from './Components/SmallCard';
import BarGraph from './Components/BarGraph';
import BarGraph_failpercent from './Components/BarGraph_failpercent';
import usePosts from './Hooks/databaseHook';
import dataManager from './Hooks/dataManager.js';
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import LineGraph from './Components/LineGraph';

function App() {

  //get data from database hook
  //const moodleData = usePosts();
console.log(usePosts());

  //SearchBar inputs, trigger datamanager to update app state with filtered database data
  const [timeframe, setTimeframe] = useState("all");
  const [stateDB, setDBState] = useState({ "totalAttempts": 0 });
  let searchTerm = "";
  let timeFilter = "";
  const searchUpdate = (search) => {
    if (search)searchTerm = search;
    setDBState(dataManager(searchTerm, timeFilter))
  };
  const timeUpdate = (t) => {
    timeFilter = t;
    setTimeframe(timeFilter);
    searchUpdate();
  };
 


  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >


            <div className="row" id="btnRow">
              <button type="button" onClick={() => timeUpdate("month")} className="btn btn-primary">Month</button>
              <button type="button" onClick={() => timeUpdate("year")} className="btn btn-primary">Year</button>
              <button type="button" onClick={() => timeUpdate("all")} className="btn btn-primary">All Time</button>
            </div>

            <div className="row">
              <div className="col-md-12">
                <SearchBar onChange={searchUpdate} />
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
