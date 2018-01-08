function bounceOut (k) {
  if (k < 1 / 2.75) {
    return 7.5625 * k * k
  } else if (k < 2 / 2.75) {
    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75
  } else if (k < 2.5 / 2.75) {
    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375
  } else {
    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375
  }
}

bounceOut.reverse = bounceIn;

function bounceIn (k) {
  return 1 - bounceOut(1 - k)
}

bounceIn.reverse = bounceOut;

module.exports = bounceIn;
