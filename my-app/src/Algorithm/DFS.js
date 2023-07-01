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
  let xStart = gridData.source[0][0];
  let yStart = gridData.source[0][1];
  let xEnd = gridData.target[0];
  let yEnd = gridData.target[1];
  let row = gridData.row;
  let col = gridData.col;
  let walls = gridData.walls
  let discoveries = {
    counter: 0,
    path: 0
  }
  let shortestPath = dfs(xStart, yStart, xEnd, yEnd, row, col, vis, grid, path, discoveries);
  path.shift();
  path.pop();
  let message = setMessage(discoveries, row, col, walls);

  return [path, shortestPath.reverse(), message];
};


const setMessage = (discoveries, row, col, walls) => {
  let Name = "Depth First Search";
  let complexity = "O(N x M)"
  let discovered = discoveries.counter;
  let TotalSize = row * col;
  let PathLength = discoveries.path;
  let percentage = (discovered / TotalSize) * 100;
  let ValidWalls = TotalSize - walls;
  let Classification;
  if (discovered == 2) {
    Classification = "Best case"
  } else if (discovered - ValidWalls == 0) {
    Classification = "Worst case"
  } else {
    Classification = "Average case"
  }
  const Message = `
Name: ${Name}
Time Complexity: ${complexity}
TotalSize: ${TotalSize}
walls:${walls}
Discovered: ${discovered}
PathLength: ${PathLength}
Work done : ${percentage}%
Classification:${Classification}  
`;
  return Message
}



const dfs = (xStart, yStart, xEnd, yEnd, row, col, vis, grid, path, discoveries) => {
  let stack = [[xStart, yStart]];
  let parent = create2DArray(row, col);
  while (stack.length > 0) {
    let [x, y] = stack.pop();
    path.push([x, y]);
    if (!vis[x][y]) {
      discoveries.counter++;
    }
    if (x === xEnd && y === yEnd) {

      return constructShortestPath(parent, xStart, yStart, xEnd, yEnd, discoveries);
    }
    vis[x][y] = 1;


    for (let i = 0; i < 4; i++) {
      let newX = dx[i] + x;
      let newY = dy[i] + y;
      if (check(newX, newY, row, col) && !vis[newX][newY] && grid[newX][newY] !== -1) {
        stack.push([newX, newY]);

        parent[newX][newY] = [x, y];
      }
    }
  }

  return []; // Return an empty path if the destination is not reachable
};

const constructShortestPath = (parent, xStart, yStart, xEnd, yEnd, discoveries) => {
  let shortestPath = [];
  let currentX = xEnd;
  let currentY = yEnd;

  while (currentX !== xStart || currentY !== yStart) {
    shortestPath.push([currentX, currentY]);
    let [prevX, prevY] = parent[currentX][currentY];
    currentX = prevX;
    currentY = prevY;
    discoveries.path++;

  }

  shortestPath.push([xStart, yStart]);
  shortestPath.reverse(); // Reverse the path to get the correct order

  return shortestPath;
};


export default DfsHelper;
