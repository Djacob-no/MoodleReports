const FieldEditor = ({ value, onChange, id }) => {
    const handleChange = event => {
      const text = event.target.value;
      onChange(id, text);
    };
  
    return (
      <div className="field-editor">
        <div> <p> NOV DSL Reports
              </p>
        </div>
     
        <input className="main-search" placeholder="Search" onChange={handleChange} value={value} />
      </div>
    );
  };

  export default FieldEditor