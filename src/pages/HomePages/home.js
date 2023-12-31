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
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GoMail } from 'react-icons/go';

const HomePage = () => {
  let cellDimConstantShowMode = 0.5;
  let cellDimConstantEducationMode = 1.2;
  let weightSizeShowMode = 7;
  let weightSizeEducationMode = 13;

  const [row, setRow] = useState(30);
  const [col, setCol] = useState(30);
  const [option, setOption] = useState('Wall');
  const [algorithm, setAlgorithm] = useState('dfs');
  const [multi, setMulti] = useState(false)
  const [sliderValue, setSliderValue] = useState(200); // Default value of 60
  const [logMessage, setLogMessage] = useState('');
  const gridRef = useRef();
  const logRef = useRef();
  const [key, setKey] = useState(0);
  const [mode, setMode] = useState(true);
  const [cellDim,setCellDim] = useState(cellDimConstantEducationMode);
  const [weightSize,setWeightSize] = useState(15);
  const [maxRow,setMaxRow] = useState(100);
  const [maxCol ,setMaxCol] = useState(100)
  const [isProcessing, setIsProcessing] = useState(false);
  const [solid,setSolid] = useState(true);



  const handleSolid =(event)=>{
    setSolid(!solid);
  }

  const startProcess = () => {
    setIsProcessing(true);
  };




  const onHandleSetMode = () =>{
    setMode(!mode);
  }
  


  const handleSizeSubmit = (newRow, newCol) => {

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
    setCellDim(cellDimConstantShowMode);
    setWeightSize(weightSizeShowMode);
    }else{

    setRow(30);
    setCol(30);
    setCellDim(cellDimConstantEducationMode);
    setWeightSize(weightSizeEducationMode);
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
            <h1>Maze Solver </h1>
            <div className="social-links">
            <a href="https://github.com/MO7G" target="_blank" rel="noopener noreferrer">
        <FaGithub size={42} className='github'/>
      </a>
      <a href="https://www.linkedin.com/in/muhamed-elhag/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={42} className='linkedin' />
      </a>
      <a href="mailto:muhamedelhagg@gmail.com" target="_blank" rel="noopener noreferrer">
        <GoMail size={42} className='email' />
      </a>
            </div>
          </div>
          <ToastContainer />
          <Dashboard onSolid={solid} onHandleSolid={handleSolid} onIsProcessing={isProcessing} onHandleSetMode={onHandleSetMode} onMode={mode} onSliderValue={sliderValue} onSetSliderValue={hanldeSetSliderValue} onSetMulti={handleSetMulti} onHandleOrder={handleOrder} onRow={row} onCol={col} onSetRow={setRow} onSetCol={setCol} onOption={option} onHandleSetOption={handleSetOption} onSizeSubmit={handleSizeSubmit} handleSetAlgorithm={handleSetAlgorithm} algorithm={algorithm} />
          <Grid onSolid={solid} onMode={mode} onSetIsProcessing={setIsProcessing} onWeightedSize={weightSize} onCellDim={cellDim} handleSetLogMessage={setLogMessage} onSliderValue={sliderValue} ref={gridRef} onMulti={multi} row={row} col={col} onOption={option} onAlgorithm={algorithm} />
          <Log key={key} ref={logRef} onLogMessage={logMessage}></Log>
          <div className='size' style={{ height: '1000px ' }}></div>

        </div ></Col>
      </Row>
    </Container>

  );
};

export default HomePage;
