export default function Group(tweens) {
  var self = this
  Object.keys(tweens[0]).forEach(function(method) {
    if (typeof tweens[0][method] !== 'function') return
    self[method] = function() {
      var args = arguments
      tweens.forEach(function(tween) {
        tween[method].apply(tween, args)
      })
      return self
    }
  })
  self.tweens = tweens
}
