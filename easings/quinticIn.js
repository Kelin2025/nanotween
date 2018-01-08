import quinticOut from './quinticOut'

export default function quinticIn (k) {
  return k * k * k * k * k
}

quinticIn.reverse = quinticOut
