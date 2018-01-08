function expoInOut (k) {
  if (k === 0) {
    return 0
  }

  if (k === 1) {
    return 1
  }

  if ((k *= 2) < 1) {
    return 0.5 * Math.pow(1024, k - 1)
  }

  return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2)
}

expoInOut.reverse = expoInOut;

module.exports = expoInOut;
