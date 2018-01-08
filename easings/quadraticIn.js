import quadraticOut from './quadraticOut'

export default function quadraticIn (k) {
  return k * k
}

quadraticIn.reverse = quadraticOut
