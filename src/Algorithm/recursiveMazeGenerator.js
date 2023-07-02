const mazeBacktrackingHelper = (gridData) => {
    let path = [];
    let grid = gridData.realGrid;
    let row = gridData.row;
    let col = gridData.col;
    let discoveries = {
      counter: 0,
      path: 0
    }
    generateMaze(grid,row,col,path);
    return [path,path];

      };


function generateMaze(grid, row, col, path) {
    const dx = [-1, 1, 0, 0]; // Directional movements in the x-axis (up, down, left, right)
    const dy = [0, 0, -1, 1]; // Directional movements in the y-axis (up, down, left, right)
  
    // Recursive backtracking algorithm
    function recursiveBacktracking(x, y) {
      grid[x][y] = -1; // Mark the current cell as a wall
    
      // Randomly shuffle the directions
      const directions = [0, 1, 2, 3];
      for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
      }
  
      // Explore the neighboring cells
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[directions[i]];
        const ny = y + dy[directions[i]];
  
        if (nx >= 0 && nx < row && ny >= 0 && ny < col && grid[nx][ny] === 0) {
          // Check if the neighboring cell is unvisited
          let wallCount = 0;
          for (let j = 0; j < 4; j++) {
            const nnx = nx + dx[j];
            const nny = ny + dy[j];
            if (nnx >= 0 && nnx < row && nny >= 0 && nny < col && grid[nnx][nny] === -1) {
              wallCount++;
            }
          }
  
          if (wallCount === 1) {
            recursiveBacktracking(nx, ny);
            path.push([nx, ny]);
          }
        }
      }
    }
  
    // Generate the maze starting from the top-left cell (0, 0)
    recursiveBacktracking(0, 0);
  }
  
export default mazeBacktrackingHelper;