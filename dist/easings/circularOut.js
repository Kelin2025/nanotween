function circularIn (k) {
  return 1 - Math.sqrt(1 - k * k)
}

circularIn.reverse = circularOut;

function circularOut (k) {
  return Math.sqrt(1 - --k * k)
}

circularOut.reverse = circularIn;

module.exports = circularOut;
