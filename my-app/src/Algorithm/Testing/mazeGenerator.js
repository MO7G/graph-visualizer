

class DisjSet {
    constructor(n) {
        this.rank = new Array(n);
        this.parent = new Array(n);
        this.n = n;
        this.makeSet();
    }

    makeSet() {
        for (let i = 0; i < this.n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    Union(x, y) {
        x = this.find(x);
        y = this.find(y);

        if (x === y) return;

        if (this.rank[x] < this.rank[y]) {
            [x, y] = [y, x];
        }
        this.parent[y] = x;
        if (this.rank[x] === this.rank[y]) {
            this.rank[x] = this.rank[x] + 1;
        }

    }
}
const create2DArray = (rows, cols) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                walls: { top: true, right: true, bottom: true, left: true },
            });
        }
        grid.push(row);
    }
    return grid;
};

let dx = [-1, 0, 1, 0]; // Up, Right, Down, Left
let dy = [0, 1, 0, -1];

const check = (x, y, row, col) => {
    return x >= 0 && y >= 0 && x < row && y < col;
};

// Function to generate a 2D grid maze
const generateMaze = (rows, cols) => {
    // Create the grid maze
    const maze = create2DArray(rows, cols);
    const totalCells = rows * cols;

    // Create an instance of DisjSet with totalCells
    const ds = new DisjSet(totalCells);

    // Connect adjacent cells and remove walls
    connectAdjacentCells(maze, ds, rows, cols);

    return maze;
};

// Function to connect adjacent cells and remove walls
const connectAdjacentCells = (maze, ds, rows, cols) => {
    const removeWalls = (cell1, cell2, direction) => {
        switch (direction) {
            case 0: // Top
                cell1.walls.top = false;
                cell2.walls.bottom = false;
                break;
            case 1: // Right
                cell1.walls.right = false;
                cell2.walls.left = false;
                break;
            case 2: // Bottom
                cell1.walls.bottom = false;
                cell2.walls.top = false;
                break;
            case 3: // Left
                cell1.walls.left = false;
                cell2.walls.right = false;
                break;
        }
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const currentCell = maze[i][j];
            const currentSet = i * cols + j;

            // Connect current cell with adjacent cells
            for (let k = 0; k < 4; k++) {
                const newRow = i + dx[k];
                const newCol = j + dy[k];

                if (check(newRow, newCol, rows, cols)) {
                    const adjacentCell = maze[newRow][newCol];
                    const adjacentSet = newRow * cols + newCol;

                    if (ds.find(currentSet) !== ds.find(adjacentSet)) {
                        // Cells are in different sets, connect them
                        ds.Union(currentSet, adjacentSet);

                        // Remove walls between cells
                        removeWalls(currentCell, adjacentCell, k);
                    }
                }
            }
        }
    }
};

const maze = generateMaze(5, 5);
const convertedMaze = convertToGrid(maze);

console.log(convertedMaze);

function convertToGrid(maze) {
    const rows = maze.length;
    const cols = maze[0].length;
    const convertedMaze = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const cell = maze[i][j];
            let value = -1; // Set default value as wall

            if (!cell.walls.top && !cell.walls.right && !cell.walls.bottom && !cell.walls.left) {
                value = 0; // Set value as 0 if all walls are removed
            }

            row.push(value);
        }
        convertedMaze.push(row);
    }

    return convertedMaze;
}