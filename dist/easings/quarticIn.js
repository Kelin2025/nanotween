function quarticOut (k) {
  return 1 - --k * k * k * k
}

quarticOut.reverse = quarticOut;

function quarticIn (k) {
  return k * k * k * k
}

quarticIn.reverse = quarticOut;

module.exports = quarticIn;
