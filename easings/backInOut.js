export default function backInOut (k) {
  var s = 1.70158 * 1.525

  if ((k *= 2) < 1) {
    return 0.5 * (k * k * ((s + 1) * k - s))
  }

  return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2)
}

backInOut.reverse = backInOut
