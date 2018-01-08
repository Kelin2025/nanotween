import circularOut from './circularOut'

export default function circularIn (k) {
  return 1 - Math.sqrt(1 - k * k)
}

circularIn.reverse = circularOut
