function backIn (k) {
  var s = 1.70158;

  return k * k * ((s + 1) * k - s)
}

backIn.reverse = backOut;

function backOut (k) {
  var s = 1.70158;

  return --k * k * ((s + 1) * k + s) + 1
}

backOut.reverse = backIn;

module.exports = backOut;
