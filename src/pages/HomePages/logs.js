import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import '../../css/logs.css'
const Log = React.forwardRef((props, ref) => {



  const [info, setInfo] = useState([]); // State to store the information
  const scrollableDivRef = useRef(null); // Ref to the scrollable div element
  useImperativeHandle(ref, () => ({
    handleNewLog
  }))

  // Function to handle requesting and adding information
  const handleNewLog = (info) => {
    const newInfo = [];
    newInfo[0] = info;
    console.log(info[0]);
    setInfo(prevInfo => [...prevInfo, ...newInfo]);
  };

  // Scroll to the bottom of the div whenever new information is added
  useEffect(() => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }
  }, [info]);

  return (
    <div className="container">
      <div className="scrollable-div" ref={scrollableDivRef}>
        {/* Render the information */}
        {info.map((item, index) => (
          <div
            key={index}
            style={{
              boxShadow: index === info.length - 1 ? 'none' : '0px 0px 0px #888888',
              color: index === info.length - 1 ? '#F0F0F0' : '#888888',
              marginBottom: '8px', // Add this line to add spacing between paragraphs
              fontFamily: 'Times New Roman'

            }}
          >
            <p style={{ margin: 0, display: 'inline', whiteSpace: "pre" }}>{item}</p>
          </div>
        ))}
      </div>

      <p>{props.onLogMessag}</p>
    </div>
  );
});

export default Log;
