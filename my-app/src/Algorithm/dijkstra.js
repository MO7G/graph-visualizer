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


    dij(multiSource, row, col, dis, grid, path, parent, type, vis);
    let shortestPathArray = [];
    console.log(multiSource[0]);
    console.log(xEnd, yEnd)
    for (let i = 0; i < row; i++) {
        let rowString = '';
        for (let j = 0; j < col; j++) {
            rowString += parent[i][j] + ' ';
        }
        console.log(rowString);
    }
    constructShortestPath(multiSource[0][0], multiSource[0][1], xEnd, yEnd, parent, shortestPathArray);
    return [path, shortestPathArray]


};

const dij = (multiSource, row, col, dis, grid, path, parent, type, vis) => {
    const pq = new FastPriorityQueue();
    let xStart, yStart;
    if (type == "multi-dij") {
        for (let i = 0; i < multiSource.length; i++) {
            xStart = multiSource[i][0];
            yStart = multiSource[i][1];
            dis[xStart][yStart] = 0;
            pq.add([0, xStart, yStart]);
            vis[xStart][yStart] = 1;
        }
    } else {
        xStart = multiSource[0][0];
        yStart = multiSource[0][1];
        pq.add([0, xStart, yStart]);
        vis[xStart][yStart] = 1;

    }
    let counter = 0;

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
            vis[x][y] = 1;
        }
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i];
            let ny = y + dy[i];
            if (check(nx, ny, row, col) && grid[nx][ny] !== -1) {
                let newCost = w + grid[nx][ny];
                if (newCost < dis[nx][ny]) {
                    dis[nx][ny] = newCost;
                    console.log("yes")
                    parent[nx][ny] = [x, y];
                    pq.add([newCost, nx, ny]);

                }
            }
        }

    }
    // console.log(counter);
}

const shortestPath = (xEnd, yEnd, parent) => {
    let a = xEnd;
    let b = yEnd;
    const path = [[a, b]]; // Store the path coordinates in an array
    while (a !== 0 || b !== 0) {
        const tempA = parent[a][b][0];
        const tempB = parent[a][b][1];
        // Break the loop if the parent indices are invalid
        if (tempA < 0 || tempB < 0) {
            console.log("Invalid parent indices encountered.");
            break;
        }
        console.log(a, b);
        a = tempA;
        b = tempB;
        path.push([a, b]);

    }
    path.pop();
    return path;
};

const constructShortestPath = (xStart, yStart, xEnd, yEnd, parent, shortestPath) => {
    let currentX = xEnd;
    let currentY = yEnd;
    while (currentX !== xStart || currentY !== yStart) {
        shortestPath.push([currentX, currentY]);
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