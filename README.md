## Maze Solver

Maze Solver is a React-powered project that utilizes graph traversal algorithms to solve mazes. It supports the following algorithms:

1. DFS (Depth-First Search)
2. BFS (Breadth-First Search)
3. Dijkstra's Algorithm
4. Bellman-Ford Algorithm
5. Multiple Source BFS (BFS from multiple sources)
6. Multiple Source Dijkstra's Algorithm
7. A* Algorithm
8. Greedy Search Algorithm











## Features

- **Show Mode**: This mode is designed for larger grids with smaller cells, providing users with a visual representation of how the algorithms work on a larger scale. It allows you to observe the maze-solving process in detail for more complex mazes.

- **Educational Mode**: This mode uses a smaller grid with larger cells, specifically tailored for educational purposes. It provides a clearer visualization of the algorithms' steps, making it easier to understand and learn the principles behind maze solving.



 - **Dynamic Grid**: The Maze Solver project allows you to generate your own custom grid, with the flexibility to create grids of varying sizes, including up to 300 x 300 cells. This dynamic grid feature enables you to work with mazes of different dimensions, providing a customizable experience to suit your needs. Whether you want to solve a small maze or tackle a large-scale challenge, the grid size is adjustable to accommodate your desired complexity.


- **Weighted Grids**: Users can add weights to the grid to see how Dijkstra's and Bellman-Ford algorithms work together to find the shortest path.

- **Grid Patterns**: The Maze Solver application supports various grid patterns, which can be applied to create unique weighted mazes. These grid patterns include number patterns, allowing you to visualize how Dijkstra's Algorithm and Bellman-Ford Algorithm find the shortest path in different scenarios.
  - Left Side with large numbers, Right Side with small numbers
  - Right Side with larger numbers, Left Side with small numbers
  - Upper half with larger numbers, Lower half with small numbers
  - Lower half with larger numbers, Upper half with small numbers
  - Edges with small weights
  - Symmetry grid
  - Spiral grid


- **Logs Section**:The Logs section provides detailed information about each algorithm's performance when run on the maze. Since different algorithms may perform differently depending on the structure of the maze, the Logs section allows you to analyze the performance of each algorithm and determine the best algorithm for a given maze scenario.
  - When an algorithm is executed, the Logs section displays key information such as the algorithm's name, complexity, and the number of cells it discovered during the traversal process. This information helps you understand how each algorithm navigates through the maze and provides insights into their efficiency and effectiveness.
  - By reviewing the Logs section, you can compare the performance of different algorithms and make informed decisions about choosing the most suitable algorithm for solving mazes based on their characteristics and complexity.


- **Maze Generator**: Users can generate mazes using recursive and random maze generators.

## Screenshots

(Here you can add screenshots of your application. Make sure to capture the different modes, grid configurations, and algorithm outputs.)


## Run Locally

Clone the project

```bash
  git clone https://github.com/MO7G/graph-visualizer
```

Go to the project directory

```bash
  cd graph-visualizer
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  npm start
```


## Contribution

Contributions are welcome and encouraged! If you'd like to contribute to the Maze Solver project, please follow these steps:

1. Fork the repository and create a new branch for your contribution.
2. Implement your changes or additions to the project.
3. Ensure that your code follows the project's coding standards and conventions.
4. Test your changes to ensure they work as expected and do not introduce any bugs.
5. Submit a pull request with a detailed description of your changes, including the motivation behind them.

Your contribution will be reviewed, and if it meets the project's standards, it will be merged into the main repository. Thank you for your interest in contributing to the Maze Solver project!


