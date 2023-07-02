const FastPriorityQueue = require('fastpriorityqueue');
const inf = 99999999;
const create2DArray = (rows, cols, val) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(val); // Add zero to each column
        }
        grid.push(row); // Add the row to the grid
    }
    return grid;
}

let dx = [-1, 0, 1, 0]; // Up, Right, Down, Left
let dy = [0, 1, 0, -1];


const check = (x, y, row, col) => {
    return x >= 0 && y >= 0 && x < row && y < col;
};



const createParent = (rows, cols) => {
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


const setMessage = (discoveries, row, col, walls,type) => {
    let Name ;
    if (type === "multi-dij"){
        Name = "Multiple Source Dijkstra Shortest Path";
    }else{
        Name =  "Dijkstra Single Shortest Path";
    }
    let complexity = "O(N*M Log(N*M))"
    let discovered = discoveries.counter;
    let TotalSize = row * col;
    let TotalCost = discoveries.cost;
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
  TotalCost: ${TotalCost}
  walls: ${walls}
  Discovered: ${discovered}
  PathLength: ${PathLength}
  Work done : ${percentage}%
  Classification:${Classification}  
  `;
    return Message
  }

const DijHelper = (gridData, type) => {

    let path = [];

    let dis = create2DArray(gridData.row, gridData.col, inf);
    let parent = createParent(gridData.row, gridData.col);
    let vis = create2DArray(gridData.row, gridData.col, 0);
    let grid = gridData.realGrid;

    let multiSource = gridData.source
    let xEnd = gridData.target[0];
    let yEnd = gridData.target[1];
    let row = gridData.row;
    let col = gridData.col;
    let walls = gridData.walls
    let discoveries = {
      counter: 0,
      path: 0,
      cost:0
    }

    dij(multiSource, row, col, dis, grid, path, parent, type, vis,discoveries);
    let shortestPathArray = [];
    console.log(multiSource[0]);
    console.log(xEnd, yEnd)
    for (let i = 0; i < row; i++) {
        let rowString = '';
        for (let j = 0; j < col; j++) {
            rowString += parent[i][j] + ' ';
        }
       
    }
    constructShortestPath(multiSource[0][0], multiSource[0][1], xEnd, yEnd, parent, shortestPathArray,discoveries,grid);
    let message = setMessage(discoveries, row, col, walls,type);
    return [path, shortestPathArray,message ]


};

const dij = (multiSource, row, col, dis, grid, path, parent, type, vis,discoveries) => {
    const pq = new FastPriorityQueue();
    let xStart, yStart;
    if (type == "multi-dij") {
        for (let i = 0; i < multiSource.length; i++) {
            xStart = multiSource[i][0];
            yStart = multiSource[i][1];
            dis[xStart][yStart] = 0;
            pq.add([0, xStart, yStart]);
            vis[xStart][yStart] = 1;
            discoveries.counter++;
        }
    } else {
        xStart = multiSource[0][0];
        yStart = multiSource[0][1];
        pq.add([0, xStart, yStart]);
        vis[xStart][yStart] = 1;
        discoveries.counter++;

    }


    while (!pq.isEmpty()) {
        let obj = pq.peek();
        let w = obj[0];
        let x = obj[1];
        let y = obj[2];
        pq.poll();
        if (w > dis[x][y]) {
            continue;
        }
        if (!vis[x][y]) {
            path.push([x, y]);
            discoveries.counter++;
            vis[x][y] = 1;
        }
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            if (check(nx, ny, row, col) && grid[nx][ny] !== -1) {
                let newCost = w + grid[nx][ny];
                if (newCost < dis[nx][ny]) {
                    dis[nx][ny] = newCost;
                    parent[nx][ny] = [x, y];
                    pq.add([newCost, nx, ny]);

                }
            }
        }

    }
    // console.log(counter);
}



const constructShortestPath = (xStart, yStart, xEnd, yEnd, parent, shortestPath,discoveries,grid) => {
    let currentX = xEnd;
    let currentY = yEnd;
    while (currentX !== xStart || currentY !== yStart) {
        shortestPath.push([currentX, currentY]);
        discoveries.path++;
        discoveries.cost = discoveries.cost + grid[currentX][currentY];
        let parents = parent[currentX][currentY];
        console.log(currentX, currentY, "-:", parent[currentX][currentY])
        if (parents) {
            currentX = parents[0];
            currentY = parents[1];
            
        } else {
            // No path found, return empty shortest path
            shortestPath = [];
            return;
        }
    }
}

export default DijHelper