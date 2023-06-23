import React, { useState, version, useEffect } from 'react';
import '../../css/grid.css'
import Dfs from '../../Algorithm/DFS'
import DfsHelper from '../../Algorithm/DFS';
import BfsHelper from '../../Algorithm/BFS'
import mazeGenerator from '../../Algorithm/Testing/mazeGenerator'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

let algorithm = 'bfs';

const Grid = (props) => {
  let cellDim = 0.3
  const [mouseClicked, setMouseClicked] = useState(false);
  const [gridNumbers, setGridNumbers] = useState([]);
  const [sliderValue, setSliderValue] = useState(60); // Default value of 60

  const handleSliderChange = (value) => {
    setSliderValue(value); // Update the slider value when it changes
  };

  const handleCellClick = (event) => {
    const cell = event.target
    // console.log(cell.classList.value[1])
    const operation = props.selectedOption.toLowerCase();
    if (operation === 'wall') {
      cell.classList.add('wall');
      //event.target.style.backgroundColor = 'black';
    } else if (operation === 'source') {
      const existingSource = document.querySelector('.source');
      if (existingSource) {
        existingSource.classList.remove('source');
      }
      cell.classList.add('source');
    } else if (operation === 'target') {
      const existingSource = document.querySelector('.target');
      if (existingSource) {
        existingSource.classList.remove('target');
      }
      cell.classList.add('target');
    }
    else {
      cell.classList.remove('wall');
      cell.classList.remove('source');
      cell.classList.remove('target');
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
    let source = [];
    let target = [];
    let realGrid = [];
    for (let i = 0; i < row; i++) {
      let row = [];
      for (let j = 0; j < col; j++) {
        let div = cell[i * col + j].classList;

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
    const duration = 100 * path[0].length; // Total duration of the first loop
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
      .then(animateSecondLoop)
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const fillNumber = () => {

  }


  const Animate = () => {
    let flag = handleErrorMessage()
    if (flag) {
      let object = handleGridDTS(props.row, props.col);
      if (object.algorithm === 'dfs') {
        let animation = DfsHelper(object)
        draw(animation, 10);
      } else if (object.algorithm === 'bfs') {
        let animation = BfsHelper(object)
        console.log(animation)
        draw(animation, 100);
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

  const updateCell = (event) => {
    const target = event.target;
    const row = Number(target.getAttribute('data-row'));
    const col = Number(target.getAttribute('data-col'));
    // Rest of the updateCell logic...
  };


  // Function to fill the grid with random numbers
  const fillGridWithNumbers = () => {
    const numbers = [];
    for (let i = 0; i < props.row; i++) {
      const rowNumbers = [];
      for (let j = 0; j < props.col; j++) {
        const randomNumber = Math.floor(Math.random() * 999);
        rowNumbers.push(randomNumber);
      }
      numbers.push(rowNumbers);
    }
    setGridNumbers(numbers);
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
  };

  const clearGrid = () => {
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
            {number !== null ? number : ''} {/* Display the number if it exists */}
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
      <button onClick={fillGridWithNegativeNumbers}>fill negative numbers</button>
      <button onClick={fillGridWithNumbers}>Fill Grid</button> {/* Button to fill the grid */}
      {generateGrid()}
      <h1>{props.selectedOption}</h1>
      <button onClick={handleGridDTS}>generate ds</button>
      <button onClick={checkSourceAndTarget}>ValidateGrid</button>
      <button onClick={Animate}>animate</button>
      <button onClick={handleErrorMessage}>error message</button>
      <button onClick={clearGrid}>clear gird</button>
      <button onClick={generateMaze}>generate Maze</button>
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
};


export default Grid;



