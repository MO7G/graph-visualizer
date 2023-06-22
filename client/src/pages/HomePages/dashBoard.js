import React, { useState } from 'react';

const Dashboard = (props) => {
  const [row, setRow] = useState('');
  const [column, setColumn] = useState('');
  const [selectedOption, setSelectedOption] = useState('Wall');


  const handleRowChange = (event) => {
    setRow(event.target.value);
  };

  const handleColumnChange = (event) => {
    setColumn(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (row && column) {
      props.onSizeSubmit(Number(row), Number(column));
    }
  };

  const handleGridClear = (event) =>{
    props.onGridClear();
  }


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    props.setSelectedOption(event.target.value);
  };
  
  return (
    <div>
    <h2>Dashboard</h2>
    <button onClick={handleGridClear}>Clear Grid</button>
    <div className='radio-options'>
    <div>
        <input
          type="radio"
          name="option"
          value="Wall"
          checked={selectedOption === 'Wall'}
          onChange={handleOptionChange}
        />
        <label htmlFor="wall">Wall</label>
      </div>
      <div>
        <input
          type="radio"
          name="option"
          value="Clear"
          checked={selectedOption === 'Clear'}
          onChange={handleOptionChange}
        />
        <label htmlFor="clear">Clear</label>
      </div>
      <div>
        <input
          type="radio"
          name="option"
          value="Source"
          checked={selectedOption === 'Source'}
          onChange={handleOptionChange}
        />
        <label htmlFor="source">Source</label>
      </div>
      <div>
        <input
          type="radio"
          name="option"
          value="Target"
          checked={selectedOption === 'Target'}
          onChange={handleOptionChange}
        />
        <label htmlFor="target">Target</label>
      </div>
    </div>
    <form onSubmit={handleSubmit}>
      <label>
        Rows:
        <input type="number" value={row} onChange={handleRowChange} />
      </label>
      <label>
        Columns:
        <input type="number" value={column} onChange={handleColumnChange} />
      </label>
    
      <button type="submit">Submit</button>
    </form>
  </div>
  );
};

export default Dashboard;
