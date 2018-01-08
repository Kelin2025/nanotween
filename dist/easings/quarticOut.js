function quarticOut (k) {
  return 1 - --k * k * k * k
}

quarticOut.reverse = quarticOut;

module.exports = quarticOut;
