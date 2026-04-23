export const ROUTES = [
  { path: '/',             label: 'Home',        short: 'H', description: 'Landing page' },
  { path: '/sorting',      label: 'Sorting',     short: 'S', description: 'Sorting algorithm visualizer' },
  { path: '/pathfinding',  label: 'Pathfinding', short: 'P', description: 'Grid-based pathfinding visualizer' },
  { path: '/graph',        label: 'Graph',       short: 'G', description: 'Graph traversal visualizer' },
]

export function findRoute(pathname) {
  return ROUTES.find(r => r.path === pathname)
}
