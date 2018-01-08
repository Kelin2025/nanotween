import quinticIn from './quinticIn'

export default function quinticOut (k) {
  return --k * k * k * k * k + 1
}

quinticOut.reverse = quinticIn
