export default function(self) {
  self.on('step', function() {
    self.reverse().set(0)
    self.bus.emit('yoyo', self.state.reversed)
  })
  return self
}
