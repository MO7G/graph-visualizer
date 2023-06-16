import React, { useEffect, useRef } from 'react';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';

const cellDim = 2;
const row = 10
const column = 10

const Home = () => {
  const myRef = useRef(null);
  
  const fixCell = (cell) =>{
      cell.onclick = function(event){
        updateCell(event);
       // If i want to access the css or anything I should use the event.target !!!
      //event.target.style.backgroundColor = "red"
      }
  }

  const updateCell = (event) =>{
        let cell = event.target
        let row = Number(cell.getAttribute('data-row'));
        let col = Number(cell.getAttribute('data-col'));
    
      let finalCell =   (row * 10) + col + 1;
        console.log("this is cell " + finalCell)
  }

  const generateGrid = () => {
    const element = myRef.current;
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
        fixCell(cell);
        row_div.appendChild(cell)
        //row_graph.push(new Cell(cell,i,j))
      }
      element.appendChild(row_div)
    }
  };

  useEffect(() => {
    generateGrid();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="board-container">
        <div ref={myRef} id="board">
          <h1>yes no</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
