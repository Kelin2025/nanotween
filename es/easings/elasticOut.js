export default function elasticOut(k) {
  if (k === 0) {
    return 0
  }

  if (k === 1) {
    return 1
  }

  return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1
}
