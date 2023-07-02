class BinaryHeap {
  constructor() {
    this.heap = [];
  }

  get size() {
    return this.heap.length;
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    const node = this.heap[0];
    const lastNode = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastNode;
      this.sinkDown(0);
    }

    return node;
  }

  bubbleUp(index) {
    const node = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (node.f >= parent.f) {
        break;
      }

      this.heap[parentIndex] = node;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    const node = this.heap[index];
    const nodeScore = node.f;

    while (true) {
      let leftChildIndex = index * 2 + 1;
      let rightChildIndex = index * 2 + 2;
      let swapIndex = null;

      if (leftChildIndex < length) {
        const leftChild = this.heap[leftChildIndex];
        if (leftChild.f < nodeScore) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        const rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && rightChild.f < nodeScore) ||
          (swapIndex !== null && rightChild.f < this.heap[swapIndex].f)
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) {
        break;
      }

      this.heap[index] = this.heap[swapIndex];
      this.heap[swapIndex] = node;
      index = swapIndex;
    }
  }
}
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.queue.push(element);
    } else {
      let added = false;
      for (let i = 0; i < this.queue.length; i++) {
        if (element[2] < this.queue[i][2]) {
          this.queue.splice(i, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.queue.push(element);
      }
    }
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.queue.shift();
    }
    return null;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const setMessage = (discoveries, row, col, walls) => {
  let Name = "Greedy Best-First Search";
  let complexity = "O(b^m)";
  let discovered = discoveries.counter;
  let TotalSize = row * col;
  let PathLength = discoveries.path;
  let percentage = (discovered / TotalSize) * 100;
  let heuristic = " Manhattan distance heuristic"
  let ValidWalls = TotalSize - walls;
  let Classification;
  if (discovered == 2) {
    Classification = "Best case";
  } else if (discovered - ValidWalls == 0) {
    Classification = "Worst case";
  } else {
    Classification = "Average case";
  }
  const Message = `
  Name: ${Name}
  Time Complexity: ${complexity}
  TotalSize: ${TotalSize}
  walls:${walls}
  Discovered: ${discovered}
  PathLength: ${PathLength}
  Heuristic: ${heuristic}
  Work done : ${percentage}%
  Classification:${Classification}  
  `;
  return Message;
};

const greedyHelper = (gridData) => {
  let path = [];
  let grid = gridData.realGrid;
  let xStart = gridData.source[0][0];
  let yStart = gridData.source[0][1];
  let xEnd = gridData.target[0];
  let yEnd = gridData.target[1];
  let row = gridData.row;
  let col = gridData.col;
  let walls = gridData.walls;
  let discoveries = {
    counter: 0,
    path: 0,
  };
  let shortestPath = greedyBestFirstSearch(
    grid,
    xStart,
    yStart,
    xEnd,
    yEnd,
    row,
    col,
    path,
    discoveries
  );
  let message = setMessage(discoveries, row, col, walls);
  if (shortestPath == null) shortestPath = [];
  // let message = setMessage(discoveries, row, col, walls);

  return [path, shortestPath,message];
};
function greedyBestFirstSearch(
  grid,
  xStart,
  yStart,
  xEnd,
  yEnd,
  row,
  col,
  path,
  discoveries
) {
  const dx = [-1, 1, 0, 0]; // Directional movements (up, down, left, right)
  const dy = [0, 0, -1, 1];

  // Create a priority queue (min heap) to store cells based on their heuristic values
  const queue = new PriorityQueue({ comparator: (a, b) => a[2] - b[2] });

  // Create a visited array to track visited cells
  const visited = Array.from({ length: row }, () => new Array(col).fill(false));

  // Create a parents array to store the parent nodes for each visited cell
  const parents = Array.from({ length: row }, () => new Array(col).fill(null));

  // Push the starting cell to the priority queue
  queue.enqueue([
    xStart,
    yStart,
    calculateHeuristic(xStart, yStart, xEnd, yEnd),
  ]);

  while (!queue.isEmpty()) {
    // Dequeue the cell with the minimum heuristic value
    const [x, y, heuristic] = queue.dequeue();
    path.push([x, y]);
    discoveries.counter++;

    // Mark the cell as visited
    visited[x][y] = true;

    // Check if the current cell is the target
    if (x === xEnd && y === yEnd) {
      // Found the target, do something

      // Retrieve the path from the parents array
      const pathCoordinates = getPathCoordinates(
        parents,
        xStart,
        yStart,
        xEnd,
        yEnd,
        discoveries
      );
      return pathCoordinates;
    }

    // Explore the neighbors
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // Check if the neighbor is within the grid boundaries and is not visited
      if (
        nx >= 0 &&
        nx < row &&
        ny >= 0 &&
        ny < col &&
        !visited[nx][ny] &&
        grid[nx][ny] !== -1
      ) {
        // Calculate the heuristic value for the neighbor
        const h = calculateHeuristic(nx, ny, xEnd, yEnd);

        // Enqueue the neighbor to the priority queue
        queue.enqueue([nx, ny, h]);
        path.push([nx, ny]);
        visited[nx][ny] = true; // Mark the neighbor as visited
        discoveries.counter++;

        // Store the parent node for the neighbor
        parents[nx][ny] = [x, y];
      }
    }
  }

  return null;
}

// Helper function to calculate the heuristic value (e.g., Manhattan distance)
function calculateHeuristic(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  return dx + dy; // Manhattan distance heuristic
}

// Helper function to retrieve the path coordinates from the parents array
function getPathCoordinates(parents, xStart, yStart, xEnd, yEnd, discoveries) {
  const pathCoordinates = [];
  let currentX = xEnd;
  let currentY = yEnd;

  while (currentX !== xStart || currentY !== yStart) {
    pathCoordinates.push([currentX, currentY]);
    discoveries.path++;
    const [parentX, parentY] = parents[currentX][currentY];
    currentX = parentX;
    currentY = parentY;
  }

  pathCoordinates.push([xStart, yStart]); // Add the starting node to the path
  pathCoordinates.reverse();
  return pathCoordinates;
}

export default greedyHelper;
