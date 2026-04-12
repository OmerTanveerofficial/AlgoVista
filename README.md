# AlgoVista - Interactive Algorithm Visualizer

A modern, interactive web application for visualizing sorting, pathfinding, and graph algorithms. Built to help students and developers understand how fundamental computer science algorithms work through step-by-step animation.

## Features

### Sorting Algorithms
- **Bubble Sort** - O(n²) comparison-based sorting
- **Selection Sort** - O(n²) in-place sorting
- **Insertion Sort** - O(n²) adaptive sorting
- **Merge Sort** - O(n log n) divide-and-conquer
- **Quick Sort** - O(n log n) average-case partitioning
- **Heap Sort** - O(n log n) heap-based sorting

Adjustable array size (10-150 elements), speed control, real-time comparison/swap counters, and color-coded visualization states.

### Pathfinding Algorithms
- **Dijkstra's Algorithm** - Guaranteed shortest path (weighted)
- **A\* Search** - Heuristic-optimized shortest path
- **Breadth-First Search** - Level-order exploration (unweighted shortest path)
- **Depth-First Search** - Deep exploration with backtracking

Interactive grid with drag-to-draw walls, weighted nodes, draggable start/end points, and maze generation.

### Graph Algorithms
- **BFS Traversal** - Level-by-level graph exploration
- **DFS Traversal** - Depth-first exploration with backtracking
- **Kruskal's MST** - Minimum spanning tree via edge sorting + Union-Find
- **Prim's MST** - Minimum spanning tree via greedy edge selection

Random graph generation with weighted edges, node visualization, and step-by-step animation with edge highlighting.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── algorithms/
│   ├── sorting.js        # Sorting algorithm implementations
│   ├── pathfinding.js    # Pathfinding algorithms + maze generation
│   └── graph.js          # Graph traversal + MST algorithms
├── components/
│   └── Navbar.jsx        # Navigation bar
├── pages/
│   ├── Home.jsx          # Landing page with complexity reference
│   ├── SortingVisualizer.jsx
│   ├── PathfindingVisualizer.jsx
│   └── GraphVisualizer.jsx
├── App.jsx               # Root component with routing
├── main.jsx              # Entry point
└── index.css             # Global styles + Tailwind config
```

## Algorithm Complexity Reference

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Dijkstra's | O(V+E log V) | O(V+E log V) | O(V²) | O(V) |
| A* Search | O(E) | O(E) | O(V²) | O(V) |
| Kruskal's | O(E log E) | O(E log E) | O(E log E) | O(V) |

## License

MIT
