import { useState, useRef, useEffect, useCallback } from 'react'
import { GRAPH_ALGORITHMS, generateRandomGraph, bfsGraph, dfsGraph, kruskal, prim } from '../algorithms/graph'

export default function GraphVisualizer() {
  const [graphData, setGraphData] = useState(() => generateRandomGraph(8))
  const [algorithm, setAlgorithm] = useState('bfs')
  const [isRunning, setIsRunning] = useState(false)
  const [visitedNodes, setVisitedNodes] = useState(new Set())
  const [activeEdges, setActiveEdges] = useState([])
  const [rejectedEdges, setRejectedEdges] = useState([])
  const [currentEdge, setCurrentEdge] = useState(null)
  const [stepInfo, setStepInfo] = useState('')
  const canvasRef = useRef(null)
  const cancelRef = useRef(false)

  const { nodes, edges, adjacencyList } = graphData

  const clearVisualization = useCallback(() => {
    setVisitedNodes(new Set())
    setActiveEdges([])
    setRejectedEdges([])
    setCurrentEdge(null)
    setStepInfo('')
  }, [])

  const regenerate = () => {
    cancelRef.current = true
    setIsRunning(false)
    clearVisualization()
    setGraphData(generateRandomGraph(8))
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const runAlgorithm = async () => {
    cancelRef.current = false
    setIsRunning(true)
    clearVisualization()

    const algoMeta = GRAPH_ALGORITHMS[algorithm]
    let animations

    if (algoMeta.type === 'traversal') {
      const fn = algorithm === 'bfs' ? bfsGraph : dfsGraph
      animations = fn(adjacencyList, nodes[0].id)
    } else {
      const fn = algorithm === 'kruskal' ? kruskal : prim
      if (algorithm === 'kruskal') {
        animations = fn(nodes, edges)
      } else {
        animations = fn(nodes, adjacencyList, nodes[0].id)
      }
    }

    const visited = new Set()
    const active = []
    const rejected = []

    for (const anim of animations) {
      if (cancelRef.current) break

      if (anim.type === 'visit') {
        visited.add(anim.node)
        setVisitedNodes(new Set(visited))
        setStepInfo(`Visiting node ${anim.node}`)
        await sleep(500)
      } else if (anim.type === 'explore-edge') {
        setCurrentEdge({ from: anim.from, to: anim.to })
        setStepInfo(`Exploring edge ${anim.from} → ${anim.to}`)
        await sleep(400)
        setCurrentEdge(null)
      } else if (anim.type === 'backtrack') {
        setStepInfo(`Backtracking ${anim.from} → ${anim.to}`)
        await sleep(300)
      } else if (anim.type === 'consider-edge') {
        setCurrentEdge({ from: anim.from, to: anim.to })
        setStepInfo(`Considering edge ${anim.from} → ${anim.to} (weight: ${anim.weight})`)
        await sleep(600)
      } else if (anim.type === 'add-edge') {
        active.push({ from: anim.from, to: anim.to })
        setActiveEdges([...active])
        setStepInfo(`Added edge ${anim.from} → ${anim.to} to MST`)
        setCurrentEdge(null)
        await sleep(400)
      } else if (anim.type === 'reject-edge') {
        rejected.push({ from: anim.from, to: anim.to })
        setRejectedEdges([...rejected])
        setStepInfo(`Rejected edge ${anim.from} → ${anim.to} (would form cycle)`)
        setCurrentEdge(null)
        await sleep(400)
      }
    }

    setCurrentEdge(null)
    setStepInfo('Done!')
    setIsRunning(false)
  }

  const getNodePosition = (nodeId) => {
    const node = nodes.find(n => n.id === nodeId)
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
  }

  const isEdgeActive = (from, to) =>
    activeEdges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))

  const isEdgeRejected = (from, to) =>
    rejectedEdges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))

  const isEdgeCurrent = (from, to) =>
    currentEdge && ((currentEdge.from === from && currentEdge.to === to) || (currentEdge.from === to && currentEdge.to === from))

  const algoInfo = GRAPH_ALGORITHMS[algorithm]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Controls */}
      <div className="bg-surface-light rounded-2xl border border-surface-lighter p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            className="bg-surface-lighter text-white px-4 py-2 rounded-lg border border-surface-lighter focus:border-primary outline-none"
          >
            {Object.entries(GRAPH_ALGORITHMS).map(([key, algo]) => (
              <option key={key} value={key}>{algo.name}</option>
            ))}
          </select>

          <button
            onClick={runAlgorithm}
            disabled={isRunning}
            className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
          >
            Visualize
          </button>

          <button
            onClick={regenerate}
            className="px-6 py-2 border border-surface-lighter text-gray-300 rounded-lg font-medium hover:bg-surface-lighter/50 transition-all"
          >
            New Graph
          </button>

          {stepInfo && (
            <div className="ml-auto px-4 py-2 bg-surface-lighter/50 rounded-lg text-sm text-gray-300 font-mono">
              {stepInfo}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-surface-lighter flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-gray-500">Algorithm:</span>{' '}
            <span className="text-white font-medium">{algoInfo.name}</span>
          </div>
          <div>
            <span className="text-gray-500">Type:</span>{' '}
            <span className="text-cyan-400">{algoInfo.type === 'mst' ? 'Minimum Spanning Tree' : 'Traversal'}</span>
          </div>
          <div className="text-gray-400">{algoInfo.description}</div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="bg-surface-light rounded-2xl border border-surface-lighter p-6">
        <svg viewBox="0 0 800 600" className="w-full h-[500px]">
          {/* Edges */}
          {edges.map((edge, i) => {
            const from = getNodePosition(edge.from)
            const to = getNodePosition(edge.to)
            let strokeColor = '#334155'
            let strokeWidth = 1.5
            let opacity = 0.4

            if (isEdgeActive(edge.from, edge.to)) {
              strokeColor = '#22d3ee'
              strokeWidth = 3
              opacity = 1
            } else if (isEdgeRejected(edge.from, edge.to)) {
              strokeColor = '#ef4444'
              strokeWidth = 2
              opacity = 0.5
            } else if (isEdgeCurrent(edge.from, edge.to)) {
              strokeColor = '#fbbf24'
              strokeWidth = 3
              opacity = 1
            }

            const midX = (from.x + to.x) / 2
            const midY = (from.y + to.y) / 2

            return (
              <g key={i}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                />
                <rect
                  x={midX - 10} y={midY - 8}
                  width={20} height={16}
                  rx={4}
                  fill="#1e293b"
                  opacity={0.9}
                />
                <text
                  x={midX} y={midY + 4}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {edge.weight}
                </text>
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isVisited = visitedNodes.has(node.id)
            return (
              <g key={node.id}>
                <circle
                  cx={node.x} cy={node.y} r={22}
                  fill={isVisited ? '#6366f1' : '#1e293b'}
                  stroke={isVisited ? '#818cf8' : '#475569'}
                  strokeWidth={2}
                />
                <text
                  x={node.x} y={node.y + 5}
                  textAnchor="middle"
                  fill={isVisited ? '#fff' : '#94a3b8'}
                  fontSize="14"
                  fontWeight="bold"
                  fontFamily="system-ui"
                >
                  {node.id}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-surface-lighter">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs text-gray-400">Visited</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accent" /><span className="text-xs text-gray-400">MST/Active Edge</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-400" /><span className="text-xs text-gray-400">Considering</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500" /><span className="text-xs text-gray-400">Rejected</span></div>
        </div>
      </div>
    </div>
  )
}
