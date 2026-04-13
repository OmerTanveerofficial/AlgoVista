import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Sorting Algorithms',
    description: 'Visualize Bubble, Selection, Insertion, Merge, Quick, and Heap Sort in real-time with adjustable speed and array size.',
    link: '/sorting',
    icon: '↕',
    gradient: 'from-indigo-500 to-purple-600',
    algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Insertion Sort', 'Selection Sort'],
  },
  {
    title: 'Pathfinding Algorithms',
    description: "Explore Dijkstra's, A*, BFS, and DFS on interactive grids. Draw walls, add weights, and generate mazes.",
    link: '/pathfinding',
    icon: '◇',
    gradient: 'from-cyan-500 to-blue-600',
    algorithms: ["Dijkstra's", 'A* Search', 'BFS', 'DFS'],
  },
  {
    title: 'Graph Algorithms',
    description: "Watch BFS/DFS traversals and Kruskal's/Prim's MST algorithms on interactive node-edge graphs.",
    link: '/graph',
    icon: '⬡',
    gradient: 'from-emerald-500 to-teal-600',
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

      {/* Hero */}
      <section className="relative overflow-hidden py-32 px-4">
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full glass text-sm text-gray-300"
            >
              Interactive Algorithm Visualizer
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
              <span className="gradient-text">AlgoVista</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Watch sorting, pathfinding, and graph algorithms come to life
              through beautiful step-by-step visualization.
            </p>

            <div className="flex gap-4 justify-center flex-wrap mt-10">
              <Link
                to="/sorting"
                className="btn-glow px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark rounded-2xl text-white font-semibold no-underline"
              >
                Start Visualizing
              </Link>
              <a
                href="#features"
                className="px-8 py-3.5 glass rounded-2xl text-gray-300 font-semibold hover:bg-white/10 transition-all no-underline"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 max-w-6xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight"
        >
          What You Can Explore
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={feature.link}
                className="block p-7 glass rounded-3xl card-hover group no-underline h-full"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white mb-5 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.algorithms.map(algo => (
                    <span key={algo} className="text-xs px-2.5 py-1 rounded-lg glass text-gray-400">
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
      <section className="py-24 px-4 max-w-4xl mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
          Time Complexity Reference
        </h2>
        <div className="glass rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left p-5 text-gray-400 font-medium text-sm">Algorithm</th>
                <th className="text-center p-5 text-green-400 font-medium text-sm">Best</th>
                <th className="text-center p-5 text-yellow-400 font-medium text-sm">Average</th>
                <th className="text-center p-5 text-red-400 font-medium text-sm">Worst</th>
              </tr>
            </thead>
            <tbody>
              {complexities.map(row => (
                <tr key={row.algo} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-5 text-white font-medium">{row.algo}</td>
                  <td className="p-5 text-center text-green-400 font-mono text-sm">{row.best}</td>
                  <td className="p-5 text-center text-yellow-400 font-mono text-sm">{row.avg}</td>
                  <td className="p-5 text-center text-red-400 font-mono text-sm">{row.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-white/5 text-center text-gray-500 text-sm relative">
        <p>AlgoVista — Built for learning algorithms through visualization</p>
      </footer>
    </div>
  )
}
