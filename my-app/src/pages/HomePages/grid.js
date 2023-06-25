import React, { useState, version, useEffect,useImperativeHandle } from 'react';
import '../../css/grid.css'
import Dfs from '../../Algorithm/DFS'
import DfsHelper from '../../Algorithm/DFS';
import BfsHelper from '../../Algorithm/BFS'
import DijHelper from '../../Algorithm/dijkstra';
import mazeGenerator from '../../Algorithm/Testing/mazeGenerator'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Grid = React.forwardRef((props,ref) => {
  let cellDim = 1
  const [mouseClicked, setMouseClicked] = useState(false);
  const [gridNumbers, setGridNumbers] = useState([]);
  const [sliderValue, setSliderValue] = useState(60); // Default value of 60
  const [weightAllowed,setWeightAllowed] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOrder,
    clearGrid
  }))


  const handleOrder = (buttonId) => {  
    if (buttonId === 'clearButton') {
      // Handle Clear button click
      clearGrid();
    } else if (buttonId === 'animateButton') {
      Animate();
      // Handle Animate button click
    } else if (buttonId === 'kurskalMazeButton') {
      generateMaze()
      // Handle Kurskal Maze button click
    } else if (buttonId === 'randomMazeButton') {
      generateMaze();
      // Handle Random Maze button click
    } else if (buttonId === 'positiveNumbersButton') {
      fillGridWithNumbers();
      // Handle Positive Numbers button click
    } else if (buttonId === 'negativeNumbersButton') {
      // Handle Negative Numbers button click
      fillGridWithNegativeNumbers();
    }
  };

  const doWork = ()=>{
    for(let i  = 0 ;i < 3000000000;i++){
    }
    return 12;
  }
  
  const testing = async () =>{
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
  const handleSliderChange = (value) => {
    setSliderValue(value); // Update the slider value when it changes
  };

  const handleCellClick = (event) => {
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

  };

  const handleErrorMessage = () => {
    const sourceAndTarget = checkSourceAndTarget();
    let message = sourceAndTarget.get('message');
    if (message === true) {
      return true;
    } else {
      window.alert(message)
      return false;
    }
  }

  const handleGridDTS = (row, col) => {
    const cell = Array.from(document.getElementsByClassName('cell'))
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))

    let source = [];
    let target = [];
    let realGrid = [];
    
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;     
 
        if(weightAllowed){
        let number = Number(cellWeight[i*col+j].querySelector('p').textContent)
        if(!div.contains('source') && !div.contains('wall') && !div.contains('target')){
            row.push(number);
            continue;      
          }
        }
        
        if (div.contains('source')) {
          source[0] = i;
          source[1] = j;
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
    console.log(gridData);
    return gridData
  }
  
  const something = () =>{
    const cell = Array.from(document.getElementsByClassName('cell'))
    const cellWeight = Array.from(document.getElementsByClassName('grid-number'))

    let source = [];
    let target = [];
    let realGrid = [];
    let row = props.row;
    let col = props.col;
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;     

      }
      
    }
  }
  const checkSourceAndTarget = () => {
    let answer = new Map();
    const source = document.querySelector('.source')
    const target = document.querySelector('.target');
    if (source === null && target === null) {
      answer.set('message', 'Both source and target elements are not chosen');
    } else if (source === null) {
      answer.set('message', 'Source element is not chosen');
    } else if (target === null) {
      answer.set('message', 'Target element is not chosen');
    } else {
      answer.set('message', true);
    }
    return answer;
  }

  const draw = (path, fps) => {
    const cellElements = Array.from(document.getElementsByClassName('cell'));
    const duration = 1000 * path[0].length; // Total duration of the first loop
    const delay = duration / path[0].length; // Delay between frames based on fps and path length
    console.log("this is it ", path[0].length);

    const animateFirstLoop = () => {
      return new Promise((resolve) => {
        path[0].forEach((position, index) => {
          const [row, col] = position;
          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

          // Add a delay to the animation
          setTimeout(() => {
            cell.classList.add('visiting');

            if (index === path[0].length - 1) {
              resolve(); // Resolve the promise when the first loop finishes
            }
          }, (1 * path[0].length / path[0].length) * index); // Adjust the delay based on fps and path length
        });
      });
    };

    const animateSecondLoop = () => {
      return new Promise((resolve) => {
        path[1].forEach((position, index) => {
          const [row, col] = position;
          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

          // Add a delay to the animation
          setTimeout(() => {
            cell.classList.add('done');

            if (index === path[1].length - 1) {
              resolve(); // Resolve the promise when the second loop finishes
            }
          }, (1 * path[0].length / path[0].length) * index); // Adjust the delay based on fps and path length
        });
      });
    };

    animateFirstLoop()
      .then(animateSecondLoop).then(() => {
        handleToastProcessing("","destroy");
        handleToastProcessing(props.onAlgorithm,"success");
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });

     
  };
  
  const fillNumber = () => {

  }

  const specialClear = () =>{
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

  const handleToastProcessing = (algorithm , reason) =>{
    if(algorithm == 'dij'){
      algorithm = "Dijkstra's"
    }else if ( algorithm === 'bfs'){
      algorithm = "Breadth firsrt Search";
    }else if(algorithm === 'dfs'){
      algorithm = "Depth First Search"
    }
    if( reason == "processing"){
    toast.loading(`Processing ${algorithm} algorithm...`, { autoClose: false });
    }else if(reason =="pathFinding"){
      toast.loading('🦄 Finding The Path!', { autoClose: false });
    }else if(reason == "success"){
      toast.success(`${algorithm} processing is complete.`);
    }
    else if(reason == "destroy"){
      toast.dismiss();
    }
  }

  const Animate = async () => {
    
    let flag = handleErrorMessage()
    if (flag) {
      specialClear();
      let object =  handleGridDTS(props.row, props.col);
      if (object.algorithm === 'dfs') {
        handleToastProcessing("dij","processing")
        await delay(50);
        let animation = await DfsHelper(object);
        handleToastProcessing("","destroy");
        handleToastProcessing("","pathFinding")
        draw(animation, 100);
      } else if (object.algorithm === 'bfs') {
        handleToastProcessing("dij","processing")
        await delay(50);
        let animation = await BfsHelper(object);
        handleToastProcessing("","destroy");
        handleToastProcessing("","pathFinding")
        draw(animation, 100);
      }else if(object.algorithm === 'dij'){
        handleToastProcessing("dij","processing")
        await delay(50);
        let animation = await DijHelper(object);
        handleToastProcessing("","destroy");
        handleToastProcessing("","pathFinding")
        draw(animation, 100);
      }else if(object.algorithm === 'bellman-ford'){
      
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
          // Generate big numbers for the first half of the row
          if(i === props.row-1 || i === 0 || j === props.col-1 || j === 0){
          const bigNumber = Math.floor(Math.random() * 10) ; // Random number between 50 and 149
          rowNumbers.push(bigNumber);
          }else{
            const bigNumber = Math.floor(Math.random() * 100) + 50; // Random number between 50 and 149
            rowNumbers.push(bigNumber);
          }
        
      }
      numbers.push(rowNumbers)
    }
    setGridNumbers(numbers);
    setWeightAllowed(true);
  };

  const fillGridWithNegativeNumbers = () => {
    const numbers = [];
    for (let i = 0; i < props.row; i++) {
      const rowNumbers = [];
      for (let j = 0; j < props.col; j++) {
        const randomNumber = Math.floor(Math.random() * 1999) - 999; // Generate random number between -999 and 999
        rowNumbers.push(randomNumber);
      }
      numbers.push(rowNumbers);
    }
    setGridNumbers(numbers);
    setWeightAllowed(true)
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

  const generateMaze = () => {
    let row = props.row;
    let col = props.col;
    for (let i = 0; i < row / 2; i++) {
      for (let j = 0; j < col / 2; j++) {
        const x = Math.floor(Math.random() * row); // Random number between 0 and x-1
        const y = Math.floor(Math.random() * col);
        const cell = document.querySelector(`[data-row="${x}"][data-col="${y}"]`);
        setTimeout(() => {
          cell.classList.add('wall');
          
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
              width: `${cellDim}em`,
              height: `${cellDim}em`,
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
            <div key={`${i}-${j}`}  data-row={i.toString()}
            data-col={j.toString()}  className={`grid-number ${number !== null ? 'visible' : ''}`}>
        <p>
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
  
    <div>
      <button onClick={testing} disabled={buttonDisabled}>test me</button>
      
      {generateGrid()}
      <h1>{props.onAlgorithm}</h1>
      <h1>{props.onOption}</h1>
      <div className='slider-container'>
        <Slider
          min={1} // Minimum value of the slider
          max={60} // Maximum value of the slider
          step={1} // Step value for each increment/decrement
          value={sliderValue} // Current value of the slider
          onChange={handleSliderChange} // Event handler for slider value change
        />
        <span>{sliderValue}</span> {/* Display the current slider value */}
      </div>
      
    </div >
  );
});


export default Grid;



