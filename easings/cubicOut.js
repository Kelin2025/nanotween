import cubicIn from './cubicIn'

export default function cubicOut (k) {
  return --k * k * k + 1
}

cubicOut.reverse = cubicIn
