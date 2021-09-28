import React, { useState } from 'react';

const FieldEditor = ({ onChange }) => {

  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("2019-01-01");
  const [to, setTo] = useState("2200-01-01");


  const handleChange = event => {
    if (event.target.id === "search") setSearch(event.target.value);
    if (event.target.id === "from") setFrom(event.target.value)
    if (event.target.id === "to") setTo(event.target.value)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onChange({ "text": search, "from": from, "to": to });
    console.log({ "text": search, "from": from, "to": to })
  }

const date = new Date();
const dateString = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  return (
    <div className="field-editor">
      <form onSubmit={onSubmit}>
        <input  id="search" className="main-search" placeholder="Search" onChange={handleChange}  />
        <div>
            <input value={from} className="dateInput" type="date" id="from" onChange={handleChange}></input>-
            <input  value={dateString} className="dateInput" type="date" id="to" onChange={handleChange}></input>
        </div>
      </form>



    </div>
  );
};

export default FieldEditor