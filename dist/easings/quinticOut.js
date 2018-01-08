function quinticIn (k) {
  return k * k * k * k * k
}

quinticIn.reverse = quinticOut;

function quinticOut (k) {
  return --k * k * k * k * k + 1
}

quinticOut.reverse = quinticIn;

module.exports = quinticOut;
