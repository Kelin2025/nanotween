export default function sinussoidalInOut (k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}

sinussoidalInOut.reverse = sinussoidalInOut
