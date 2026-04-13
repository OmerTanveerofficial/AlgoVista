import { useState, useEffect, useRef, useCallback } from 'react'
import { SORTING_ALGORITHMS } from '../algorithms/sorting'

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 20)
}

export default function SortingVisualizer() {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(50)
  const [speed, setSpeed] = useState(50)
  const [algorithm, setAlgorithm] = useState('bubble')
  const [isRunning, setIsRunning] = useState(false)
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [highlights, setHighlights] = useState({})
  const [sortedIndices, setSortedIndices] = useState(new Set())
  const cancelRef = useRef(false)

  const resetArray = useCallback(() => {
    cancelRef.current = true
    setIsRunning(false)
    setComparisons(0)
    setSwaps(0)
    setHighlights({})
    setSortedIndices(new Set())
    setArray(generateArray(arraySize))
  }, [arraySize])

  useEffect(() => { resetArray() }, [resetArray])

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const runSort = async () => {
    cancelRef.current = false
    setIsRunning(true)
    setComparisons(0)
    setSwaps(0)
    setSortedIndices(new Set())

    const algo = SORTING_ALGORITHMS[algorithm]
    const animations = algo.fn([...array])
    const arr = [...array]
    let compCount = 0
    let swapCount = 0
    const sorted = new Set()

    for (const anim of animations) {
      if (cancelRef.current) break
      const delay = Math.max(1, 200 - speed * 2)

      if (anim.type === 'compare') {
        compCount++
        setComparisons(compCount)
        setHighlights({ [anim.indices[0]]: 'compare', [anim.indices[1]]: 'compare' })
        await sleep(delay)
      } else if (anim.type === 'swap') {
        swapCount++
        setSwaps(swapCount)
        setHighlights({ [anim.indices[0]]: 'swap', [anim.indices[1]]: 'swap' })
        ;[arr[anim.indices[0]], arr[anim.indices[1]]] = [arr[anim.indices[1]], arr[anim.indices[0]]]
        setArray([...arr])
        await sleep(delay)
      } else if (anim.type === 'overwrite') {
        swapCount++
        setSwaps(swapCount)
        setHighlights({ [anim.index]: 'swap' })
        arr[anim.index] = anim.value
        setArray([...arr])
        await sleep(delay)
      } else if (anim.type === 'sorted') {
        sorted.add(anim.index)
        setSortedIndices(new Set(sorted))
      } else if (anim.type === 'pivot') {
        setHighlights({ [anim.index]: 'pivot' })
        await sleep(delay)
      }
    }

    setHighlights({})
    setSortedIndices(new Set(Array.from({ length: arr.length }, (_, i) => i)))
    setIsRunning(false)
  }

  const getBarColor = (index) => {
    if (sortedIndices.has(index)) return 'bg-gradient-to-t from-emerald-600 to-emerald-400'
    if (highlights[index] === 'compare') return 'bg-gradient-to-t from-yellow-600 to-yellow-300'
    if (highlights[index] === 'swap') return 'bg-gradient-to-t from-red-700 to-red-400'
    if (highlights[index] === 'pivot') return 'bg-gradient-to-t from-purple-700 to-purple-400'
    return 'bg-gradient-to-t from-indigo-700 to-indigo-400'
  }

  const algoInfo = SORTING_ALGORITHMS[algorithm]

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
            className="bg-white/5 text-white px-4 py-2.5 rounded-xl border border-white/10 focus:border-primary/50 outline-none backdrop-blur-sm appearance-none cursor-pointer"
          >
            {Object.entries(SORTING_ALGORITHMS).map(([key, algo]) => (
              <option key={key} value={key} className="bg-[#0a0a0f]">{algo.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
            <label className="text-gray-400 text-sm font-medium">Size</label>
            <input type="range" min="10" max="150" value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))} disabled={isRunning}
              className="w-24 accent-primary" />
            <span className="text-primary-light text-sm font-mono w-8">{arraySize}</span>
          </div>

          <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
            <label className="text-gray-400 text-sm font-medium">Speed</label>
            <input type="range" min="1" max="100" value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 accent-primary" />
          </div>

          <button onClick={runSort} disabled={isRunning}
            className="btn-glow px-7 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold disabled:opacity-50">
            Visualize
          </button>

          <button onClick={resetArray}
            className="px-7 py-2.5 glass rounded-xl text-gray-300 font-medium hover:bg-white/10 transition-all">
            Reset
          </button>

          <div className="ml-auto flex gap-4">
            <div className="glass rounded-xl px-4 py-2 text-center min-w-[80px]">
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Comparisons</div>
              <div className="text-xl font-mono font-bold text-yellow-400">{comparisons}</div>
            </div>
            <div className="glass rounded-xl px-4 py-2 text-center min-w-[80px]">
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">Swaps</div>
              <div className="text-xl font-mono font-bold text-red-400">{swaps}</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-light" />
            <span className="text-white font-semibold">{algoInfo.name}</span>
          </div>
          <div className="glass rounded-lg px-3 py-1">
            <span className="text-gray-500 text-xs">Time</span>
            <span className="text-yellow-400 font-mono ml-2">{algoInfo.time}</span>
          </div>
          <div className="glass rounded-lg px-3 py-1">
            <span className="text-gray-500 text-xs">Space</span>
            <span className="text-cyan-400 font-mono ml-2">{algoInfo.space}</span>
          </div>
          <div className="text-gray-400 text-xs">{algoInfo.description}</div>
        </div>
      </div>

      {/* Visualization */}
      <div className="glass rounded-3xl p-8 relative">
        <div className="flex items-end justify-center gap-[1px] h-[450px]">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`${getBarColor(idx)} transition-all duration-75 rounded-t-sm shadow-sm`}
              style={{
                height: `${(value / 420) * 100}%`,
                width: `${Math.max(100 / array.length - 0.5, 1)}%`,
              }}
            />
          ))}
        </div>

        <div className="flex justify-center gap-8 mt-6 pt-5 border-t border-white/5">
          {[
            { color: 'bg-indigo-500', label: 'Unsorted' },
            { color: 'bg-yellow-400', label: 'Comparing' },
            { color: 'bg-red-500', label: 'Swapping' },
            { color: 'bg-emerald-500', label: 'Sorted' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-xs text-gray-400 font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
