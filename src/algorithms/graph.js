export function bfsGraph(adjacencyList, startNode) {
  const animations = []
  const visited = new Set()
  const queue = [startNode]
  visited.add(startNode)

  while (queue.length > 0) {
    const node = queue.shift()
    animations.push({ type: 'visit', node })

    for (const neighbor of (adjacencyList[node] || [])) {
      if (!visited.has(neighbor.to)) {
        visited.add(neighbor.to)
        animations.push({ type: 'explore-edge', from: node, to: neighbor.to })
        queue.push(neighbor.to)
      }
    }
  }

  return animations
}

export function dfsGraph(adjacencyList, startNode) {
  const animations = []
  const visited = new Set()

  function dfs(node) {
    visited.add(node)
    animations.push({ type: 'visit', node })

    for (const neighbor of (adjacencyList[node] || [])) {
      if (!visited.has(neighbor.to)) {
        animations.push({ type: 'explore-edge', from: node, to: neighbor.to })
        dfs(neighbor.to)
        animations.push({ type: 'backtrack', from: neighbor.to, to: node })
      }
    }
  }

  dfs(startNode)
  return animations
}

export function kruskal(nodes, edges) {
  const animations = []
  const parent = {}
  const rank = {}

  for (const node of nodes) {
    parent[node.id] = node.id
    rank[node.id] = 0
  }

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  function union(x, y) {
    const px = find(x)
    const py = find(y)
    if (px === py) return false
    if (rank[px] < rank[py]) parent[px] = py
    else if (rank[px] > rank[py]) parent[py] = px
    else { parent[py] = px; rank[px]++ }
    return true
  }

  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight)

  for (const edge of sortedEdges) {
    animations.push({ type: 'consider-edge', from: edge.from, to: edge.to, weight: edge.weight })
    if (union(edge.from, edge.to)) {
      animations.push({ type: 'add-edge', from: edge.from, to: edge.to, weight: edge.weight })
    } else {
      animations.push({ type: 'reject-edge', from: edge.from, to: edge.to })
    }
  }

  return animations
}

export function prim(nodes, adjacencyList, startNode) {
  const animations = []
  const inMST = new Set()
  const edges = []

  inMST.add(startNode)
  animations.push({ type: 'visit', node: startNode })

  for (const neighbor of (adjacencyList[startNode] || [])) {
    edges.push({ from: startNode, to: neighbor.to, weight: neighbor.weight })
  }

  while (inMST.size < nodes.length && edges.length > 0) {
    edges.sort((a, b) => a.weight - b.weight)

    let added = false
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]
      if (!inMST.has(edge.to)) {
        edges.splice(i, 1)
        animations.push({ type: 'consider-edge', from: edge.from, to: edge.to, weight: edge.weight })
        animations.push({ type: 'add-edge', from: edge.from, to: edge.to, weight: edge.weight })
        animations.push({ type: 'visit', node: edge.to })
        inMST.add(edge.to)

        for (const neighbor of (adjacencyList[edge.to] || [])) {
          if (!inMST.has(neighbor.to)) {
            edges.push({ from: edge.to, to: neighbor.to, weight: neighbor.weight })
          }
        }
        added = true
        break
      }
    }
    if (!added) break
  }

  return animations
}

export function generateRandomGraph(nodeCount = 8) {
  const nodes = []
  const centerX = 400
  const centerY = 300
  const radius = 200

  for (let i = 0; i < nodeCount; i++) {
    const angle = (2 * Math.PI * i) / nodeCount - Math.PI / 2
    const jitterX = (Math.random() - 0.5) * 60
    const jitterY = (Math.random() - 0.5) * 60
    nodes.push({
      id: String.fromCharCode(65 + i),
      x: centerX + Math.cos(angle) * radius + jitterX,
      y: centerY + Math.sin(angle) * radius + jitterY,
    })
  }

  const edges = []
  const adjacencyList = {}
  for (const node of nodes) adjacencyList[node.id] = []

  for (let i = 0; i < nodeCount; i++) {
    const next = (i + 1) % nodeCount
    const weight = Math.floor(Math.random() * 9) + 1
    edges.push({ from: nodes[i].id, to: nodes[next].id, weight })
    adjacencyList[nodes[i].id].push({ to: nodes[next].id, weight })
    adjacencyList[nodes[next].id].push({ to: nodes[i].id, weight })
  }

  const extraEdges = Math.floor(nodeCount * 0.6)
  for (let e = 0; e < extraEdges; e++) {
    const i = Math.floor(Math.random() * nodeCount)
    let j = Math.floor(Math.random() * nodeCount)
    while (j === i) j = Math.floor(Math.random() * nodeCount)

    const from = nodes[i].id
    const to = nodes[j].id
    const exists = edges.some(edge =>
      (edge.from === from && edge.to === to) || (edge.from === to && edge.to === from)
    )
    if (!exists) {
      const weight = Math.floor(Math.random() * 9) + 1
      edges.push({ from, to, weight })
      adjacencyList[from].push({ to, weight })
      adjacencyList[to].push({ to: from, weight })
    }
  }

  return { nodes, edges, adjacencyList }
}

export const GRAPH_ALGORITHMS = {
  bfs: { name: 'BFS Traversal', fn: 'bfs', type: 'traversal', description: 'Level-by-level graph exploration.' },
  dfs: { name: 'DFS Traversal', fn: 'dfs', type: 'traversal', description: 'Deep exploration with backtracking.' },
  kruskal: { name: "Kruskal's MST", fn: 'kruskal', type: 'mst', description: 'Finds minimum spanning tree by sorting edges and using Union-Find.' },
  prim: { name: "Prim's MST", fn: 'prim', type: 'mst', description: 'Grows MST from a starting node by always adding the cheapest edge.' },
}
