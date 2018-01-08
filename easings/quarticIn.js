import quarticOut from './quarticOut'

export default function quarticIn (k) {
  return k * k * k * k
}

quarticIn.reverse = quarticOut
