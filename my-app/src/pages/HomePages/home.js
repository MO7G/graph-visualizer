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
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [option, setOption] = useState('Wall');
  const [algorithm, setAlgorithm] = useState('dfs');
  const [multi, setMulti] = useState(false)
  const [sliderValue, setSliderValue] = useState(0.5); // Default value of 60
  const [logMessage, setLogMessage] = useState('');
  const gridRef = useRef();
  const logRef = useRef();
  const [key, setKey] = useState(0);



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

  const handleSetAlgorithm = (event) => {
    setAlgorithm(event.target.value);
  }

  const handleSetOption = (event) => {
    console.log(event.target.value);
    setOption(event.target.value);
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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas corrupti ipsa accusantium qui totam, nihil sit officiis. Doloribus, quibusdam? Quae placeat tempore dolorem? Suscipit tenetur fugit enim ipsum! Optio, quidem?</p>
          </div>
          <ToastContainer />
          <Dashboard onSliderValue={sliderValue} onSetSliderValue={hanldeSetSliderValue} onSetMulti={handleSetMulti} onHandleOrder={handleOrder} onRow={row} onCol={col} onSetRow={setRow} onSetCol={setCol} onOption={option} onHandleSetOption={handleSetOption} onSizeSubmit={handleSizeSubmit} handleSetAlgorithm={handleSetAlgorithm} algorithm={algorithm} />
          <Grid handleSetLogMessage={setLogMessage} onSliderValue={sliderValue} ref={gridRef} onMulti={multi} row={row} col={col} onOption={option} onAlgorithm={algorithm} />
          <Log key={key} ref={logRef} onLogMessage={logMessage}></Log>
          <div className='size' style={{ height: '1000px ' }}></div>
        </div ></Col>
      </Row>
    </Container>

  );
};

export default HomePage;
