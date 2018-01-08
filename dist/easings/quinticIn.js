function quinticOut (k) {
  return --k * k * k * k * k + 1
}

quinticOut.reverse = quinticIn;

function quinticIn (k) {
  return k * k * k * k * k
}

quinticIn.reverse = quinticOut;

module.exports = quinticIn;
