let dx = [-1, 0, 1, 0]; // Up, Right, Down, Left
let dy = [0, 1, 0, -1];

let check = (x, y, row, col) => {
  return x >= 0 && y >= 0 && x < row && y < col;
};

function create2DArray(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0); // Add zero to each column
    }
    grid.push(row); // Add the row to the grid
  }
  return grid;
}

const DfsHelper = (gridData) => {
  let path = [];
  let vis = create2DArray(gridData.row, gridData.col);
  let grid = gridData.realGrid;
  let xStart = gridData.source[0];
  let yStart = gridData.source[1];
  let xEnd = gridData.target[0];
  let yEnd = gridData.target[1];
  let row = gridData.row;
  let col = gridData.col;
  let counter = 0;
  dfs(xStart, yStart, xEnd, yEnd, row, col, counter, vis, grid, path);
  flag = false;
  path.shift();
  path.pop();
  return path;
};

let flag = false;

const dfs = (xStart, yStart, xEnd, yEnd, row, col, counter, vis, grid, path) => {
  let stack = [[xStart, yStart]];

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    path.push([x, y]);

    if (x === xEnd && y === yEnd) {
      console.log("Reached the target position");
      flag = true;
      return;
    }

    vis[x][y] = 1;
    for (let i = 0; i < 4; i++) {
      let newX = dx[i] + x;
      let newY = dy[i] + y;
      if (check(newX, newY, row, col) && !vis[newX][newY] && grid[newX][newY] !== -1) {
        stack.push([newX, newY]);
      }
      if (flag) {
        return;
      }
    }
  }
};

export default DfsHelper;