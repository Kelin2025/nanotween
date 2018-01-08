import elasticOut from './elasticOut'

export default function elasticIn (k) {
  if (k === 0) {
    return 0
  }

  if (k === 1) {
    return 1
  }

  return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI)
}

elasticIn.reverse = elasticOut
