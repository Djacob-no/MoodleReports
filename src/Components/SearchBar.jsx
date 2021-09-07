const FieldEditor = ({ value, onChange, id }) => {
    const handleChange = event => {
      const text = event.target.value;
      onChange(id, text);
    };
  
    return (
      <div className="field-editor">
        <input onChange={handleChange} value={value} />
      </div>
    );
  };

  export default FieldEditor