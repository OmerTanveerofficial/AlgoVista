export function bubbleSort(array) {
  const animations = []
  const arr = [...array]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', indices: [j, j + 1] })
      if (arr[j] > arr[j + 1]) {
        animations.push({ type: 'swap', indices: [j, j + 1] })
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    animations.push({ type: 'sorted', index: n - i - 1 })
  }
  animations.push({ type: 'sorted', index: 0 })
  return animations
}

export function selectionSort(array) {
  const animations = []
  const arr = [...array]
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < n; j++) {
      animations.push({ type: 'compare', indices: [minIdx, j] })
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }
    if (minIdx !== i) {
      animations.push({ type: 'swap', indices: [i, minIdx] })
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
    animations.push({ type: 'sorted', index: i })
  }
  animations.push({ type: 'sorted', index: n - 1 })
  return animations
}

export function insertionSort(array) {
  const animations = []
  const arr = [...array]
  const n = arr.length

  animations.push({ type: 'sorted', index: 0 })
  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1
    animations.push({ type: 'compare', indices: [i, j] })

    while (j >= 0 && arr[j] > key) {
      animations.push({ type: 'swap', indices: [j, j + 1] })
      arr[j + 1] = arr[j]
      j--
      if (j >= 0) animations.push({ type: 'compare', indices: [j, j + 1] })
    }
    arr[j + 1] = key
    animations.push({ type: 'sorted', index: i })
  }
  return animations
}

export function mergeSort(array) {
  const animations = []
  const arr = [...array]

  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      animations.push({ type: 'compare', indices: [left + i, mid + 1 + j] })
      if (leftArr[i] <= rightArr[j]) {
        animations.push({ type: 'overwrite', index: k, value: leftArr[i] })
        arr[k] = leftArr[i]
        i++
      } else {
        animations.push({ type: 'overwrite', index: k, value: rightArr[j] })
        arr[k] = rightArr[j]
        j++
      }
      k++
    }
    while (i < leftArr.length) {
      animations.push({ type: 'overwrite', index: k, value: leftArr[i] })
      arr[k] = leftArr[i]
      i++
      k++
    }
    while (j < rightArr.length) {
      animations.push({ type: 'overwrite', index: k, value: rightArr[j] })
      arr[k] = rightArr[j]
      j++
      k++
    }
  }

  function sort(left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      sort(left, mid)
      sort(mid + 1, right)
      merge(left, mid, right)
    }
  }

  sort(0, arr.length - 1)
  for (let i = 0; i < arr.length; i++) {
    animations.push({ type: 'sorted', index: i })
  }
  return animations
}

export function quickSort(array) {
  const animations = []
  const arr = [...array]

  function partition(low, high) {
    const pivot = arr[high]
    animations.push({ type: 'pivot', index: high })
    let i = low - 1

    for (let j = low; j < high; j++) {
      animations.push({ type: 'compare', indices: [j, high] })
      if (arr[j] < pivot) {
        i++
        if (i !== j) {
          animations.push({ type: 'swap', indices: [i, j] })
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
      }
    }
    animations.push({ type: 'swap', indices: [i + 1, high] })
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    animations.push({ type: 'sorted', index: i + 1 })
    return i + 1
  }

  function sort(low, high) {
    if (low < high) {
      const pi = partition(low, high)
      sort(low, pi - 1)
      sort(pi + 1, high)
    } else if (low === high) {
      animations.push({ type: 'sorted', index: low })
    }
  }

  sort(0, arr.length - 1)
  return animations
}

export function heapSort(array) {
  const animations = []
  const arr = [...array]
  const n = arr.length

  function heapify(size, root) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size) {
      animations.push({ type: 'compare', indices: [left, largest] })
      if (arr[left] > arr[largest]) largest = left
    }
    if (right < size) {
      animations.push({ type: 'compare', indices: [right, largest] })
      if (arr[right] > arr[largest]) largest = right
    }
    if (largest !== root) {
      animations.push({ type: 'swap', indices: [root, largest] })
      ;[arr[root], arr[largest]] = [arr[largest], arr[root]]
      heapify(size, largest)
    }
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'swap', indices: [0, i] })
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    animations.push({ type: 'sorted', index: i })
    heapify(i, 0)
  }
  animations.push({ type: 'sorted', index: 0 })
  return animations
}

export const SORTING_ALGORITHMS = {
  bubble: { name: 'Bubble Sort', fn: bubbleSort, time: 'O(n²)', space: 'O(1)', description: 'Repeatedly swaps adjacent elements if they are in the wrong order.' },
  selection: { name: 'Selection Sort', fn: selectionSort, time: 'O(n²)', space: 'O(1)', description: 'Finds the minimum element and places it at the beginning.' },
  insertion: { name: 'Insertion Sort', fn: insertionSort, time: 'O(n²)', space: 'O(1)', description: 'Builds the sorted array one element at a time by inserting each element into its correct position.' },
  merge: { name: 'Merge Sort', fn: mergeSort, time: 'O(n log n)', space: 'O(n)', description: 'Divides the array in half, sorts each half, then merges them back together.' },
  quick: { name: 'Quick Sort', fn: quickSort, time: 'O(n log n)', space: 'O(log n)', description: 'Picks a pivot element and partitions the array around it.' },
  heap: { name: 'Heap Sort', fn: heapSort, time: 'O(n log n)', space: 'O(1)', description: 'Builds a max heap, then repeatedly extracts the maximum element.' },
}
