import React, { useContext, useEffect, useRef } from 'react';
import SharedValuesContext from '../SharedStuff/SharedVariables';
import logo from '../style/logo/My project.png'
import Home from './home';
import '../style/styles.css'
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import TempDashBaord from '../HomeStuff/tempDashBoard'
import Child from '../HomeStuff/temp';
const HomeParent = () => {
    const childRef = new useRef(null);
    const dashboardRef = new useRef(null);
    const myRef = new useRef(null);
    const okay = () =>{
        console.log(myRef.current)
    }

  return (
    <div className='HomeParent' ref={myRef}>
                <Navbar></Navbar>
                <TempDashBaord  ref={dashboardRef} okay={okay}></TempDashBaord>
                <Home myRef={myRef}></Home>
                <Footer></Footer>
                <Child ref={childRef}></Child>
                <button onClick={okay}>okay</button>
                
    </div>
  );
};

export default HomeParent;
