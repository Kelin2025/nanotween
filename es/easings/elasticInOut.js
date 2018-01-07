export default function elasticInOut(k) {
  if (k === 0) {
    return 0
  }

  if (k === 1) {
    return 1
  }

  k *= 2

  if (k < 1) {
    return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI)
  }

  return (
    0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1
  )
}
