function quadraticIn (k) {
  return k * k
}

quadraticIn.reverse = quadraticOut;

function quadraticOut (k) {
  return k * (2 - k)
}

quadraticOut.reverse = quadraticIn;

module.exports = quadraticOut;
