
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


  //SearchBar inputs, trigger datamanager to update app state with filtered database data
  const [state, setState] = useState({ "totalAttempts": 0 });
  const searchTerm = ""
  const time =""
  const searchUpdate = (search) => {
    searchTerm = search;
    setState(
      dataManager(searchTerm, {"from":"01/01/2019","to":"12/22/2022"})
    )
  };
  const timeFilter = (e) =>{
   if(e)
  };



  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >


            <div className="row">
              <span>Filter By</span>
              <button type="button" onClick={time = "month"} className="btn btn-light">Month</button>
              <button type="button" onClick={time = "year"} className="btn btn-secondary">Year</button>
              <button type="button" onClick={time = "all"} className="btn btn-primary">All Time</button>
            </div>

            <div className="row">
              <div className="col-md-12">
                <SearchBar onChange={searchUpdate} />
              </div>
            </div>

            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value={state.totalAttempts} />
              <SmallCard icon="address-card" color="info" title="Final Grades" value="45" />
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value={state.passCountFunction ? state.passCountFunction("pass") : "0"} />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value={state.passCountFunction ? state.passCountFunction("fail") : "0"} />
            </div>

            <div className="row">
              <LineGraph exams={state.monthlyAttempts} />
              <BarGraph exams={state.examsOverview} sortedAttempts={state.examData} />
              <BarGraph_failpercent exams={state.examsOverview} />
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
