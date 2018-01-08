import backOut from './backOut'

export default function backIn (k) {
  var s = 1.70158

  return k * k * ((s + 1) * k - s)
}

backIn.reverse = backOut
