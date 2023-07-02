import React, { useState, version, useEffect, useImperativeHandle } from 'react';
import '../../css/grid.css'
import Dfs from '../../Algorithm/DFS'
import DfsHelper from '../../Algorithm/DFS';
import BfsHelper from '../../Algorithm/BFS'
import DijHelper from '../../Algorithm/dijkstra';
import greedyHelper from '../../Algorithm/greedy';
import bellmanFordHelper from '../../Algorithm/bellmanFord';
import AStarHelper from '../../Algorithm/Astar';
import mazeBacktrackingHelper from '../../Algorithm/recursiveMazeGenerator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gridNumbersPatternHelper from '../../Algorithm/gridNumberPatterns';

const Grid = React.forwardRef((props, ref) => {
  const [mouseClicked, setMouseClicked] = useState(false);
  const [gridNumbers, setGridNumbers] = useState([]);
  const [weightAllowed, setWeightAllowed] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [okay, setOkay] = useState(13);
  useImperativeHandle(ref, () => ({
    handleOrder,
    clearGrid
  }))


 const drawMaze = (path) =>{

  const cellElements = Array.from(document.getElementsByClassName('cell'));
  let delay = props.onSliderValue;
  if(props.onMode == true){
    delay = 8
  }else{
delay = 2
  }
  props.onSetIsProcessing(true);
  const animateFirstLoop = () => {
    return new Promise((resolve) => {
      if (path[0].length === 0) {
        resolve();
      }

      for (let i = 0; i < path[0].length; i++) {
        const [row, col] = path[0][i];
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        setTimeout(() => {
          cell.classList.add('wall');
          if (i === path[0].length - 1) {
            resolve(); // Resolve the promise when the first loop finishes
          }

        }, delay * i);
      }
    });
  };



  const animateSecondLoop = () => {
    return new Promise((resolve) => {
        for (let i = 0; i < props.row; i++) {
         for(let j = 0 ;j < props.col ;j++){
          const cell = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
          setTimeout(() => {
           if(cell.classList.contains('wall')){
            cell.classList.remove('wall');
           }else{
            cell.classList.add('wall')
           }
           if(i == props.row-1 && j == props.col-1){
            resolve();
           }
          }, 1 * i);
        }
      }
    });
  };

  animateFirstLoop()
    .then(animateSecondLoop).then(() => {
      handleToastProcessing("","destroy")
      handleToastProcessing("random", "success");
      props.onSetIsProcessing(false);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });

 }
 const backTrackingMaze = async () =>{
          clearGrid();
          handleToastProcessing("maze", "processing")       
          let object = handleGridDTS(props.row, props.col);
          await delay(50);
          let animation = await mazeBacktrackingHelper(object);
          //props.handleSetLogMessage(animation[2]);
          // console.log(animation[2])
          
          drawMaze(animation);

 }
  const handleOrder = (buttonId) => {
    if (buttonId === 'clearButton') {
      // Handle Clear button click
      clearGrid();
    } else if (buttonId === 'animateButton') {
      Animate();
      // Handle Animate button click
    } else if (buttonId === 'kurskalMazeButton') {
      backTrackingMaze()
      // Handle Kurskal Maze button click
    } else if (buttonId === 'randomMazeButton') {
      randomMaze();
      // Handle Random Maze button click
    } else if (buttonId === 'positiveNumbersButton') {
      fillGridWithNumbers();
      // Handle Positive Numbers button click
    } else if (buttonId === 'clearNumbers') {
      // Handle Negative Numbers button click
      clearNumbers();
    }else if(buttonId == 'specialPattren'){
      let pattern = gridNumbersPatternHelper(props.row,props.col);
      setWeightAllowed(true);
      setGridNumbers(pattern);
    }
  }

  const doWork = () => {
    for (let i = 0; i < 3000000000; i++) {
    }
    return 12;
  }

  const testing = async () => {
    if (!buttonDisabled) {
      setButtonDisabled(true);
      toast.loading('Running Dijkstra algorithm...', { autoClose: false });
      await delay(50);
      doWork();
      toast.dismiss();
      toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // Once the operation is complete, re-enable the button
      setButtonDisabled(false);

    }


  }

  const handleCellClick = (event) => {
    let algorithm = props.onAlgorithm
    const cell = event.target
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))
    let x = Number(cell.getAttribute('data-row'));
    let y = Number(cell.getAttribute('data-col'));
    // console.log(cell.classList.value[1])
    const operation = props.onOption.toLowerCase();
    if (operation === 'wall') {
      cell.classList.add('wall');
      cell.classList.remove('source')
      cell.classList.remove('target');
      //   cellWeight[x*props.col + y].classList.remove('visible');
      //event.target.style.backgroundColor = 'black';
    } else if (operation === 'source') {
      const existingSource = document.querySelector('.source');
      if (existingSource && algorithm != "multi-dij" && algorithm != "multi-bfs") {
        existingSource.classList.remove('source');
      }
      cell.classList.remove('wall');
      cell.classList.remove('done');
      cell.classList.remove('visiting');
      cell.classList.remove('target');
      cell.classList.add('source');
      // cellWeight[x*props.col + y].classList.remove('visible');
    } else if (operation === 'target') {
      const existingSource = document.querySelector('.target');
      if (existingSource) {
        existingSource.classList.remove('target');
      }
      cell.classList.add('target');
      cell.classList.remove('source');
      cell.classList.remove('wall');
      cell.classList.remove('done');
      cell.classList.remove('visiting');

    }
    else {
      cell.classList.remove('wall');
      cell.classList.remove('source');
      cell.classList.remove('target');

    }

  };

  const handleCellClickForMultiSource = (event) => {
    const cell = event.target
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))
    let x = Number(cell.getAttribute('data-row'));
    let y = Number(cell.getAttribute('data-col'));
    // console.log(cell.classList.value[1])
    const operation = props.onOption.toLowerCase();
    if (operation === 'wall') {
      cell.classList.add('wall');
      //   cellWeight[x*props.col + y].classList.remove('visible');
      //event.target.style.backgroundColor = 'black';
    } else if (operation === 'source') {
      const existingSource = document.querySelector('.source');
      if (existingSource) {
        existingSource.classList.remove('source');
      }
      cell.classList.add('source');
      // cellWeight[x*props.col + y].classList.remove('visible');
    } else if (operation === 'target') {
      const existingSource = document.querySelector('.target');
      if (existingSource) {
        existingSource.classList.remove('target');
      }
      cell.classList.add('target');
      //  cellWeight[x*props.col + y].classList.remove('visible');
    }
    else {
      cell.classList.remove('wall');
      cell.classList.remove('source');
      cell.classList.remove('target');
      // cellWeight[x*props.col + y].classList.remove('visible');

    }
  }

  const handleGridDTS = (row, col) => {
    const cell = Array.from(document.getElementsByClassName('cell'))
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))

    let source = [];
    let target = [];
    let realGrid = [];
    let walls = 0;
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;

        if (weightAllowed) {
          let number = Number(cellWeight[i * col + j].querySelector('p').textContent)
          if (!div.contains('source') && !div.contains('wall') && !div.contains('target')) {
            row.push(number);
            continue;
          }
        }

        if (div.contains('source')) {

          source.push([i, j])
        }

        if (div.contains('target')) {
          target[0] = i;
          target[1] = j;
        }

        if (div.contains('wall')) {
          row.push(-1);
          walls++;
        } else {
          row.push(0);
        }
      }
      realGrid.push(row);
    }
    let algorithm = props.onAlgorithm
    const gridData = {
      realGrid,
      source,
      target,
      algorithm,
      row,
      col,
      walls
    };
    return gridData
  }

  const handleGridDtsForMultiSource = (row, col) => {
    const cell = Array.from(document.getElementsByClassName('cell'))
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))

    let source = [];
    let target = [];
    let realGrid = [];

    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;

        if (weightAllowed) {
          let number = Number(cellWeight[i * col + j].querySelector('p').textContent)
          if (!div.contains('source') && !div.contains('wall') && !div.contains('target')) {
            row.push(number);
            continue;
          }
        }

        if (div.contains('source')) {
          source.push([i, j]);
        }

        if (div.contains('target')) {
          target[0] = i;
          target[1] = j;
        }

        if (div.contains('wall')) {
          row.push(-1);
        } else {
          row.push(0);
        }
      }
      realGrid.push(row);
    }
    let algorithm = props.onAlgorithm
    const gridData = {
      realGrid,
      source,
      target,
      algorithm,
      row,
      col
    };
    return gridData
  }

  const something = async () => {

  };


  const checkSourceAndTarget = () => {
    let flag = true;
    const source = document.querySelector('.source')
    const target = document.querySelector('.target');
    if (source === null && target === null) {
      flag = !flag;
      handleToastProcessing("", "source-target")
    } else if (source === null) {
      flag = !flag;
      handleToastProcessing("", "source")
    } else if (target === null) {
      flag = !flag;
      handleToastProcessing("", "target")
    }
    return flag;
  }
  
  const draw = (path) => {
    const cellElements = Array.from(document.getElementsByClassName('cell'));
    //  const duration = props.onSliderValue * path[0].length; // Total duration of the first loop
    // const delay = duration / path[0].length; // Delay between frames based on fps and path length
    let totalCells = props.row * props.col;
    let value = props.onSliderValue;
    let delay
    if(props.onMode == true){
    if(value == 1){
      delay = 300   
      }else if(value == 21){
        delay = 150
      }else if(value == 41){
         delay = 75
      }else if(value == 61){
   delay = 15
      }else if(value  == 81){
      delay = 8
      }else if(value == 100){
    delay = 2
      }
    }else{
      if(value == 1){
        delay = 30   
        }else if(value == 21){
          delay = 20
        }else if(value == 41){
           delay = 15
        }else if(value == 61){
     delay = 10
        }else if(value  == 81){
        delay = 4
        }else if(value == 100){
      delay = 2
        }
    }
    const animateFirstLoop = () => {
      return new Promise((resolve) => {
        if (path[0].length === 0) {
          resolve();
        }

        for (let i = 0; i < path[0].length; i++) {
          const [row, col] = path[0][i];
          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

          setTimeout(() => {

            // document.querySelector('.rc-slider-handle').getAttribute('aria-valuenow')
            if (cell.classList.contains('target') || cell.classList.contains('source')) {

            } else {
              cell.classList.add('visiting');
            }

            if (i === path[0].length - 1) {
              resolve(); // Resolve the promise when the first loop finishes
            }


          }, delay * i); // Adjust the delay based on fps and path length
        }
      });
    };



    const animateSecondLoop = () => {
      return new Promise((resolve) => {
        if (path[1].length <= 1) {
          resolve();
        } else {
          path[1].forEach((position, index) => {
            const [row, col] = position;
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

            // Add a delay to the animation
            setTimeout(() => {

              // cell.classList.add('done');
              if (cell.classList.contains('target') || cell.classList.contains('source')) {

              } else {
                cell.classList.remove('visiting')
                cell.classList.add('done');
              }
              if (index === path[1].length - 1) {
                resolve(); // Resolve the promise when the second loop finishes
              }
            }, delay * index); // Adjust the delay based on fps and path length
          });
        }
      });
    };

    animateFirstLoop()
      .then(animateSecondLoop).then(() => {
        handleToastProcessing("", "destroy");
        if (path[1].length <= 1) {
          handleToastProcessing(props.onAlgorithm, "no-path");
        }
        handleToastProcessing(props.onAlgorithm, "success");
        setTimeout(() => {
          props.onSetIsProcessing(false);
        }, 800);
   
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });


  };


  const specialClear = () => {
    const cell = Array.from(document.getElementsByClassName('cell'))
    // const cellWeight = Array.from(document.getElementsByClassName('grid-number'))
    let row = props.row;
    let col = props.col;
    for (let i = 0; i < row; i++) {

      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;
        div.remove('done');
        div.remove('visiting')
      }
    }
  }

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // const delay = () => new Promise((resolve) => setTimeout(resolve, 0));


  const handleToastProcessing = (algorithm, reason) => {
    if (algorithm == 'dij') {
      algorithm = "Dijkstra's"
    } else if (algorithm === 'bfs') {
      algorithm = "Breadth firsrt Search";
    } else if (algorithm === 'dfs') {
      algorithm = "Depth First Search"
    } else if (algorithm == 'Astar') {
      algorithm = "A * Search"
    } else if (algorithm == 'multi-bfs') {
      algorithm = "Multiple Breadth first Search"
    } else if (algorithm == 'multi-dij') {
      algorithm = "Multiple Dijkstra"
    }else if (algorithm == 'bellman-ford'){
      algorithm = "Bellman Ford Shortest Path"
    }else if(algorithm == "greedy"){
      algorithm = "Greedy Best First Search";
    }else if(algorithm == "random"){
      algorithm = "Random Recursive"
    }

    if (reason == "processing") {
      toast.loading(`Processing ${algorithm} algorithm...`, { autoClose: false });
    } else if (reason == "pathFinding") {
      toast.loading('🦄 Finding The Path!', { autoClose: false });
    } else if (reason == "success") {
      toast.success(`${algorithm} processing is complete.`);
    }
    else if (reason == "destroy") {
      toast.dismiss();
    } else if (reason === "error") {
      toast.error(`${algorithm} couldn't find solution`);
    } else if (reason == "source") {
      toast.error("Source is not set")
    } else if (reason == "target") {
      toast.error("Target is not set");
    } else if (reason == "source-target") {
      toast.error("Source and Target are not set");
    } else if (reason == "many-sources") {
      toast.error("Remove extra Sources");
    } else if (reason == "no-path") {
      toast.info(`${algorithm} can't find a path`)
    }
  }

  const checkNumberOfSource = () => {
    const cell = Array.from(document.getElementsByClassName('cell'))
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))

    let source = [];
    let target = [];
    let realGrid = [];
    let row = props.row;
    let col = props.col;
    let counter = 0;
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;
        if (div.contains('source')) {
          counter++;
        }
      }
    }

    if (counter == 1) {
      return true;
    } else {
      return false;
    }
  }

  const Animate = async () => {
    let flag = checkSourceAndTarget();
    let algorithm = props.onAlgorithm
    if (flag) {
      specialClear();
      if (algorithm === 'dfs') {
        let numberOfSources = checkNumberOfSource();
        if (numberOfSources) {
          props.onSetIsProcessing(true);
          handleToastProcessing("dfs", "processing")
          let object = handleGridDTS(props.row, props.col);
          await delay(50);
          let animation = await DfsHelper(object);
          props.handleSetLogMessage(animation[2]);
          // console.log(animation[2])
          handleToastProcessing("", "destroy");
          handleToastProcessing("", "pathFinding")
       
          draw(animation);
        } else {
          handleToastProcessing("", "many-sources")
        }
      } else if (algorithm === 'bfs') {
        let numberOfSources = checkNumberOfSource();
        if (numberOfSources) {
          props.onSetIsProcessing(true);
          handleToastProcessing("bfs", "processing")
          let object = handleGridDTS(props.row, props.col);
          
          await delay(50);
          let animation = await BfsHelper(object);
          props.handleSetLogMessage(animation[2]);
          handleToastProcessing("", "destroy");
          handleToastProcessing("", "pathFinding")
          draw(animation);
        } else {
          handleToastProcessing("", "many-sources")

        }
      } else if (algorithm === 'dij') {
        let numberOfSources = checkNumberOfSource();
        if (numberOfSources) {
          props.onSetIsProcessing(true);
          handleToastProcessing("dij", "processing")
          let object = handleGridDTS(props.row, props.col);
          await delay(50);
          let animation = await DijHelper(object, "not-multiple-source");
          props.handleSetLogMessage(animation[2]);
          handleToastProcessing("", "destroy");
          handleToastProcessing("", "pathFinding")
          draw(animation);
        } else {
          handleToastProcessing("", "many-sources")

        }
      } else if (algorithm === 'bellman-ford') {
        let numberOfSources = checkNumberOfSource();
        if (numberOfSources) {
          props.onSetIsProcessing(true);
          handleToastProcessing("bellman-ford", "processing")
          let object = handleGridDTS(props.row, props.col);
          await delay(50);
          let animation = await bellmanFordHelper(object);
          props.handleSetLogMessage(animation[2]);
          handleToastProcessing("", "destroy");
          handleToastProcessing("", "pathFinding")
          draw(animation);
        } else {
          handleToastProcessing("", "many-sources")

        }
      } else if (algorithm === 'Astar') {
        let numberOfSources = checkNumberOfSource();
        if (numberOfSources) {
          props.onSetIsProcessing(true);
          handleToastProcessing("Astar", "processing")
          let object = handleGridDTS(props.row, props.col);
          await delay(50);
          let animation = await AStarHelper(object);
          props.handleSetLogMessage(animation[2]);
          toast.dismiss();
          if (animation[0] === null) {
            handleToastProcessing("Astar", "error");
          } else {
            handleToastProcessing("", "destroy");
            handleToastProcessing("", "pathFinding")

            draw(animation);
          }
        } else {
          handleToastProcessing("", "many-sources")
        }
      } else if (algorithm === 'greedy') {
        let numberOfSources = checkNumberOfSource();
        if (numberOfSources) {
          props.onSetIsProcessing(true);
          handleToastProcessing("greedy", "processing")
          let object = handleGridDTS(props.row, props.col);
          await delay(50);
          let animation = await greedyHelper(object);
          props.handleSetLogMessage(animation[2]);
          toast.dismiss()
          if (animation[0] === null) {
            handleToastProcessing("Astar", "error");
          } else {
            handleToastProcessing("", "destroy");
            handleToastProcessing("", "pathFinding")

            draw(animation);
          }
        } else {
          handleToastProcessing("", "many-sources")
        }
       } else if (algorithm === 'multi-bfs') {
        props.onSetIsProcessing(true);
        handleToastProcessing("mutli-bfs", "processing")
        let object = handleGridDTS(props.row, props.col);
        await delay(50);
        let animation = await BfsHelper(object, "multi-bfs");
        props.handleSetLogMessage(animation[2]);
        handleToastProcessing("", "destroy");
        handleToastProcessing("", "pathFinding")
        draw(animation);
      } else if (algorithm === 'multi-dij') {
        props.onSetIsProcessing(true);
        handleToastProcessing("mutli-bfs", "processing")
        let object = handleGridDTS(props.row, props.col);
        await delay(50);
        let animation = await DijHelper(object, "multi-dij");
        props.handleSetLogMessage(animation[2]);
        handleToastProcessing("", "destroy");
        handleToastProcessing("", "pathFinding")
        draw(animation);
      }

    }
  }

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      setMouseClicked(true);
    }
  };

  const handleMouseUp = (event) => {
    if (event.button === 0) {
      setMouseClicked(false);
    }
  };

  useEffect(() => {
    const handleMouseEnter = (event) => {

      if (mouseClicked) {
        handleCellClick(event)
      }
    };

    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach((cell) => {
      cell.addEventListener('mouseenter', handleMouseEnter);
    });

    return () => {
      Array.from(cells).forEach((cell) => {
        cell.removeEventListener('mouseenter', handleMouseEnter);
      });
    };

  }, [mouseClicked]);



  // Function to fill the grid with random numbers
  const fillGridWithNumbers = () => {
    const numbers = [];
    for (let i = 0; i < props.row; i++) {
      const rowNumbers = [];
      for (let j = 0; j < props.col; j++) {

        const bigNumber = Math.floor(Math.random() * 99); // Random number between 50 and 149
        rowNumbers.push(bigNumber);
      }
      numbers.push(rowNumbers)
    }
    setGridNumbers(numbers);
    setWeightAllowed(true);
  };

  const clearNumbers = () => {
    setWeightAllowed(false);
    setGridNumbers([]);
  };

  const clearGrid = () => {
    const cells = document.getElementsByClassName('cell');
    const cellWeight = document.getElementsByClassName('grid-number');
    Array.from(cells).forEach((cell) => {
      cell.classList.remove('wall');
      cell.classList.remove('source')
      cell.classList.remove('target')
      cell.classList.remove('visiting')
      cell.classList.remove('done')
      // Remove any other classes as needed
    });

    //Array.from(cellWeight).forEach((cell) => {
    //cell.classList.remove('visible');
    // Remove any other classes as needed
    // });
    //console.log(Array.from(cells))
    setGridNumbers([]);
  };

  const randomMaze = () => {
    clearGrid();
    let row = props.row;
    let col = props.col;
    for (let i = 0; i < row / 2; i++) {
      for (let j = 0; j < col / 2; j++) {
        const x = Math.floor(Math.random() * row); // Random number between 0 and x-1
        const y = Math.floor(Math.random() * col);
        const cell = document.querySelector(`[data-row="${x}"][data-col="${y}"]`);
        setTimeout(() => {
          cell.classList.add('wall');
          cell.classList.remove('visiting');
          cell.classList.remove('done');


        }, 10 * i + j);

      }
    }
  }

  // Generate the grid based on the gridNumbers state
  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < props.row; i++) {
      const rowCells = [];
      for (let j = 0; j < props.col; j++) {
        const number = gridNumbers[i] ? gridNumbers[i][j] : null;
        const cell = (
          <div
            key={`${i}-${j}`}
            style={{
              width: `${props.onCellDim}em`,
              height: `${props.onCellDim}em`,
              backgroundColor: 'white',
              border: "0.1px solid black"
            }}
            data-row={i.toString()}
            data-col={j.toString()}
            className="cell"
            onClick={handleCellClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div key={`${i}-${j}`} data-row={i.toString()}
              data-col={j.toString()} className={`grid-number ${number !== null ? 'visible' : ''}`}>
              <p style={{fontSize:`${props.onWeightedSize}px`}}>
                {number !== null ? number : ''}
              </p>
            </div>
          </div>
        );
        rowCells.push(cell);
      }
      grid.push(
        <div key={i} style={{ display: 'flex' }}>
          {rowCells}
        </div>
      );
    }
    return grid;
  };

  return (

    < div className='grid' >
      {generateGrid()}
    </div >
  );
});


export default Grid;



