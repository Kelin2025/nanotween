function sinussoidalOut (k) {
  return Math.sin(k * Math.PI / 2)
}

sinussoidalOut.reverse = sinussoidalIn;

function sinussoidalIn (k) {
  return 1 - Math.cos(k * Math.PI / 2)
}

sinussoidalIn.reverse = sinussoidalOut;

module.exports = sinussoidalIn;
