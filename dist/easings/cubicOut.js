function cubicIn (k) {
  return k * k * k
}

cubicIn.reverse = cubicOut;

function cubicOut (k) {
  return --k * k * k + 1
}

cubicOut.reverse = cubicIn;

module.exports = cubicOut;
