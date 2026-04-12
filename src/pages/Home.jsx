import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Sorting Algorithms',
    description: 'Visualize Bubble, Selection, Insertion, Merge, Quick, and Heap Sort in real-time with adjustable speed and array size.',
    link: '/sorting',
    icon: '↕',
    color: 'from-indigo-500 to-purple-600',
    algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Insertion Sort', 'Selection Sort'],
  },
  {
    title: 'Pathfinding Algorithms',
    description: "Explore Dijkstra's, A*, BFS, and DFS on interactive grids. Draw walls, add weights, and generate mazes.",
    link: '/pathfinding',
    icon: '◇',
    color: 'from-cyan-500 to-blue-600',
    algorithms: ["Dijkstra's", 'A* Search', 'BFS', 'DFS'],
  },
  {
    title: 'Graph Algorithms',
    description: "Watch BFS/DFS traversals and Kruskal's/Prim's MST algorithms on interactive node-edge graphs.",
    link: '/graph',
    icon: '⬡',
    color: 'from-emerald-500 to-teal-600',
    algorithms: ['BFS', 'DFS', "Kruskal's MST", "Prim's MST"],
  },
]

const complexities = [
  { algo: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' },
  { algo: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)' },
  { algo: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)' },
  { algo: "Dijkstra's", best: 'O(V+E log V)', avg: 'O(V+E log V)', worst: 'O(V²)' },
  { algo: 'A* Search', best: 'O(E)', avg: 'O(E)', worst: 'O(V²)' },
  { algo: "Kruskal's", best: 'O(E log E)', avg: 'O(E log E)', worst: 'O(E log E)' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-light via-accent to-primary-light bg-clip-text text-transparent">
                AlgoVista
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto">
              Interactive Algorithm Visualizer
            </p>
            <p className="text-gray-500 mb-10 max-w-xl mx-auto">
              Watch sorting, pathfinding, and graph algorithms come to life.
              Understand how they work through step-by-step visualization.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/sorting"
                className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all no-underline"
              >
                Start Visualizing
              </Link>
              <a
                href="#features"
                className="px-8 py-3 border border-surface-lighter rounded-xl text-gray-300 font-semibold hover:bg-surface-lighter/50 transition-all no-underline"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          What You Can Explore
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Link
                to={feature.link}
                className="block p-6 bg-surface-light rounded-2xl border border-surface-lighter hover:border-primary/50 transition-all group no-underline h-full"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.algorithms.map(algo => (
                    <span key={algo} className="text-xs px-2 py-1 rounded-md bg-surface-lighter/50 text-gray-400">
                      {algo}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Complexity Table */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Time Complexity Reference
        </h2>
        <div className="bg-surface-light rounded-2xl border border-surface-lighter overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-lighter">
                <th className="text-left p-4 text-gray-400 font-medium">Algorithm</th>
                <th className="text-center p-4 text-green-400 font-medium">Best</th>
                <th className="text-center p-4 text-yellow-400 font-medium">Average</th>
                <th className="text-center p-4 text-red-400 font-medium">Worst</th>
              </tr>
            </thead>
            <tbody>
              {complexities.map(row => (
                <tr key={row.algo} className="border-b border-surface-lighter/50 hover:bg-surface-lighter/30">
                  <td className="p-4 text-white font-medium">{row.algo}</td>
                  <td className="p-4 text-center text-green-400 font-mono text-sm">{row.best}</td>
                  <td className="p-4 text-center text-yellow-400 font-mono text-sm">{row.avg}</td>
                  <td className="p-4 text-center text-red-400 font-mono text-sm">{row.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-surface-lighter text-center text-gray-500 text-sm">
        <p>AlgoVista - Built for learning algorithms through visualization</p>
      </footer>
    </div>
  )
}
