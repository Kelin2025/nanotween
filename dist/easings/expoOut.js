function expoIn (k) {
  return k === 0 ? 0 : Math.pow(1024, k - 1)
}

expoIn.reverse = expoOut;

function expoOut (k) {
  return k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
}

expoOut.reverse = expoIn;

module.exports = expoOut;
