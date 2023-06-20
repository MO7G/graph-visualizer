import React, { useState,useContext, useEffect } from 'react';
import SharedValuesContext from '../SharedStuff/SharedVariables';

const ControlPanel = () => {
    const {operation,setOperation} = useContext(SharedValuesContext);
    const [selectedMode, setSelectedMode] = useState('wall');

    const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setOperation(mode)
    }
    

    useEffect(()=>{
        setOperation(selectedMode);
    },[])

    return (
        <div className="control-panel">
          <div className="operation-mode">
            <p>
              <strong>Select The Mode</strong>
            </p>
            <div className="wall-selector">
              <input
                type="radio"
                id="select_mode1"
                name="select_mode"
                className="wall_input"
                checked={selectedMode === 'wall'}
                onChange={() => handleModeChange('wall')}
              />
              <label className="select_mode1_label" htmlFor="select_mode1">
                Wall
              </label>
            </div>
            <div className="source-selector">
              <input
                type="radio"
                id="select_mode2"
                name="select_mode"
                className="source_input"
                checked={selectedMode === 'source'}
                onChange={() => handleModeChange('source')}
              />
              <label className="select_mode2_label" htmlFor="select_mode2">
                Source
              </label>
            </div>
            <div className="target-selector">
              <input
                type="radio"
                id="select_mode3"
                name="select_mode"
                className="target_input"
                checked={selectedMode === 'target'}
                onChange={() => handleModeChange('target')}
              />
              <label className="select_mode3_label" htmlFor="select_mode3">
                Target
              </label>
            </div>
            <div className="clear-selector">
              <input
                type="radio"
                id="select_mode4"
                name="select_mode"
                className="clear_input"
                checked={selectedMode === 'clear'}
                onChange={() => handleModeChange('clear')}
              />
              <label className="select_mode4_label" htmlFor="select_mode4">
                Clear
              </label>
            </div>
          </div>
        </div>
      );
};

export default ControlPanel;
