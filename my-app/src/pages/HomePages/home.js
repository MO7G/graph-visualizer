import React, { useState,useRef,useEffect } from 'react';
import Dashboard from './dashBoard';
import Grid from './grid';
import Log from './logs';
import '../../css/home.css'
const HomePage = () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [option, setOption] = useState('Wall');
  const [algorithm,setAlgorithm] = useState('dfs');
  const gridRef = useRef()
  const handleSizeSubmit = (newRow, newCol) => {
    
    console.log("yes this is it " ,gridRef);
    setRow(newRow);
    setCol(newCol);
  };

  useEffect(() => {
    gridRef.current.clearGrid();
  }, [row,col]);



  const handleSetAlgorithm = (event) =>{
    setAlgorithm(event.target.value);
    } 
  
  const handleSetOption = (event) =>{
    console.log(event.target.value);
    setOption(event.target.value);
  }

  const handleClearGrid = () =>{
    
  }


  const handleOrder = (event) => {
    const buttonId = event.target.id;
    gridRef.current.handleOrder(buttonId);
  };
  

  

  return (
    <div className='home'>
      <h1>Home Page</h1>
      <Dashboard  onHandleOrder={handleOrder} onRow={row} onCol={col} onSetRow={setRow} onSetCol={setCol} onOption={option} onHandleSetOption={handleSetOption} onSizeSubmit={handleSizeSubmit}  handleSetAlgorithm={handleSetAlgorithm} algorithm={algorithm}/>
      <Grid ref={gridRef} row={row} col={col} onOption={option} onAlgorithm={algorithm}  />
      <Log></Log>
    </div>
  );
};

export default HomePage;
