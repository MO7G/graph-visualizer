import React, { useContext, useEffect, useRef } from 'react';
import SharedValuesContext from '../SharedStuff/SharedVariables';
import logo from '../style/logo/My project.png'

import '../style/styles.css'
const Navbar = () => {

  
  const myRef = useRef(null);
  const solve = () =>{
    //myRef.current.querySelector('.navbar-submit').style.backgroundColor = "white"
  let short = myRef.current;
  for(let i = 1 ;i <=3;i++){
    let value = short.querySelector(`.navbar-item-${i}`).innerText;
    // do something 
  }
  }

  useEffect(()=>{
    solve();
  })
  return (
    <nav className="navbar" ref={myRef}>
     <div>
      <img src={logo} alt="Logo" />
    </div>
      <ul className="navbar-list">
        <li className="navbar-item-1">Home</li>
        <li className="navbar-item-2">About</li>
        <li className="navbar-item-3">Contact</li>
        <button className='navbar-submit' onClick={solve}>apply</button>
      </ul>
    </nav>
  );
};

export default Navbar;
