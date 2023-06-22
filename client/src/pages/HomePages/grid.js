import React, { useState, version,useEffect } from 'react';
import '../../css/grid.css'
import Dfs from '../../Algorithm/DFS'
import DfsHelper from '../../Algorithm/DFS';


let algorithm = 'dfs';

const Grid = (props) => {
  let cellDim = 2
  const [mouseClicked, setMouseClicked] = useState(false);

  const handleCellClick = (event) => {
    const cell  = event.target
 // console.log(cell.classList.value[1])
   const operation = props.selectedOption.toLowerCase();
   if(operation === 'wall'){
      cell.classList.add('wall');
    //event.target.style.backgroundColor = 'black';
   }else if(operation === 'source'){
    const existingSource = document.querySelector('.source');
    if(existingSource){
        existingSource.classList.remove('source');
    }
    cell.classList.add('source');
   }else if(operation === 'target'){
    const existingSource = document.querySelector('.target');
    if(existingSource){
        existingSource.classList.remove('target');
    }
    cell.classList.add('target');   
}
    else{
    cell.classList.remove('wall');
    cell.classList.remove('source');
    cell.classList.remove('target');
}
  
};
 
  const handleErrorMessage = () =>{
    const sourceAndTarget = checkSourceAndTarget();
    let message = sourceAndTarget.get('message');
    if(message === true){
      return true;
    }else{
      window.alert(message)
      return false;
    }
  }

  const handleGridDTS = (row,col) =>{
    const cell = Array.from(document.getElementsByClassName('cell'))    
    let source = [];
    let target = [];
    let realGrid = [];
    for(let i  = 0; i < row ; i++){
      let row = [];
        for(let j = 0 ;j < col ;j++){
          let div = cell[i*col + j].classList;
          
          if(div.contains('source')){
            source[0] = i;
            source[1] = j;
          }

          if(div.contains('target')){
            target[0] = i;
            target[1] = j;
          }

          if(div.contains('wall')){
            row.push(-1);
          }else{
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

   const checkSourceAndTarget = () =>{
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
    const duration = 300 * path.length; // Total duration of the first loop
    const delay = duration / (fps * path.length); // Delay between frames based on fps and path length
  
    const animateFirstLoop = () => {
      return new Promise((resolve) => {
        path.forEach((position, index) => {
          const [row, col] = position;
          const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
          // Add a delay to the animation
          setTimeout(() => {
            cell.classList.add('visiting');
  
            if (index === path.length - 1) {
              resolve(); // Resolve the promise when the first loop finishes
            }
          }, delay * index); // Adjust the delay based on fps and path length
        });
      });
    };
  
    animateFirstLoop().then(() => {
      path.slice().reverse().forEach((position, index) => {
        const [row, col] = position;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
        // Add a delay to the animation
        setTimeout(() => {
          cell.classList.add('done');
        }, delay * index); // Adjust the delay based on fps and path length
      });
    });
  };
  

  const Animate = () =>{
    let flag = handleErrorMessage()
    if(flag){
      let object = handleGridDTS(props.row,props.col);
      if(object.algorithm === 'dfs'){
        let animation = DfsHelper(object)
        draw(animation,15);
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


  const generateGrid = () => {
    // Generate your grid using React components instead of direct DOM manipulation
    const grid = [];
    for (let i = 0; i < props.row; i++) {
      const rowCells = [];
      for (let j = 0; j < props.col; j++) {
        const cell = (
          <div
            key={`${i}-${j}`}
            style={{
              width: `${cellDim}em`,
              height: `${cellDim}em`,
              backgroundColor: 'white',
              border : "2px solid black"
            }}
            data-row={i.toString()}
            data-col={j.toString()}
            className="cell"
            onClick={handleCellClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          ></div>
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
  <div key={`${props.row}-${props.col}`}>
    {generateGrid()}  
    <h1>{props.selectedOption}</h1>
    <button onClick={handleGridDTS}>generate ds</button>
    <button onClick={checkSourceAndTarget}>ValidateGrid</button>
    <button onClick={Animate}>animate</button>
    <button onClick={handleErrorMessage}>error message</button>
    </div>

  );
};

export default Grid;
