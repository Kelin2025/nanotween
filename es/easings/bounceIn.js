import bounceOut from './bounceOut'

export default function bounceIn(k) {
  return 1 - bounceOut(1 - k)
}
