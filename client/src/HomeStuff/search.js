import { final } from './final.js'

export class Search {
    constructor(graph, mode) {
      console.log("search created " + mode);
    }
  }


export class Cell {
    constructor(div, row, col) {
      this.row = row;
      this.col = col;
      this.color = final.UNDISCOVERED_COLOR;
      this.wall = false;
      this.div = div;
      this.cost = 0;
    }
    update(color) {
      this.color = color;
      this.div.style.backgroundColor = this.color;
      if (this.color === final.UNDISCOVERED_COLOR) {
        this.div.innerText = '';
      }
    }
    destroy() {
      this.color = final.UNDISCOVERED_COLOR;
      this.div.style.backgroundColor = this.color;
      this.div.innerText = '';
    }
  }


  Cell.prototype.toString = function () {
    let str = '';
    str += 'Row: ' + this.row + '\nColumn: ' + this.col + '\n';
    str += 'Color: ' + this.color + '\n';
    str += 'Cost: ' + this.cost + '\n';
    if (this.parent) {
      str += 'Parent：' + this.parent.toString();
    }
    return str;
  };
  
  Cell.prototype.valueOf = function () {
    return this.cost;
  };
  