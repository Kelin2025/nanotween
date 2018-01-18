export default function(self, options) {
  self.on('step', function() {
    self.reverse()
    self.state.repeats = options.repeats - self.state.repeats - 1
    self.bus.emit('yoyo', self.state.reversed)
  })
  return self
}
