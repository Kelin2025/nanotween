export default function expoOut(k) {
  return k === 1 ? 1 : 1 - Math.pow(2, -10 * k)
}
