
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SmallCard from './Components/SmallCard';
import LargeCard from './Components/BarGraph';
import FormEditor from './Components/FormEditor';
import usePosts from './databaseHook';
import {examsObject, sorted, totalAttempts} from './dataManager.js';
import React, { useState } from 'react';

function App() {

  //get data from database hook
  //const moodleData = usePosts();
  
  //SeachBar stuff
  const [state, setState] = useState({"searchField": "Search"});
  const searchUpdate = (value) => {setState({"searchField":value})};
  //console.log(seachField);


  

  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >
          <FormEditor fields={["seachField"]} searchUpdate={searchUpdate} />;

            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value={totalAttempts} />
              <SmallCard icon="address-card" color="info" title="Final Grades" value="45" />
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value="{passCount.length}" />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value="{failCount.length}" />
            </div>

            <div className="row">
              <LargeCard exams={examsObject} sortedAttempts={sorted} searchUpdate={searchUpdate} />
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
