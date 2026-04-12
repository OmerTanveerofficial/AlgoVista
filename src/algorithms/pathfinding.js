export function dijkstra(grid, start, end) {
  const animations = []
  const rows = grid.length
  const cols = grid[0].length
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null))
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

  dist[start.row][start.col] = 0
  const queue = [{ row: start.row, col: start.col, dist: 0 }]

  while (queue.length > 0) {
    queue.sort((a, b) => a.dist - b.dist)
    const { row, col } = queue.shift()

    if (visited[row][col]) continue
    visited[row][col] = true

    if (row === end.row && col === end.col) break

    animations.push({ type: 'visit', row, col })

    for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nr = row + dr
      const nc = col + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !grid[nr][nc].isWall) {
        const weight = grid[nr][nc].weight || 1
        const newDist = dist[row][col] + weight
        if (newDist < dist[nr][nc]) {
          dist[nr][nc] = newDist
          prev[nr][nc] = { row, col }
          queue.push({ row: nr, col: nc, dist: newDist })
        }
      }
    }
  }

  const path = []
  let current = end
  while (current && prev[current.row][current.col]) {
    path.unshift(current)
    current = prev[current.row][current.col]
  }
  if (current && current.row === start.row && current.col === start.col) {
    path.unshift(start)
  }

  return { animations, path: path.length > 1 ? path : [] }
}

export function aStar(grid, start, end) {
  const animations = []
  const rows = grid.length
  const cols = grid[0].length

  const heuristic = (r, c) => Math.abs(r - end.row) + Math.abs(c - end.col)

  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null))
  const closed = Array.from({ length: rows }, () => Array(cols).fill(false))

  gScore[start.row][start.col] = 0
  fScore[start.row][start.col] = heuristic(start.row, start.col)

  const open = [{ row: start.row, col: start.col }]

  while (open.length > 0) {
    open.sort((a, b) => fScore[a.row][a.col] - fScore[b.row][b.col])
    const { row, col } = open.shift()

    if (row === end.row && col === end.col) break
    if (closed[row][col]) continue
    closed[row][col] = true

    animations.push({ type: 'visit', row, col })

    for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nr = row + dr
      const nc = col + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !closed[nr][nc] && !grid[nr][nc].isWall) {
        const weight = grid[nr][nc].weight || 1
        const tentative = gScore[row][col] + weight
        if (tentative < gScore[nr][nc]) {
          prev[nr][nc] = { row, col }
          gScore[nr][nc] = tentative
          fScore[nr][nc] = tentative + heuristic(nr, nc)
          open.push({ row: nr, col: nc })
        }
      }
    }
  }

  const path = []
  let current = end
  while (current && prev[current.row][current.col]) {
    path.unshift(current)
    current = prev[current.row][current.col]
  }
  if (current && current.row === start.row && current.col === start.col) {
    path.unshift(start)
  }

  return { animations, path: path.length > 1 ? path : [] }
}

export function bfs(grid, start, end) {
  const animations = []
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null))

  const queue = [{ row: start.row, col: start.col }]
  visited[start.row][start.col] = true

  while (queue.length > 0) {
    const { row, col } = queue.shift()

    if (row === end.row && col === end.col) break

    animations.push({ type: 'visit', row, col })

    for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nr = row + dr
      const nc = col + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !grid[nr][nc].isWall) {
        visited[nr][nc] = true
        prev[nr][nc] = { row, col }
        queue.push({ row: nr, col: nc })
      }
    }
  }

  const path = []
  let current = end
  while (current && prev[current.row][current.col]) {
    path.unshift(current)
    current = prev[current.row][current.col]
  }
  if (current && current.row === start.row && current.col === start.col) {
    path.unshift(start)
  }

  return { animations, path: path.length > 1 ? path : [] }
}

export function dfs(grid, start, end) {
  const animations = []
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null))

  const stack = [{ row: start.row, col: start.col }]
  let found = false

  while (stack.length > 0 && !found) {
    const { row, col } = stack.pop()

    if (visited[row][col]) continue
    visited[row][col] = true

    if (row === end.row && col === end.col) {
      found = true
      break
    }

    animations.push({ type: 'visit', row, col })

    for (const [dr, dc] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nr = row + dr
      const nc = col + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !grid[nr][nc].isWall) {
        prev[nr][nc] = { row, col }
        stack.push({ row: nr, col: nc })
      }
    }
  }

  const path = []
  let current = end
  while (current && prev[current.row][current.col]) {
    path.unshift(current)
    current = prev[current.row][current.col]
  }
  if (current && current.row === start.row && current.col === start.col) {
    path.unshift(start)
  }

  return { animations, path: found && path.length > 1 ? path : [] }
}

export function generateMaze(rows, cols) {
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r, col: c, isWall: true, weight: 1,
    }))
  )

  function carve(r, c) {
    grid[r][c].isWall = false
    const dirs = [[-2,0],[2,0],[0,-2],[0,2]].sort(() => Math.random() - 0.5)
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && grid[nr][nc].isWall) {
        grid[r + dr/2][c + dc/2].isWall = false
        carve(nr, nc)
      }
    }
  }

  carve(1, 1)
  return grid
}

export const PATHFINDING_ALGORITHMS = {
  dijkstra: { name: "Dijkstra's Algorithm", fn: dijkstra, weighted: true, description: 'Guarantees shortest path. Explores nodes in order of distance from start.' },
  astar: { name: 'A* Search', fn: aStar, weighted: true, description: 'Uses heuristics to find shortest path faster than Dijkstra.' },
  bfs: { name: 'Breadth-First Search', fn: bfs, weighted: false, description: 'Explores all neighbors at current depth before moving deeper. Guarantees shortest path (unweighted).' },
  dfs: { name: 'Depth-First Search', fn: dfs, weighted: false, description: 'Explores as far as possible along each branch before backtracking. Does NOT guarantee shortest path.' },
}
