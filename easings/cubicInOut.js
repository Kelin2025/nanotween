export default function cubicInOut (k) {
  if ((k *= 2) < 1) {
    return 0.5 * k * k * k
  }

  return 0.5 * ((k -= 2) * k * k + 2)
}

cubicInOut.reverse = cubicInOut
