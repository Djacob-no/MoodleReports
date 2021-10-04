
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
  const [passingScore, setPassingScore] = useState(80);

  const databaseRaw = useAttempts();
  const gradesRaw = useGrades();


  const modalOpen = (input) => {
    setModalState({ modal: true, child: input.target.id });
  }
  const modalClose = () => {
    setModalState({ modalInputName: "", modal: false });
  }


  const SearchUpdate = (search) => {
    setTimefilter({ "from": search.from, "to": search.to });
    setDBState(useDataManager(search.text, search.from, search.to, databaseRaw, gradesRaw.data, passingScore))
  };
  const handlePassScore = (e) => {
    e.preventDefault();
    setPassingScore(e.target.value);
    console.log(e.target)
  }
  console.log(passingScore)


  return (
    <div id="wrapper" className="App">
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <div className="pageTop">
            <div className="left"><a style={{ color: "#fff", fontWeight: 800 }} href="wiki.nov.com">ESO Reports</a></div>
            <div className="right">
              <a>
                <i className={`fas fa-cog`}></i>
              </a>
              <form onSubmit={(e)=> e.preventDefault()}>
                Set Passing Score
                  <input type="number" id="passingScore" onChange={handlePassScore} >
                  </input>
               
              </form>

            </div>
          </div>
          <div style={{ marginTop: "50px" }} className="container-fluid" >



            <Modal title={modalState.child} show={modalState.modal} handleClose={e => modalClose(e)} data={modalState.child === "Final Grades" ? stateDB.finalGrades : stateDB.examDataRaw} />



            <div className="row">
              <div className="col-md-12">
                <SearchBar onChange={SearchUpdate} />
              </div>
            </div>

            <div className="row">
              <SmallCard onClick={modalOpen} icon="book" color="primary" title="Attempts Total" value={stateDB.totalAttempts} />
              <SmallCard onClick={modalOpen} icon="address-card" color="info" title="Final Grades" value={stateDB.finalGrades ? stateDB.finalGrades.length : "0"} />

              <SmallCard icon="check-circle" color="success" title="Passed Attempts" value={stateDB.passCountFunction ? stateDB.passCountFunction("pass") : "0"} />
              <SmallCard icon="times-circle" color="danger" title="Failed Attempts" value={stateDB.passCountFunction ? stateDB.passCountFunction("fail") : "0"} />
            </div>

            <div className="row">
              <LineGraph exams={stateDB.monthlyAttempts} timeframe={stateTimefilter} examDataRaw={stateDB.examDataRaw} />
              <BarGraph exams={stateDB.examsOverview} sortedAttempts={stateDB.examData} />
              <LineGraphScores exams={stateDB.monthlyAttempts} timeframe={stateTimefilter} examDataRaw={stateDB.examDataRaw} />
              <BarGraph_failpercent exams={stateDB.examsOverview} />
            </div>



          </div>
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>For help and a usage guide on this tool see <a href="https://wiki.nov.com">https://wiki.nov.com</a></span>
            </div>
          </div>
        </footer>
      </div>
    </div>

  );
}




export default App;
