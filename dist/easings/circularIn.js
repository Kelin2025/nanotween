function circularOut (k) {
  return Math.sqrt(1 - --k * k)
}

circularOut.reverse = circularIn;

function circularIn (k) {
  return 1 - Math.sqrt(1 - k * k)
}

circularIn.reverse = circularOut;

module.exports = circularIn;
