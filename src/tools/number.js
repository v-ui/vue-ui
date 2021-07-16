const range = function(start = 0, end = 10, step = 1) {
  let length = Math.floor(Math.abs(end - start) / step) + 1
  return Array.from({length: length}, (e, index) => Number(start) + step * index)
}

export default {
  range,
}
