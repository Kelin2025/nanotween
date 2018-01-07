export default function backOut(k) {
  var s = 1.70158

  return --k * k * ((s + 1) * k + s) + 1
}
