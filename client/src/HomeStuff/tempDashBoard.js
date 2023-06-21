import React, { useState,useContext, useEffect, createContext,useImperativeHandle } from 'react';
import SharedValuesContext from '../SharedStuff/SharedVariables';
const ControlPanel = React.forwardRef((props,ref) => {
    const {operation,setOperation,algorithm,setAlgorithm,x,setX,y,setY} = useContext(SharedValuesContext);
    const [selectedMode, setSelectedMode] = useState('wall');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [flag , setFlag] = useState(false);
    
    const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setOperation(mode)
    }

    const test = () =>{
        console.log(operation);
    }

    useImperativeHandle(ref, () => ({
    okay(){
        okay()
    }
      }))

      const okay = () =>{
        console.log("yes")
      }
  
    const handleWidthChange =  async (event) => {
      setWidth(event.target.value);
    };
  
    const handleHeightChange = (event) => {
      setHeight(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (width.trim() === '' || height.trim() === '') {
        alert('Please enter values in both fields.');
        return;
      }
  
      if (isNaN(width) || isNaN(height)) {
        alert('Please enter numeric values.');
        return;
      }
  
      // Handle form submission with valid input values
       setX(height)
       setY(width);
      console.log("this is the x and y " , x," ",y);
      

      // Clear input fields
      setWidth('');
      setHeight('');

      // running makeGrid-useEffect
      setFlag(true);
    };

    // generateing the board after updating x and y makeGrid-useEffect
    useEffect(() => {
        if (x && y && flag === true) {
          props.MakeBoardReady();
        }
      }, [x, y, props.makeBoardReady,flag]);
   
   // One Time useEffect to make the dashBoard Ready for use
   useEffect(() => {
    setOperation(selectedMode);
  }, [selectedMode]);

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


          <div className='dimenstions'>
          <form onSubmit={handleSubmit}>
      <div>
        <label>
        Input 1:
        <input
            type="number"
            value={width}
            min={0}
            max={50}
            onChange={handleWidthChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Input 2:
          <input
            type="number"
            value={height}
            min={0}
            max={50}
            onChange={handleHeightChange}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    <button onClick={test}>from dashbaord</button>
          </div>
        </div>

      );
});
export default ControlPanel;


