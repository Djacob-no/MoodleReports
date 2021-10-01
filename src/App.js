
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import SmallCard from './Components/SmallCard';
import BarGraph from './Components/BarGraph';
import BarGraph_failpercent from './Components/BarGraph_failpercent';
import { useAttempts, useGrades } from './Hooks/databaseHook';
import useDataManager from './Hooks/useDataManager.js';
import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import LineGraph from './Components/LineGraph';
import LineGraphScores from './Components/LineGraphScores';
import Modal from "./Components/Modal";

function App() {


  //SearchBar inputs, trigger datamanager to update app state with filtered database data
  const [stateDB, setDBState] = useState({ "totalAttempts": 0 });
  const [stateTimefilter, setTimefilter] = useState();
  const [modalState, setModalState] = useState({
    modal: false,
    name: "",
    modalInputName: ""
  });

  const databaseRaw = useAttempts();
  const gradesRaw = useGrades();


  const modalOpen = () => {
    setModalState({ modal: true });
  }
  const modalClose = () => {
    setModalState({ modalInputName: "", modal: false });
  }


  const SearchUpdate = (search) => {
    setTimefilter({ "from": search.from, "to": search.to });
    setDBState(useDataManager(search.text, search.from, search.to, databaseRaw, gradesRaw.data))
  };

  //create table from final grades and put it in listItems
  let listItems;
  if (stateDB.finalGrades) {
    listItems = stateDB.finalGrades.map((e) =>
      <tr>
        <td>{`${e.firstname} ${e.lastname}`}</td>
        <td>{e.name}</td>
        <td>{e.grade}</td>
        <td>{e.dateFormat.getMonth()+ "/"+e.dateFormat.getDate()+"/"+e.dateFormat.getFullYear()}</td>
      </tr>
    );
  }



  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="container-fluid" >

            
            <Modal show={modalState.modal} handleClose={e => modalClose(e)} children={listItems} />



            <div className="row">
              <div className="col-md-12">
                <SearchBar onChange={SearchUpdate} />
              </div>
            </div>

            <div className="row">
              <SmallCard icon="book" color="primary" title="Attemps Total" value={stateDB.totalAttempts} />
              <SmallCard onClick={modalOpen} icon="address-card" color="info" title="Final Grades" value={stateDB.finalGrades ? stateDB.finalGrades.length : "0"} />
              
              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value={stateDB.passCountFunction ? stateDB.passCountFunction("pass") : "0"} />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value={stateDB.passCountFunction ? stateDB.passCountFunction("fail") : "0"} />
            </div>

            <div className="row">
              <LineGraph exams={stateDB.monthlyAttempts} timeframe={stateTimefilter} examDataRaw={stateDB.examDataRaw} />
              <BarGraph exams={stateDB.examsOverview} sortedAttempts={stateDB.examData} />
              <LineGraphScores exams={stateDB.monthlyAttempts} timeframe={stateTimefilter} examDataRaw={stateDB.examDataRaw} />
              <BarGraph_failpercent exams={stateDB.examsOverview}  />
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
