function sinussoidalIn (k) {
  return 1 - Math.cos(k * Math.PI / 2)
}

sinussoidalIn.reverse = sinussoidalOut;

function sinussoidalOut (k) {
  return Math.sin(k * Math.PI / 2)
}

sinussoidalOut.reverse = sinussoidalIn;

module.exports = sinussoidalOut;
