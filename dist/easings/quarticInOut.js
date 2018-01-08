function quarticInOut (k) {
  if ((k *= 2) < 1) {
    return 0.5 * k * k * k * k
  }

  return -0.5 * ((k -= 2) * k * k * k - 2)
}

quarticInOut.reverse = quarticInOut;

module.exports = quarticInOut;
