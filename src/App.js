
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SmallCard from './Components/SmallCard';
import BarGraph from './Components/BarGraph';
import usePosts from './Hooks/databaseHook';
import dataManager from './Hooks/dataManager.js';
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import LineGraph from './Components/LineGraph';

function App() {

  //get data from database hook
  //const moodleData = usePosts();
  
  
  //SearchBar inputs, trigger datamanager to update app state with filtered database data
  const [state, setState] = useState({"totalAttempts": 0});
  const searchUpdate = (value) => {
    setState(
      dataManager(value)
    )
  };
 


  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >
         

            <div>
              <SearchBar onChange={searchUpdate} />
            </div>

            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value={state.totalAttempts} />
              <SmallCard icon="address-card" color="info" title="Final Grades" value="45" />
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value={state.passCountFunction ? state.passCountFunction("pass") : "0"} />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value={state.passCountFunction ? state.passCountFunction("fail") : "0"} />
            </div>

            <div className="row">
              <BarGraph exams={state.examsOverview} sortedAttempts={state.examData}  />
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
