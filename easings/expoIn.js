import expoOut from './expoOut'

export default function expoIn (k) {
  return k === 0 ? 0 : Math.pow(1024, k - 1)
}

expoIn.reverse = expoOut
