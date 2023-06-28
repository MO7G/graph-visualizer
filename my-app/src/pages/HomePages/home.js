import React, { useState, useRef, useEffect } from 'react';
import Dashboard from './dashBoard';
import Grid from './grid';
import Log from './logs';
import '../../css/home.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = () => {
  const [row, setRow] = useState(30);
  const [col, setCol] = useState(30);
  const [option, setOption] = useState('Wall');
  const [algorithm, setAlgorithm] = useState('dfs');
  const [multi, setMulti] = useState(false)
  const [sliderValue, setSliderValue] = useState(0.5); // Default value of 60
  const [logMessage, setLogMessage] = useState('');
  const gridRef = useRef();
  const logRef = useRef();
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState(true);
  const [cellDim,setCellDim] = useState(0.7);
  const [weightSize,setWeightSize] = useState(20);
  const [maxRow,setMaxRow] = useState(100);
  const [maxCol ,setMaxCol] = useState(100)

  const onHandleSetMode = () =>{
    setMode(!mode);
  }
  


  const handleSizeSubmit = (newRow, newCol) => {

    console.log("yes this is it ", gridRef);
    setRow(newRow);
    setCol(newCol);
  };

  useEffect(() => {
    gridRef.current.clearGrid();
  }, [row, col]);


  useEffect(() => {
    logRef.current.handleNewLog(logMessage);
  }, [logMessage]);



  useEffect(() => {
    // Chainging from educaton to show mode and vise versa !!!
    if(!mode){
    setRow(50);
    setCol(100);
    setCellDim(0.7);
    setWeightSize(10);
    }else{

    setRow(30);
    setCol(30);
    setCellDim(2);
    setWeightSize(20);
    }
  }, [mode]);

  const handleSetAlgorithm = (algo,flag) => {
        if(!flag){
          setAlgorithm(algo);
        }
        if(flag == null){
          setAlgorithm(algo.target.value)
        }
  }

  const handleSetOption = (value,flag) => {
    if(!flag){
      setOption(value);
    }
    if(flag == null){
      setOption(value.target.value)
    } 

  }

  const handleSetMulti = (event) => {
    handleSetAlgorithm(event);
    // console.log(multi)
    setMulti(true);
  }

  const handleOrder = (event) => {
    const buttonId = event.target.id;
    gridRef.current.handleOrder(buttonId);
  };

  const hanldeSetSliderValue = (value) => {
    setSliderValue(value);
  };

  const handleSetLogMessage = (info) => {
    setLogMessage(info);
  }
  return (

    <Container fluid  >
      <Row>
        <Col> <div className='home'>
          <div className='header'>
            <h1>Home Page</h1>
          </div>
          <ToastContainer />
          <Dashboard onHandleSetMode={onHandleSetMode} onMode={mode} onSliderValue={sliderValue} onSetSliderValue={hanldeSetSliderValue} onSetMulti={handleSetMulti} onHandleOrder={handleOrder} onRow={row} onCol={col} onSetRow={setRow} onSetCol={setCol} onOption={option} onHandleSetOption={handleSetOption} onSizeSubmit={handleSizeSubmit} handleSetAlgorithm={handleSetAlgorithm} algorithm={algorithm} />
          <Grid onWeightedSize={weightSize} onCellDim={cellDim} handleSetLogMessage={setLogMessage} onSliderValue={sliderValue} ref={gridRef} onMulti={multi} row={row} col={col} onOption={option} onAlgorithm={algorithm} />
          <Log key={key} ref={logRef} onLogMessage={logMessage}></Log>
          <div className='size' style={{ height: '1000px ' }}></div>
        </div ></Col>
      </Row>
    </Container>

  );
};

export default HomePage;
