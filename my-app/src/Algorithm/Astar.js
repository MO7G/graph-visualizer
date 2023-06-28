class Node {
    constructor(x, y, obstacle) {
        this.x = x;
        this.y = y;
        this.obstacle = obstacle;
        this.g = Infinity;
        this.h = 0;
        this.f = 0;
        this.parent = null;
    }
}

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

function calculateDistance(nodeA, nodeB) {
    const dx = nodeA.x - nodeB.x;
    const dy = nodeA.y - nodeB.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function aStarSearch(grid, startNode, goalNode,backTrack) {
    const openList = new BinaryHeap();
    const closedList = new Map();
    const animation = [];

    startNode.g = 0;
    startNode.f = startNode.h = calculateDistance(startNode, goalNode);
    openList.push(startNode);
   
    while (openList.size > 0) {
        const currentNode = openList.pop();
        closedList.set(`${currentNode.x},${currentNode.y}`, currentNode);
        animation.push([currentNode.x,currentNode.y])
        if (currentNode === goalNode) {
            let current = currentNode;
            while (current !== null) {
               backTrack.push([current.x, current.y]);
                current = current.parent;
            }
            return animation;
        }

        const neighbors = [];
        const { x, y } = currentNode;

        if (x > 0) neighbors.push(grid[x - 1][y])
        if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
        if (y > 0) neighbors.push(grid[x][y - 1]);
        if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);

        for (let neighbor of neighbors) {
            if (closedList.has(`${neighbor.x},${neighbor.y}`) || neighbor.obstacle) {
                continue;
            }

            const tentativeG = currentNode.g + 1;
            const h = calculateDistance(neighbor, goalNode);
            const f = tentativeG + h;

            if (!openList.heap.includes(neighbor)) {
                neighbor.g = tentativeG;
                neighbor.h = h;
                neighbor.f = f;
                neighbor.parent = currentNode;
                openList.push(neighbor);
            } else if (tentativeG < neighbor.g) {
                neighbor.g = tentativeG;
                neighbor.h = h;
                neighbor.f = f;
                neighbor.parent = currentNode;
            }
        }
    }

    return null;
}


function create2DArray(rows, cols, realGrid) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            if (realGrid[i][j] == -1) {
                row.push(new Node(i, j, true));
            } else {
                row.push(new Node(i, j, false));
            }
        }
        grid.push(row); // Add the row to the grid
    }
    return grid;
}





const AStarHelper = (gridData) => {
    let realGrid = gridData.realGrid;
    let row = gridData.row;
    let col = gridData.col;
    let grid = create2DArray(row, col, realGrid);
    let xStart = gridData.source[0][0];
    let yStart = gridData.source[0][1];
    let xEnd = gridData.target[0];
    let yEnd = gridData.target[1];
    let backtrack = []
    const path = aStarSearch(grid, grid[xStart][yStart], grid[xEnd][yEnd],backtrack);
    if (path !== null) {
        return [path, backtrack];
    } else {
        return [null];
    }

};


export default AStarHelper