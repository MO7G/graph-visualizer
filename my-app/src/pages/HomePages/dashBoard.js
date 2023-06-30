import React, { useState , useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../css/dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const Dashboard = (props) => {
  const [xLimit, setXLimit] = useState(100);
  const [yLimit, setYLimit] = useState(100);
  const wallRef = useRef(null);
  const sourceRef = useRef(null);
  const clearRef = useRef(null);
  const targetRef = useRef(null);
  const dfsRef = useRef(null);
  const bfsRef = useRef(null);
  const dijRef = useRef(null);
  const bellmanRef = useRef(null);
  const aStarRef = useRef(null);
  const greedyRef = useRef(null);
  const mutliBfsRef = useRef(null);
  const multidigRef = useRef(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.elements)
    const row = event.target.elements.row.value;
    const column = event.target.elements.col.value;

    const rowNumber = parseInt(row, 10);
    const columnNumber = parseInt(column, 10);

    props.onSetRow(rowNumber);
    props.onSetCol(columnNumber);
  };

  const handleGridClear = (event) => {
    props.onGridClear();
  }

 const dosomething = (event) =>{
  console.log(event)
 }

 const handleLabelClick=  (event) =>{
    let ans = event.target.htmlFor;
    ans.toLowerCase();
    console.log(ans);
    if(ans=='clear'){
      props.onHandleSetOption(clearRef.current.value,false)
    }else if(ans == 'source'){
      props.onHandleSetOption(sourceRef.current.value,false)
    }else if(ans == 'target'){
      props.onHandleSetOption(targetRef.current.value,false)
    }else if(ans == 'wall'){
      props.onHandleSetOption(wallRef.current.value,false)
    }else if(ans == 'dfs'){
      props.handleSetAlgorithm(dfsRef.current.value,false)
    } else if(ans == 'bfs'){
      props.handleSetAlgorithm(bfsRef.current.value,false)
    }else if(ans == 'dij'){
      props.handleSetAlgorithm(dijRef.current.value,false)
    }else if(ans == 'bellman-ford'){
      props.handleSetAlgorithm(bellmanRef.current.value,false)
    }else if(ans == 'Astar'){
      props.handleSetAlgorithm(aStarRef.current.value,false)
    }else if(ans == 'greedy'){
      props.handleSetAlgorithm(greedyRef.current.value,false)
    }else if(ans == 'multi-bfs'){
      props.handleSetAlgorithm(mutliBfsRef.current.value,false)
    }else if(ans == 'multi-dij'){
      props.handleSetAlgorithm(multidigRef.current.value,false)
    }
}


  return (
    <div className='dashboard-container'>

      < div className='first-section'>
        <div className='operation-container'>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Wall"
              checked={props.onOption === 'Wall'}
              onChange={props.onHandleSetOption}
              ref={wallRef}
            />
            <label htmlFor="wall" onClick={handleLabelClick}>Wall</label>
          </div>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Clear"
              checked={props.onOption === 'Clear'}
              onChange={props.onHandleSetOption}
              ref={clearRef}
            />
            <label htmlFor="clear" onClick={handleLabelClick}>Clear</label>
          </div>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Source"
              checked={props.onOption === 'Source'}
              onChange={props.onHandleSetOption}
              ref={sourceRef}
            />
            <label htmlFor="source" onClick={handleLabelClick}>Source</label>
          </div>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Target"
              checked={props.onOption === 'Target'}
              onChange={props.onHandleSetOption}
              ref={targetRef}
            />
            <label htmlFor="target" onClick={handleLabelClick}>Target</label>
          </div>

        </div>


        <div className='algorithms-div'>
          <div>
            <input
              type="radio"
              name="option1"
              value="dfs"
              checked={props.algorithm === 'dfs'}
              onChange={props.handleSetAlgorithm}
              ref={dfsRef}
            />
            <label htmlFor="dfs"  onClick={handleLabelClick}>DFS</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="bfs"
              checked={props.algorithm === 'bfs'}
              onChange={props.handleSetAlgorithm}
              ref={bfsRef}
            />
            <label htmlFor="bfs"  onClick={handleLabelClick}>BFS</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="dij"
              checked={props.algorithm === 'dij'}
              onChange={props.handleSetAlgorithm}
              ref={dijRef}
            />
            <label htmlFor="dij"  onClick={handleLabelClick}>Dijkstra</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="bellman-ford"
              checked={props.algorithm === 'bellman-ford'}
              onChange={props.handleSetAlgorithm}
              ref={bellmanRef}
            />
            <label htmlFor="bellman-ford"  onClick={handleLabelClick}>Bellman Ford</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="Astar"
              checked={props.algorithm === 'Astar'}
              onChange={props.handleSetAlgorithm}
              ref={aStarRef}
            />
            <label htmlFor="Astar"  onClick={handleLabelClick}>A*Search</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="greedy"
              checked={props.algorithm === 'greedy'}
              onChange={props.handleSetAlgorithm}
              ref={greedyRef}
            />
            <label htmlFor="greedy"  onClick={handleLabelClick}>Greedy Search</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="multi-bfs"
              checked={props.algorithm === 'multi-bfs'}
              onChange={props.onSetMulti}
              ref={mutliBfsRef}
            />
            <label htmlFor="multi-bfs"  onClick={handleLabelClick}>Multiple Source Bfs</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="multi-dij"
              checked={props.algorithm === 'multi-dij'}
              onChange={props.handleSetAlgorithm}
              ref={multidigRef}
            />
            <label htmlFor="multi-dij"  onClick={handleLabelClick}>Multiple Source Dijkstra</label>
          </div>
        </div>
      </div>

      <div className='second-section'>
        <div className='row-col-form'>
          <form onSubmit={handleSubmit}>
            <label>

              <input type="number" placeholder='Row' name='row' required min="1" max="300" />
            </label>
            <label>
              <input type="number" placeholder='Column' name='col' required min="1" max="300" />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
        <div className='slider-container'>
          <div className='slider'>
            <Slider
              min={1} // Minimum value of the slider
              max={100} // Maximum value of the slider
              step={20} // Step value for each increment/decrement
              value={props.onSliderValue} // Current value of the slider
              onChange={props.onSetSliderValue} // Event handler for slider value change
            />
            <span>{/*props.onSliderValue*/}</span> {/* Display the current slider value */}
          </div>
        </div>

      
        <div className='second-section-buttons'>

          <button id="clearButton" className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing} onClick={props.onHandleOrder}>Clear</button>
          <button id="animateButton" className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing} onClick={props.onHandleOrder}>Play</button>
          <button id="kurskalMazeButton" className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing} onClick={props.onHandleOrder}>Kurskal Maze</button>
          <button id="randomMazeButton" className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing} onClick={props.onHandleOrder}>Random Maze</button>
          <button id="positiveNumbersButton" className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing} onClick={props.onHandleOrder}>Generate Numbers</button>
          <button id="clearNumbers" className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing}onClick={props.onHandleOrder}>Clear Numbers</button>
          <button id='modeButton' className={props.onIsProcessing ? 'disabled-button' : ''} disabled={props.onIsProcessing} onClick={props.onHandleSetMode}>{props.onMode ? 'Show Mode' : 'Educationl Mode'}</button>
        </div>
      </div>




    </div>
  );
};

export default Dashboard;
