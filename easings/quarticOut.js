import quarticIn from './quarticIn'

export default function quarticOut (k) {
  return 1 - --k * k * k * k
}

quarticOut.reverse = quarticOut
