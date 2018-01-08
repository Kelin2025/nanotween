import circularIn from './circularIn'

export default function circularOut (k) {
  return Math.sqrt(1 - --k * k)
}

circularOut.reverse = circularIn
