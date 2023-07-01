function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const gridNumbersPattern = (rows, cols) => {
  const grid = [];
  // const rand = getRandomNumber(1, 10);
  const rand = 1;
  switch (rand) {
    case 0:
      // Generate grid with random numbers between 0 and 100
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const randomNumber = getRandomNumber(0, 100);
          row.push(randomNumber);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 1:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 2:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 3:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 4:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
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
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 6:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 7:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 8:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 9:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
          row.push(number);
        }
        grid.push(row);
      }
      return grid;
      break;

    case 10:
      // Generate grid with a certain pattern (example)
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          // Apply your desired pattern logic here
          const number = (i + j) % 2 === 0 ? 1 : 0;
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

let grid = gridNumbersPattern(10, 10);
console.log(grid);
for (let i = 0; i < 10; i++) {
  let s = "";
  for (let j = 0; j < 10; j++) {
    s += grid[i][j] + " ";
  }
  console.log(s);
}
