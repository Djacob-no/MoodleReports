import SearchBar from './SearchBar';
import React, { useState } from 'react';


const FormEditor = ({field}) => {
    const [values, setValues] = useState({});
    const handleFieldChange = (fieldId, value) => {
      setValues({ ...values, [fieldId]: value });
    };
  
  
  
    return (
      <div>
         <SearchBar
        key={field}
        id={field}
        onChange={handleFieldChange}
        value={values[field]}
      />
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    );
  };
  

  export default FormEditor