import React, { useState } from 'react';
import Dashboard from './dashBoard';
import Grid from './grid';
const HomePage = () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [selectedOption, setSelectedOption] = useState('Wall');
  const handleSizeSubmit = (newRow, newCol) => {
    setRow(newRow);
    setCol(newCol);
  };

  const gridClear = ()=>{
    const cells = document.getElementsByClassName('cell');
     Array.from(cells).forEach((cell) => {
    cell.classList.remove('wall');
    cell.classList.remove('source')
    cell.classList.remove('target')
    cell.classList.remove('visiting')
    cell.classList.remove('done')
    // Remove any other classes as needed
  });
     //console.log(Array.from(cells))
  }

  

  return (
    <div>
      <h1>Home Page</h1>
      <Dashboard onSizeSubmit={handleSizeSubmit} onGridClear={gridClear} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
      <Grid row={row} col={col} selectedOption={selectedOption} />
    </div>
  );
};

export default HomePage;
