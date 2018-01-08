import cubicOut from './cubicOut'

export default function cubicIn (k) {
  return k * k * k
}

cubicIn.reverse = cubicOut
