export default function group(tweens) {
  var self = this
  ;['start', 'stop', 'play', 'pause', 'complete'].forEach(function(method) {
    self[method] = function() {
      var args = arguments
      tweens.forEach(function(tween) {
        tween[method].apply(tween, args)
      })
    }
  })
  return self
}
