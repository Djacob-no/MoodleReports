const FieldEditor = ({ onChange}) => {
    const handleChange = event => {
      const text = event.target.value;
      onChange(text);
    };
  
    return (
      <div className="field-editor">
        <div> <p> NOV DSL Reports
              </p>
        </div>
     
        <input className="main-search" placeholder="Search" onChange={handleChange}  />
      </div>
    );
  };

  export default FieldEditor