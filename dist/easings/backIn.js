function backOut (k) {
  var s = 1.70158;

  return --k * k * ((s + 1) * k + s) + 1
}

backOut.reverse = backIn;

function backIn (k) {
  var s = 1.70158;

  return k * k * ((s + 1) * k - s)
}

backIn.reverse = backOut;

module.exports = backIn;
