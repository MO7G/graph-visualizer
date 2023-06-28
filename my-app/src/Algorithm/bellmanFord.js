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
    const parents = Array.from({ length: row }, () => Array(col).fill(null));
    const dis= Array.from({ length: row }, () => Array(col).fill(Infinity));
    let flag =  spfa(grid,xStart,yStart,xEnd,yEnd,row,col,path,parents,dis);
    



    return [flag,path];

      };

  function spfa(grid, startX, startY, targetX, targetY, row, col,path) {
    const dx = [-1, 1, 0, 0]; // Directional movements in the x-axis (up, down, left, right)
    const dy = [0, 0, -1, 1]; // Directional movements in the y-axis (up, down, left, right)
  
    const queue = [];
    const inQueue = Array.from({ length: row }, () => Array(col).fill(false));
    const dis = Array.from({ length: row }, () => Array(col).fill(Infinity));
    const parents = Array.from({ length: row }, () => Array(col).fill(null));
  
    dis[startX][startY] = 0;
    queue.push([startX, startY]);
    inQueue[startX][startY] = true;
    path.push([startX,startY])
    while (queue.length > 0) {
      const [currentX, currentY] = queue.shift();
      inQueue[currentX][currentY] = false;
  
      for (let d = 0; d < 4; d++) {
        const nx = currentX + dx[d];
        const ny = currentY + dy[d];
  
        if (nx >= 0 && nx < row && ny >= 0 && ny < col && dis[currentX][currentY] + grid[nx][ny] < dis[nx][ny]) {
          dis[nx][ny] = dis[currentX][currentY] + grid[nx][ny];
          parents[nx][ny] = [currentX, currentY];
               
          if (!inQueue[nx][ny]) {
            queue.push([nx, ny]);
            path.push([nx,ny])

            inQueue[nx][ny] = true;
          }
        }
      }
    }
  
    const shortestPath = [];
    let currentX = targetX;
    let currentY = targetY;
  
    while (currentX !== startX || currentY !== startY) {
      shortestPath.push([currentX, currentY]);
      const [parentX, parentY] = parents[currentX][currentY];
      currentX = parentX;
      currentY = parentY;
    }
  
    shortestPath.push([startX, startY]);
    shortestPath.reverse();
  
    return shortestPath;
  }
  
  




export default bellmanFordHelper