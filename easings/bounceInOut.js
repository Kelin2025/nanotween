import bounceIn from './bounceIn'
import bounceOut from './bounceOut'

export default function bounceInOut(k) {
  if (k < 0.5) {
    return bounceIn(k * 2) * 0.5
  }

  return bounceOut(k * 2 - 1) * 0.5 + 0.5
}
