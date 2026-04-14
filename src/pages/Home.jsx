import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Sorting Algorithms',
    description: 'Visualize Bubble, Selection, Insertion, Merge, Quick, and Heap Sort in real-time with adjustable speed and array size.',
    link: '/sorting',
    algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Insertion Sort', 'Selection Sort'],
  },
  {
    title: 'Pathfinding Algorithms',
    description: "Explore Dijkstra's, A*, BFS, and DFS on interactive grids. Draw walls, add weights, and generate mazes.",
    link: '/pathfinding',
    algorithms: ["Dijkstra's", 'A* Search', 'BFS', 'DFS'],
  },
  {
    title: 'Graph Algorithms',
    description: "Watch BFS/DFS traversals and Kruskal's/Prim's MST algorithms on interactive node-edge graphs.",
    link: '/graph',
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
    <div className="min-h-screen relative">
      {/* Ambient glow blobs */}
      <div className="glow-blob glow-blob-1" />
      <div className="glow-blob glow-blob-2" />
      <div className="glow-blob glow-blob-3" />

      {/* Hero — full viewport height */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center px-6">
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-8 px-5 py-2 rounded-full glass text-sm text-gray-300 tracking-wide"
            >
              Interactive Algorithm Visualizer
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
              <span className="gradient-text">AlgoVista</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
              Watch sorting, pathfinding, and graph algorithms come to life
              through beautiful step-by-step visualization.
            </p>

            <div className="flex gap-5 justify-center flex-wrap">
              <Link
                to="/sorting"
                className="btn-glow px-12 py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-2xl text-white font-bold text-lg no-underline shadow-[0_0_30px_rgba(99,102,241,0.4)]"
              >
                Start Visualizing
              </Link>
              <a
                href="#features"
                className="px-12 py-5 rounded-2xl text-white font-semibold text-lg border border-white/20 bg-white/10 hover:bg-white/15 hover:border-white/30 backdrop-blur-sm transition-all no-underline"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6 max-w-6xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl md:text-5xl font-bold text-center text-white mb-20 tracking-tight"
        >
          What You Can Explore
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={feature.link}
                className="block p-8 glass rounded-3xl card-hover group no-underline h-full"
              >
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.algorithms.map(algo => (
                    <span key={algo} className="text-xs px-3 py-1.5 rounded-lg glass text-gray-400">
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
      <section className="py-32 px-6 max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-20 tracking-tight">
          Time Complexity Reference
        </h2>
        <div className="glass rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left p-6 text-gray-400 font-medium text-sm uppercase tracking-wider">Algorithm</th>
                <th className="text-center p-6 text-green-400 font-medium text-sm uppercase tracking-wider">Best</th>
                <th className="text-center p-6 text-yellow-400 font-medium text-sm uppercase tracking-wider">Average</th>
                <th className="text-center p-6 text-red-400 font-medium text-sm uppercase tracking-wider">Worst</th>
              </tr>
            </thead>
            <tbody>
              {complexities.map(row => (
                <tr key={row.algo} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-6 text-white font-medium">{row.algo}</td>
                  <td className="p-6 text-center text-green-400 font-mono text-sm">{row.best}</td>
                  <td className="p-6 text-center text-yellow-400 font-mono text-sm">{row.avg}</td>
                  <td className="p-6 text-center text-red-400 font-mono text-sm">{row.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 text-center text-gray-500 text-sm relative">
        <p>AlgoVista — Built for learning algorithms through visualization</p>
      </footer>
    </div>
  )
}
