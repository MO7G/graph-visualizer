import React, { useEffect, useRef } from 'react';
import  { useContext } from 'react';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import {Graph} from '../HomeStuff/Graph.jsx';
import {Search,Cell} from '../HomeStuff/search.js'
import SharedValuesContext from '../SharedStuff/SharedVariables';
import Dashboard from '../HomeStuff/dashBoard';




const cellDim = 2;
const row = 5
const column = 5
let game_mode = false;
let game_animation = false;
let fps = 50;
let interval = 1000 /fps;
let last = 0;
let graph,mouse_down,requestId,search;

const Home = () => {
  const myRef = useRef(null);
  const { a, b} = useContext(SharedValuesContext);

  const test = () =>{
    console.log(a)
  }
  const fixCell = (cell) =>{
      cell.onclick = function(event){
       updateCell(event);
       // If i want to access the css or anything I should use the event.target !!!
      //event.target.style.backgroundColor = "red"
      }
  }

  const printPosInGrid= (row,col)=>{
    console.log(graph.board[row][col])
  }

  const updateCell = (event) =>{
        let cell = event.target
        let row = Number(cell.getAttribute('data-row'));
        let col = Number(cell.getAttribute('data-col'));
      let finalCell =   (row * 10) + col + 1;
        console.log("this is cell " + finalCell)
        printPosInGrid(row,col)

  }


  
  const generateGrid = () => {
    const gridDom = myRef.current;
    graph = new Graph();

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
        fixCell(cell);
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

  


  // using effect with empty array to trigger the function when component is mounted!!!
  useEffect(() => {
    generateGrid();
  }, []);
  
  

  return (
    <div>
      <Navbar />
      <Dashboard></Dashboard>
      <div id="board-container">
        <div ref={myRef} id="board">
          <h1>yes no</h1>
          <button className='apply' onClick={test}>apply</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
