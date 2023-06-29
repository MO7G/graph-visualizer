const bellmanFordHelper = (gridData) => {
    let path = [];
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
    let shortestPath =  bellmanFord(grid,xStart,yStart,xEnd,yEnd,row,col,path);
    if(shortestPath == [] ){
        return [path,[]]
    }else{
        return [path,shortestPath];
    }
      };

      function bellmanFord(grid, startX, startY, targetX, targetY, row, col, path) {
        const dx = [-1, 1, 0, 0]; // Directional movements in the x-axis (up, down, left, right)
        const dy = [0, 0, -1, 1]; // Directional movements in the y-axis (up, down, left, right)
      
        // Initialize distance and parent arrays
        const distance = Array.from({ length: row }, () => Array(col).fill(Infinity));
        const parent = Array.from({ length: row }, () => Array(col).fill(null));
       const vis = Array.from({length:row}, ()=>Array(col).fill(0))
        // Set the distance of the starting point to 0
        distance[startX][startY] = 0;
      
        // Relax edges |row x col| - 1 times
        for (let step = 1; step <= row * col - 1; step++) {
          for (let x = 0; x < row; x++) {
            for (let y = 0; y < col; y++) {
              // Explore neighboring cells
              for (let i = 0; i < 4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                if (nx >= 0 && nx < row && ny >= 0 && ny < col && grid[nx][ny] !== -1) {
                  const weight = grid[nx][ny];
                  if (distance[x][y] + weight < distance[nx][ny]) {
                    distance[nx][ny] = distance[x][y] + weight;
                    parent[nx][ny] = [x, y];
                    if(!vis[nx][ny]){
                    path.push([nx,ny])
                    vis[nx][ny] = 1;
                    }
                  }
                }
              }
            }
          }
        }
      
        // Check for negative cycles
        for (let x = 0; x < row; x++) {
          for (let y = 0; y < col; y++) {
            // Explore neighboring cells
            for (let i = 0; i < 4; i++) {
              const nx = x + dx[i];
              const ny = y + dy[i];
      
              if (nx >= 0 && nx < row && ny >= 0 && ny < col && grid[nx][ny] !== -1) {
                const weight = grid[nx][ny];
                if (distance[x][y] + weight < distance[nx][ny]) {
                  // Negative cycle detected, return an empty path
                  return [];
                }
              }
            }
          }
        }
      // Reconstruct the shortest path
  const shortestPath = [];
  let currentX = targetX;
  let currentY = targetY;

  while (currentX !== startX || currentY !== startY) {
    shortestPath.push([currentX, currentY]);
    const parentPos = parent[currentX][currentY];
    if (parentPos === null) {
      // No path exists, return an empty path
      return [];
    }
    currentX = parentPos[0];
    currentY = parentPos[1];
  }

  shortestPath.push([startX, startY]);
  shortestPath.reverse();

  return shortestPath;
      }
      
export default bellmanFordHelper