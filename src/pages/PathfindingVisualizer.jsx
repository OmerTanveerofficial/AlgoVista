import { useState, useCallback, useRef } from 'react'
import { PATHFINDING_ALGORITHMS, generateMaze } from '../algorithms/pathfinding'

const ROWS = 25
const COLS = 50
const DEFAULT_START = { row: 12, col: 5 }
const DEFAULT_END = { row: 12, col: 44 }

function createEmptyGrid() {
  return Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => ({
      row: r, col: c, isWall: false, weight: 1,
    }))
  )
}

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState(createEmptyGrid)
  const [start, setStart] = useState(DEFAULT_START)
  const [end, setEnd] = useState(DEFAULT_END)
  const [algorithm, setAlgorithm] = useState('dijkstra')
  const [isRunning, setIsRunning] = useState(false)
  const [visited, setVisited] = useState(new Set())
  const [path, setPath] = useState(new Set())
  const [drawMode, setDrawMode] = useState('wall')
  const [stats, setStats] = useState({ visited: 0, pathLength: 0 })
  const mouseDown = useRef(false)
  const dragging = useRef(null)
  const cancelRef = useRef(false)

  const clearVisualization = useCallback(() => {
    setVisited(new Set())
    setPath(new Set())
    setStats({ visited: 0, pathLength: 0 })
  }, [])

  const clearAll = useCallback(() => {
    cancelRef.current = true
    setIsRunning(false)
    setGrid(createEmptyGrid())
    setStart(DEFAULT_START)
    setEnd(DEFAULT_END)
    clearVisualization()
  }, [clearVisualization])

  const handleMaze = () => {
    cancelRef.current = true
    setIsRunning(false)
    clearVisualization()
    const maze = generateMaze(ROWS, COLS)
    maze[DEFAULT_START.row][DEFAULT_START.col].isWall = false
    maze[DEFAULT_END.row][DEFAULT_END.col].isWall = false
    setGrid(maze)
    setStart(DEFAULT_START)
    setEnd(DEFAULT_END)
  }

  const handleMouseDown = (row, col) => {
    if (isRunning) return
    if (row === start.row && col === start.col) {
      dragging.current = 'start'
    } else if (row === end.row && col === end.col) {
      dragging.current = 'end'
    } else {
      mouseDown.current = true
      toggleCell(row, col)
    }
  }

  const handleMouseEnter = (row, col) => {
    if (isRunning) return
    if (dragging.current === 'start') {
      setStart({ row, col })
      clearVisualization()
    } else if (dragging.current === 'end') {
      setEnd({ row, col })
      clearVisualization()
    } else if (mouseDown.current) {
      toggleCell(row, col)
    }
  }

  const handleMouseUp = () => {
    mouseDown.current = false
    dragging.current = null
  }

  const toggleCell = (row, col) => {
    if ((row === start.row && col === start.col) || (row === end.row && col === end.col)) return
    clearVisualization()
    setGrid(prev => {
      const newGrid = prev.map(r => r.map(c => ({ ...c })))
      if (drawMode === 'wall') {
        newGrid[row][col].isWall = !newGrid[row][col].isWall
        newGrid[row][col].weight = 1
      } else {
        newGrid[row][col].isWall = false
        newGrid[row][col].weight = newGrid[row][col].weight === 5 ? 1 : 5
      }
      return newGrid
    })
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const runAlgorithm = async () => {
    cancelRef.current = false
    setIsRunning(true)
    clearVisualization()

    const algo = PATHFINDING_ALGORITHMS[algorithm]
    const result = algo.fn(grid, start, end)

    const visitedSet = new Set()
    for (const anim of result.animations) {
      if (cancelRef.current) break
      visitedSet.add(`${anim.row}-${anim.col}`)
      setVisited(new Set(visitedSet))
      setStats(s => ({ ...s, visited: visitedSet.size }))
      await sleep(10)
    }

    if (!cancelRef.current && result.path.length > 0) {
      const pathSet = new Set()
      for (const node of result.path) {
        if (cancelRef.current) break
        pathSet.add(`${node.row}-${node.col}`)
        setPath(new Set(pathSet))
        setStats(s => ({ ...s, pathLength: pathSet.size }))
        await sleep(30)
      }
    }

    setIsRunning(false)
  }

  const getCellClass = (row, col) => {
    if (row === start.row && col === start.col) return 'bg-green-500'
    if (row === end.row && col === end.col) return 'bg-red-500'
    if (path.has(`${row}-${col}`)) return 'bg-yellow-400'
    if (grid[row][col].isWall) return 'bg-surface-lighter'
    if (visited.has(`${row}-${col}`)) return 'bg-primary/60'
    if (grid[row][col].weight > 1) return 'bg-amber-700/50'
    return 'bg-surface-light hover:bg-surface-lighter/50'
  }

  const algoInfo = PATHFINDING_ALGORITHMS[algorithm]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
      {/* Controls */}
      <div className="glass rounded-3xl p-6 mb-6 relative">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            className="bg-white/5 text-white px-4 py-2.5 rounded-xl border border-white/10 focus:border-primary/50 outline-none backdrop-blur-sm"
          >
            {Object.entries(PATHFINDING_ALGORITHMS).map(([key, algo]) => (
              <option key={key} value={key}>{algo.name}</option>
            ))}
          </select>

          <div className="flex rounded-lg overflow-hidden border border-surface-lighter">
            <button
              onClick={() => setDrawMode('wall')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                drawMode === 'wall' ? 'bg-primary text-white' : 'bg-surface-lighter text-gray-400'
              }`}
            >
              Draw Walls
            </button>
            <button
              onClick={() => setDrawMode('weight')}
              disabled={!algoInfo.weighted}
              className={`px-4 py-2 text-sm font-medium transition-colors disabled:opacity-30 ${
                drawMode === 'weight' ? 'bg-amber-600 text-white' : 'bg-surface-lighter text-gray-400'
              }`}
            >
              Add Weights
            </button>
          </div>

          <button
            onClick={runAlgorithm}
            disabled={isRunning}
            className="btn-glow px-7 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold disabled:opacity-50"
          >
            Visualize
          </button>

          <button
            onClick={handleMaze}
            disabled={isRunning}
            className="px-7 py-2.5 glass rounded-xl text-gray-300 font-medium hover:bg-white/10 transition-all disabled:opacity-50"
          >
            Generate Maze
          </button>

          <button
            onClick={clearAll}
            className="px-7 py-2.5 glass rounded-xl text-gray-300 font-medium hover:bg-white/10 transition-all"
          >
            Clear All
          </button>

          <div className="ml-auto flex gap-6">
            <div className="text-center">
              <div className="text-xs text-gray-500">Visited</div>
              <div className="text-lg font-mono text-primary-light">{stats.visited}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Path Length</div>
              <div className="text-lg font-mono text-yellow-400">{stats.pathLength}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-gray-500">Algorithm:</span>{' '}
            <span className="text-white font-medium">{algoInfo.name}</span>
          </div>
          <div>
            <span className="text-gray-500">Weighted:</span>{' '}
            <span className={algoInfo.weighted ? 'text-green-400' : 'text-red-400'}>
              {algoInfo.weighted ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="text-gray-400">{algoInfo.description}</div>
        </div>
      </div>

      {/* Grid */}
      <div
        className="glass rounded-3xl p-4 overflow-x-auto relative"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="inline-block">
          {grid.map((row, r) => (
            <div key={r} className="flex">
              {row.map((cell, c) => (
                <div
                  key={`${r}-${c}`}
                  className={`w-[18px] h-[18px] border border-surface/30 cursor-pointer transition-colors duration-100 ${getCellClass(r, c)}`}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500" /><span className="text-xs text-gray-400">Start</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500" /><span className="text-xs text-gray-400">End</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-surface-lighter" /><span className="text-xs text-gray-400">Wall</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-primary/60" /><span className="text-xs text-gray-400">Visited</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-400" /><span className="text-xs text-gray-400">Path</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-700/50" /><span className="text-xs text-gray-400">Weight</span></div>
        </div>
      </div>
    </div>
  )
}
