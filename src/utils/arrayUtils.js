export function uniqueArray(arr) {
  return [...new Set(arr)]
}

export function chunkArray(arr, size) {
  return arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    [],
  )
}
