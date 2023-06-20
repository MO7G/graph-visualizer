import React, { useState } from 'react';
import '../style/styles.css'

const Dashboard = () => {
  const [editMode, setEditMode] = useState('');
  const [algorithmMode, setAlgorithmMode] = useState('');
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  const handleEditModeChange = (mode) => {
    setEditMode(mode);
  };

  const handleAlgorithmModeChange = (mode) => {
    setAlgorithmMode(mode);
  };

  const handleClearBoard = () => {
    // Implement clear board logic
  };

  const handleStart = () => {
    // Implement start logic
  };

  const handleGenerateMaze = () => {
    // Implement generate maze logic
  };

  const handleApply = () => {
    // Implement apply logic
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div className="dashboard">
      <div className="mode-select">
        <h3>Select Edit Mode:</h3>
        <select value={editMode} onChange={(e) => handleEditModeChange(e.target.value)}>
          <option value="">None</option>
          <option value="clear">Clear</option>
          <option value="wall">Wall</option>
          <option value="source">Source</option>
          <option value="target">Target</option>
        </select>
      </div>
      <div className="mode-select">
        <h3>Select Algorithm Mode:</h3>
        <select value={algorithmMode} onChange={(e) => handleAlgorithmModeChange(e.target.value)}>
          <option value="">None</option>
          {/* Add other algorithm options */}
        </select>
      </div>
      <div className="buttons">
        <button onClick={handleClearBoard}>Clear Board</button>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleGenerateMaze}>Generate Maze</button>
      </div>
      <div className="input-fields">
        <input type="text" value={x} onChange={(e) => setX(e.target.value)} placeholder="X" />
        <input type="text" value={y} onChange={(e) => setY(e.target.value)} placeholder="Y" />
        <button onClick={handleApply}>Apply</button>
      </div>
      <div className="slider">
        <input type="range" min="1" max="100" value={sliderValue} onChange={handleSliderChange} />
      </div>
    </div>
  );
};

export default Dashboard;
