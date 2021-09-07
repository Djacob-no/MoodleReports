import SearchBar from './SearchBar';
import React, { useState } from 'react';


const FormEditor = props => {
    const [values, setValues] = useState({});
    const handleFieldChange = (fieldId, value) => {
      setValues({ ...values, [fieldId]: value });
    };
  
    const fields = props.fields.map(field => (
      <SearchBar
        key={field}
        id={field}
        onChange={handleFieldChange}
        value={values[field]}
      />
    ));
  
    return (
      <div>
        {fields}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    );
  };
  

  export default FormEditor