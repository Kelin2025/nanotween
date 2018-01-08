import sinussoidalOut from './sinussoidalOut'

export default function sinussoidalIn (k) {
  return 1 - Math.cos(k * Math.PI / 2)
}

sinussoidalIn.reverse = sinussoidalOut
