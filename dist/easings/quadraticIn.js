function quadraticOut (k) {
  return k * (2 - k)
}

quadraticOut.reverse = quadraticIn;

function quadraticIn (k) {
  return k * k
}

quadraticIn.reverse = quadraticOut;

module.exports = quadraticIn;
