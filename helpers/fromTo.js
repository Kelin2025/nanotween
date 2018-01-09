function def(from, to, k) {
  return from + (to - from) * k
}

export default function fromTo(from, to, cb) {
  return function(instance) {
    var fn = function(k) {
      return typeof from === 'object'
        ? Object.keys(from).reduce(function(acc, key) {
          acc[key] = fromTo(from[key], to[key])
        }, {})
        : (cb || def)(from, to, k)
    }
    instance.convert(fn)
  }
}
