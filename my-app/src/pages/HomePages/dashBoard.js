import React, { useState } from 'react';
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

      < div className='dashboard-container'>
        <h2>Dashboard</h2>
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

        <form onSubmit={handleSubmit}>
          <label>
            Rows:
            <input type="number" name='row' required min="1" max="300" />
          </label>
          <label>
            Columns:
            <input type="number" name='col' required min="1" max="300" />
          </label>

          <button type="submit">Submit</button>
        </form>
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

      <div>
        <button id="clearButton" onClick={props.onHandleOrder}>Clear</button>
        <button id="animateButton" onClick={props.onHandleOrder}>Animate</button>
        <button id="kurskalMazeButton" onClick={props.onHandleOrder}>Kurskal Maze</button>
        <button id="randomMazeButton" onClick={props.onHandleOrder}>Random Maze</button>
        <button id="positiveNumbersButton" onClick={props.onHandleOrder}>Positive Numbers</button>
        <button id="negativeNumbersButton" onClick={props.onHandleOrder}>Negative Numbers</button>
      </div>



    </div>
  );
};

export default Dashboard;
