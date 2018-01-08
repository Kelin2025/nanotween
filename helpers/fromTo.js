export default function fromTo(from, to) {
  return function(instance) {
    var fn = function(k) {
      switch (typeof from) {
        case 'number':
          return from + (to - from) * k
        case 'object':
          return Object.keys.reduce(function(acc, key) {
            acc[key] = fromTo(from[key], to[key])
          }, {})
        default:
          return from
      }
    }
    instance.enhance(fn)
  }
}
