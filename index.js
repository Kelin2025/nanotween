import uptime from 'nanouptime'
import NanoEvents from 'nanoevents'

var lastTime = 0
var tweens = []

export default function Tween() {
  var self = this

  self._options = {
    id: tweens.length,
    delay: 0,
    repeats: 1,
    duration: 0,
    easing: function(x) {
      return x
    },
    reversed: false,
    converters: []
  }

  self.state = {
    isRunning: false,
    current: void 0,
    progress: 0,
    repeats: 0
  }

  function remaining() {
    return {
      progress: self.state.progress,
      value: self.state.value,
      remaining: self.state.repeats + 1,
      completed: self._options.repeats - self.state.repeats - 1
    }
  }

  self.bus = new NanoEvents()

  tweens.push(self)

  self.use = function(enhancer) {
    enhancer(self)
    return self
  }

  self.easing = function(easing) {
    self._options.easing = easing
    return self
  }

  self.duration = function(duration) {
    self._options.duration = duration
    return self
  }

  self.delay = function(delay) {
    self._options.delay = delay
    return self
  }

  self.repeat = function(repeat) {
    self._options.repeats = repeat
    return self
  }

  self.reverse = function(val) {
    self._options.reversed = val !== void 0 ? val : !self._options.reversed
    self.state.progress = 1 - self.state.progress
    return self
  }

  self.on = function(evt, cb) {
    self.bus.on(evt, cb)
    return self
  }

  self.convert = function(cb) {
    self._options.converters.push(cb)
    return self
  }

  self.set = function(progress) {
    if (progress > 1) {
      var times = Math.floor(progress)
      self.complete(times)
      if (!self.state.isRunning) return
      self._rescale(progress - times)
    } else {
      self._rescale(progress)
    }
    return self
  }

  self._rescale = function(progress) {
    self.state.progress = progress
    var easing = self._options.easing
    easing.reverse = easing.reverse || easing
    var value = self._options.reversed
      ? 1 - easing.reverse(self.state.progress)
      : easing(self.state.progress)
    self.state.value = self._options.converters.reduce(function(res, cb) {
      return cb(res)
    }, value)
    self.bus.emit('update', self.state.value)
  }

  self.start = function() {
    self._i = setTimeout(function() {
      self.set(0)
      self.state.repeats = self._options.repeats - 1
      self.state.isRunning = true
      self.bus.emit('start')
    }, self._options.delay)
    return self
  }

  self.stop = function() {
    self.set(1)
    self.state.repeats = 0
    self.state.isRunning = false
    self.bus.emit('stop')
    return self
  }

  self.complete = function(times) {
    self._rescale(1)
    var isStop = self.state.repeats < times
    var ticks = isStop ? self.state.repeats : times
    while (ticks > 0) {
      self.state.repeats--
      self.bus.emit('step', ticks)
      ticks--
    }
    if (isStop) {
      self.state.isRunning = false
      self.bus.emit('complete')
    }
    return self
  }

  self.play = function() {
    self.state.isRunning = true
    self.bus.emit('play', remaining())
    return self
  }

  self.pause = function() {
    self.state.isRunning = false
    self.bus.emit('pause', remaining())
    return self
  }
}

Tween.update = function() {
  if (document.hidden) return
  var now = uptime()
  tweens.forEach(function(tween) {
    if (tween.state.isRunning) {
      tween.set(
        tween.state.progress + (now - lastTime) / tween._options.duration
      )
    }
  })
  lastTime = now
}
