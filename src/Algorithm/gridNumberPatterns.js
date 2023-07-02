function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const gridNumbersPatternHelper = (rows, cols) => {
  const grid = [];
   const rand = getRandomNumber(0, 8);
  switch (rand) {
    case 0:
      // Left Side = large numbers ,,,,, Right Side = Small Numbers
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let randomNumber;
          if(j < cols/2){
          randomNumber = getRandomNumber(0, 100);
          }else{
            randomNumber = getRandomNumber(0, 10);
          }
          row.push(randomNumber);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 1:
      // Right side = larger numbers ,,,, Left side = small numbers
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let randomNumber;
          if(j > cols/2){
          randomNumber = getRandomNumber(0, 100);
          }else{
            randomNumber = getRandomNumber(0, 10);
          }
          row.push(randomNumber);
        }
        grid.push(row);

      }
      return grid;
      break;

    case 2:
      // Upper half = larger numbers ,,, lower half = small numbers
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let randomNumber;
          if(i < rows/2){
          randomNumber = getRandomNumber(0, 100);
          }else{
            randomNumber = getRandomNumber(0, 10);
          }
          row.push(randomNumber);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 3:
      // lower half = larger numbers ,,, upper half = small numbers
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let randomNumber;
          if(i > cols/2){
          randomNumber = getRandomNumber(0, 100);
          }else{
            randomNumber = getRandomNumber(0, 10);
          }
          row.push(randomNumber);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 4:
      // Odd or Even if sum of i and j
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let randomNumber;
          if(i%2==0){
          randomNumber = getRandomNumber(0, 100);
          }else{
            randomNumber = getRandomNumber(0, 10);
          }
          row.push(randomNumber);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 5:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          let randomNumber;
          if(i == 0 || j == 0 || i == rows-1||j==cols-1){
          randomNumber = getRandomNumber(0, 5);
          }else{
            randomNumber = getRandomNumber(0, 50);
          }
          row.push(randomNumber);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 6:
      return createSpiralGrid(rows,cols);
      break;

    case 7:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
      // Determine the value based on the symmetry pattern
      const value = i < rows / 2 ? i + 1 : rows - i;
      row.push(value);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 8:
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const number = getRandomNumber(0+i,i+j);
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;
      
    default:
      break;
  }
};





function createSpiralGrid(rows, cols) {
  const grid = [];

  let value = 0;
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  while (top <= bottom && left <= right) {
    if (!grid[top]) grid[top] = [];
    if (!grid[bottom]) grid[bottom] = [];

    // Fill top row
    for (let i = left; i <= right; i++) {
      grid[top][i] = value;
      
    }
    top++;
    value++;
    // Fill right column
    for (let i = top; i <= bottom; i++) {
      if (!grid[i]) grid[i] = [];
      grid[i][right] = value;
    }
    right--;
    value++;


    // Fill bottom row
    for (let i = right; i >= left; i--) {
      grid[bottom][i] = value;
    }
    bottom--;
    value++;


    // Fill left column
    for (let i = bottom; i >= top; i--) {
      grid[i][left] = value;
    }
    left++;
    value++;

  }

  return grid;
}

export default gridNumbersPatternHelper