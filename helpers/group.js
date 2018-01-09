export default function group(tweens) {
  var self = this
  Object.keys(tweens[0]).forEach(function(method) {
    if (typeof method !== 'function') return
    self[method] = function() {
      var args = arguments
      tweens.forEach(function(tween) {
        tween[method].apply(tween, args)
      })
    }
  })
  return self
}
