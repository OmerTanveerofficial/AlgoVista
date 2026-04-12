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

  useEffect(() => {
    resetArray()
  }, [resetArray])

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
    const allSorted = new Set(Array.from({ length: arr.length }, (_, i) => i))
    setSortedIndices(allSorted)
    setIsRunning(false)
  }

  const getBarColor = (index) => {
    if (sortedIndices.has(index)) return 'bg-emerald-500'
    if (highlights[index] === 'compare') return 'bg-yellow-400'
    if (highlights[index] === 'swap') return 'bg-red-500'
    if (highlights[index] === 'pivot') return 'bg-purple-500'
    return 'bg-primary-light'
  }

  const algoInfo = SORTING_ALGORITHMS[algorithm]

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
            {Object.entries(SORTING_ALGORITHMS).map(([key, algo]) => (
              <option key={key} value={key}>{algo.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">Size:</label>
            <input
              type="range"
              min="10"
              max="150"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isRunning}
              className="w-28 accent-primary"
            />
            <span className="text-gray-400 text-sm w-8">{arraySize}</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">Speed:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-28 accent-primary"
            />
          </div>

          <button
            onClick={runSort}
            disabled={isRunning}
            className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50"
          >
            Visualize
          </button>

          <button
            onClick={resetArray}
            className="px-6 py-2 border border-surface-lighter text-gray-300 rounded-lg font-medium hover:bg-surface-lighter/50 transition-all"
          >
            Reset
          </button>

          <div className="ml-auto flex gap-6">
            <div className="text-center">
              <div className="text-xs text-gray-500">Comparisons</div>
              <div className="text-lg font-mono text-yellow-400">{comparisons}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Swaps</div>
              <div className="text-lg font-mono text-red-400">{swaps}</div>
            </div>
          </div>
        </div>

        {/* Algorithm info */}
        <div className="mt-4 pt-4 border-t border-surface-lighter flex flex-wrap gap-6 text-sm">
          <div>
            <span className="text-gray-500">Algorithm:</span>{' '}
            <span className="text-white font-medium">{algoInfo.name}</span>
          </div>
          <div>
            <span className="text-gray-500">Time:</span>{' '}
            <span className="text-yellow-400 font-mono">{algoInfo.time}</span>
          </div>
          <div>
            <span className="text-gray-500">Space:</span>{' '}
            <span className="text-cyan-400 font-mono">{algoInfo.space}</span>
          </div>
          <div className="text-gray-400">{algoInfo.description}</div>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-surface-light rounded-2xl border border-surface-lighter p-6">
        <div className="flex items-end justify-center gap-[1px] h-[450px]">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`${getBarColor(idx)} transition-all duration-75 rounded-t-sm`}
              style={{
                height: `${(value / 420) * 100}%`,
                width: `${Math.max(100 / array.length - 0.5, 1)}%`,
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-surface-lighter">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-primary-light" />
            <span className="text-xs text-gray-400">Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-yellow-400" />
            <span className="text-xs text-gray-400">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-xs text-gray-400">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-xs text-gray-400">Sorted</span>
          </div>
        </div>
      </div>
    </div>
  )
}
