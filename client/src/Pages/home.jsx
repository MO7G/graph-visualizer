import React, { createContext, useEffect, useRef, useState } from 'react';
import  { useContext } from 'react';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import {Graph} from '../HomeStuff/Graph.jsx';
import {Search,Cell} from '../HomeStuff/search.js'
import SharedValuesContext from '../SharedStuff/SharedVariables';
import TempDashBoard from '../HomeStuff/tempDashBoard.js'
import { final } from '../HomeStuff/final';
import myContext from '../SharedStuff/SharedVariables'
const cellDim = 2;
let row = final.rows
let column = final.columns
let game_mode = false;
let game_animation = false;
let fps = 50;
let interval = 1000 /fps;
let last = 0;



const Home = (props) => {
  let graph,mouse_down,requestId,search;

  const myRef = useRef(null);
  const {operation,setOperation,algorithm,setAlgorithm,x,setX,y,setY} = useContext(SharedValuesContext);
  const [localOperation,setLocalOperation] = useState('');
  const handleUpdateCell = (cell) =>{
      cell.onclick = function(event){
      updateCell(event);
       // If i want to access the css or anything I should use the event.target !!!
      //event.target.style.backgroundColor = "red"
      }
  }


  
  const updateCell = (event) =>{
        let short = event.target
        let row = Number(short.getAttribute('data-row'));
        let col = Number(short.getAttribute('data-col'));
        const cell = graph.board[row][col]
        
        let color;
        if(props.myRef.current.querySelector('#select_mode1').checked){
          color = final.WALL_COLOR
        }else if(props.myRef.current.querySelector('#select_mode4').checked){
          color = final.CLEAR_COLOR;
        }else if(props.myRef.current.querySelector('#select_mode2').checked){
          color = final.SOURCE_COLOR
        }else if(props.myRef.current.querySelector('#select_mode3').checked){
          color = final.TARGET_COLOR
        }
        // updating our actuall graph ....
        graph.update(cell,color);
      }
 
  const  test = () =>{
  }

  
  const generateGrid = () => {
    const gridDom = myRef.current;
    graph = new Graph();
    console.log("this is me " , operation)
    for (let i = 0; i < row; i++) {
      let row_div = document.createElement('div');
      let row_graph = []
      row_div.style.display = 'flex';
      for(let j =0; j < column; j++){
        let cell = document.createElement('div');
        cell.style.width = cellDim +'em';
        cell.style.height =cellDim + 'em';
        cell.setAttribute('data-row',i.toString());
        cell.setAttribute('data-col',j.toString());
        cell.style.backgroundColor = "white";
        cell.classList.add('cell');
        // adding an event hnadle for each cell when creating the grid!!!
        handleUpdateCell(cell);
        // adding the cell to the row
        row_div.appendChild(cell)
        // the same way I added event handler to the dom inside the div 
        // I need to also add a an event handler for the cell div class to my actual grpah calss
        // but to achieve that I create a custom Cell class with my needs !!!
        row_graph.push(new Cell(cell,i,j))
      }
      //adding the row to the div
      gridDom.appendChild(row_div) 
      // adding the whole graph to my graph class for processing !!!
      graph.board.push(row_graph);
    }
  };
  
  

  const animate = (timeStamp) =>{
    if(game_mode){

    }
  }

  const makeBoardReady = () =>{
    row = x;
    column = y;
    console.log(x,y)
    console.log(1)

    // delete the actual graph I have 
    // but do I need to delete the graph actually??? I will check later!!
    graph.board.forEach(row => {
      row.forEach((cell)=>{
        cell.div.remove();
      })
 });
    generateGrid();
    console.log(13)

  }
  const define = ()=>{
  makeBoardReady();
  }


  


  // using effect with empty array to trigger the function when component is mounted!!!
  useEffect(() => {
          generateGrid();
        }, []);
  
  useEffect(()=>{
    setLocalOperation(operation)
  },[operation])

  return (
    
    <div>
      <div id="board-container">
        <div ref={myRef} id="board">
          <h1>yes no</h1>
          <button className='apply' onClick={test}>apply</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
