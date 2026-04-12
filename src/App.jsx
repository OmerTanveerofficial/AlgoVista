import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SortingVisualizer from './pages/SortingVisualizer'
import PathfindingVisualizer from './pages/PathfindingVisualizer'
import GraphVisualizer from './pages/GraphVisualizer'

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
        <Route path="/pathfinding" element={<PathfindingVisualizer />} />
        <Route path="/graph" element={<GraphVisualizer />} />
      </Routes>
    </div>
  )
}

export default App
