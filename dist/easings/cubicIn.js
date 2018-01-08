function cubicOut (k) {
  return --k * k * k + 1
}

cubicOut.reverse = cubicIn;

function cubicIn (k) {
  return k * k * k
}

cubicIn.reverse = cubicOut;

module.exports = cubicIn;
