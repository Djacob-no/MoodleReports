import SearchBar from './SearchBar';
import React, { useState } from 'react';


const FormEditor = ({field, searchUpdate}) => {
    const [yo, setyo] = useState("Search");
    const handleFieldChange = ( value) => {
      setyo(value);
      searchUpdate(value);
    };
  
  
  
    return (
      <div>
         <SearchBar
        key={field}
        id={"field"}
        onChange={handleFieldChange}
        value={yo}
      />
        <pre>{JSON.stringify(yo)}</pre>
      </div>
    );
  };
  

  export default FormEditor