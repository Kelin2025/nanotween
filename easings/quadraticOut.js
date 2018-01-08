import quadraticIn from './quadraticIn'

export default function quadraticOut (k) {
  return k * (2 - k)
}

quadraticOut.reverse = quadraticIn
