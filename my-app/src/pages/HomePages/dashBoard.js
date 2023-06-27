import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../../css/dashboard.css'
const Dashboard = (props) => {
  const [xLimit, setXLimit] = useState(100);
  const [yLimit, setYLimit] = useState(100);

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
            />
            <label htmlFor="wall">Wall</label>
          </div>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Clear"
              checked={props.onOption === 'Clear'}
              onChange={props.onHandleSetOption}
            />
            <label htmlFor="clear">Clear</label>
          </div>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Source"
              checked={props.onOption === 'Source'}
              onChange={props.onHandleSetOption}
            />
            <label htmlFor="source">Source</label>
          </div>
          <div className='radio-container'>
            <input
              type="radio"
              name="option"
              value="Target"
              checked={props.onOption === 'Target'}
              onChange={props.onHandleSetOption}
            />
            <label htmlFor="target">Target</label>
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
            />
            <label htmlFor="dfs">DFS</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="bfs"
              checked={props.algorithm === 'bfs'}
              onChange={props.handleSetAlgorithm}
            />
            <label htmlFor="bfs">BFS</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="dij"
              checked={props.algorithm === 'dij'}
              onChange={props.handleSetAlgorithm}
            />
            <label htmlFor="dijkstra">Dijkstra</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="bellman-ford"
              checked={props.algorithm === 'bellman-ford'}
              onChange={props.handleSetAlgorithm}
            />
            <label htmlFor="bellman-ford">Bellman Ford</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="Astar"
              checked={props.algorithm === 'Astar'}
              onChange={props.handleSetAlgorithm}
            />
            <label htmlFor="Astar">A*Search</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="Greedy"
              checked={props.algorithm === 'Greedy'}
              onChange={props.handleSetAlgorithm}
            />
            <label htmlFor="Greedy">Greedy Search</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="multi-bfs"
              checked={props.algorithm === 'multi-bfs'}
              onChange={props.onSetMulti}
            />
            <label htmlFor="multi-bfs">Multiple Source Bfs</label>
          </div>
          <div>
            <input
              type="radio"
              name="option1"
              value="multi-dij"
              checked={props.algorithm === 'multi-dij'}
              onChange={props.handleSetAlgorithm}
            />
            <label htmlFor="multi-dij">Multiple Source Dijkstra</label>
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
              step={1} // Step value for each increment/decrement
              value={props.onSliderValue} // Current value of the slider
              onChange={props.onSetSliderValue} // Event handler for slider value change
            />
            <span>{/*props.onSliderValue*/}</span> {/* Display the current slider value */}
          </div>
        </div>

        <div className='second-section-buttons'>
          <button id="clearButton" onClick={props.onHandleOrder}>Clear</button>
          <button id="animateButton" onClick={props.onHandleOrder}>Animate</button>
          <button id="kurskalMazeButton" onClick={props.onHandleOrder}>Kurskal Maze</button>
          <button id="randomMazeButton" onClick={props.onHandleOrder}>Random Maze</button>
          <button id="positiveNumbersButton" onClick={props.onHandleOrder}>Positive Numbers</button>
          <button id="negativeNumbersButton" onClick={props.onHandleOrder}>Negative Numbers</button>
        </div>
      </div>




    </div>
  );
};

export default Dashboard;
