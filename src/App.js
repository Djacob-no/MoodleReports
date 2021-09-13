
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SmallCard from './Components/SmallCard';
import BarGraph from './Components/BarGraph';
import FormEditor from './Components/FormEditor';
import usePosts from './Hooks/databaseHook';
import dataManager from './Hooks/dataManager.js';
import React, { useState } from 'react';

function App() {

  //get data from database hook
  //const moodleData = usePosts();
  
  
  //SearchBar stuff
  const [state, setState] = useState({"searchField": "Search"});
  const searchUpdate = (value) => {
    setState(
      dataManager(value)
    )
    console.log(state)
  };
  //console.log(seachField);


  

  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >
          <FormEditor fields={["seachField"]} searchUpdate={searchUpdate} />;

            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value="91" />
              <SmallCard icon="address-card" color="info" title="Final Grades" value="45" />
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value="{passCount.length}" />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value="{failCount.length}" />
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
