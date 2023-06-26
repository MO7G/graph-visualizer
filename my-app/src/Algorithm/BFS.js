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

const BfsHelper = (gridData, type) => {
    let path = [];
    let shortestPath = [];
    let vis = create2DArray(gridData.row, gridData.col);
    let parent = create2DArray(gridData.row, gridData.col);
    let grid = gridData.realGrid;
    let multiSource = gridData.source
    let xEnd = gridData.target[0];
    let yEnd = gridData.target[1];
    let row = gridData.row;
    let col = gridData.col;
    Bfs(multiSource, xEnd, yEnd, row, col, vis, grid, path, parent, type);
    constructShortestPath(xEnd, yEnd, parent, shortestPath)
    return [path, shortestPath];

};


const Bfs = (multiSource, xEnd, yEnd, row, col, vis, grid, path, parent, type) => {
    let queue = [];
    let flag = true;
    let xStart, yStart;
    if (type == "multi-bfs") {
        for (let i = 0; i < multiSource.length; i++) {
            xStart = multiSource[i][0];
            yStart = multiSource[i][1];
            vis[xStart][yStart] = 1;
            queue.push([xStart, yStart]);
        }
    } else {
        xStart = multiSource[0][0];
        yStart = multiSource[0][1];
        vis[xStart][yStart] = 1;
        queue.push([xStart, yStart]);
    }


    while (queue.length !== 0) {
        let sz = queue.length;
        for (let i = 0; i < sz; i++) {
            let x, y;
            x = queue[0][0];
            y = queue[0][1];
            queue.shift();
            if (flag) {
                path.push([x, y]);
            }
            if (x === xEnd && y === yEnd) {
                flag = false;
            }
            for (let k = 0; k < 4; k++) {
                let newX = x + dx[k];
                let newY = y + dy[k];
                if (check(newX, newY, row, col) && !vis[newX][newY] && grid[newX][newY] !== -1 && flag) {
                    queue.push([newX, newY]);
                    vis[newX][newY] = 1;
                    parent[newX][newY] = [x, y];
                }
            }
        }
    }
}

const constructShortestPath = (xEnd, yEnd, parent, shortestPath) => {
    console.log(shortestPath)
    let currentX = xEnd;
    let currentY = yEnd;
    while (currentX !== 0 || currentY !== 0) {
        shortestPath.push([currentX, currentY]);
        let parents = parent[currentX][currentY];
        if (parents) {
            currentX = parents[0];
            currentY = parents[1];
        } else {
            // No path found, return empty shortest path
            shortestPath = [];
            return;
        }
    }
    shortestPath.shift();
}

export default BfsHelper;


