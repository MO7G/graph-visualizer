

export const create2DArray = (rows, cols) => {
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

let dx = [-1, 0, 1, 0]; // Up, Right, Down, Left
let dy = [0, 1, 0, -1];


export const check = (x, y, row, col) => {
    return x >= 0 && y >= 0 && x < row && y < col;
};