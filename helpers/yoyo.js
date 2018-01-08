export default function(self) {
  self.on('step', function() {
    self.reverse().set(0)
    self.bus.emit('yoyo', self._options.reversed)
  })
  return self
}
