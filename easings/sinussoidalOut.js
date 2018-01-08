import sinussoidalIn from './sinussoidalIn'

export default function sinussoidalOut (k) {
  return Math.sin(k * Math.PI / 2)
}

sinussoidalOut.reverse = sinussoidalIn
