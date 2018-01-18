import NanoEvents from 'nanoevents'

var lastTime = 0
var tweens = []

export default function Tween() {
  var self = this

  var _options = {
    delay: 0,
    repeats: 1,
    duration: 0,
    easing: function(x) {
      return x
    },
    converters: []
  }

  function remaining(end) {
    var res = {
      progress: self.state.progress,
      progressMatched: self.state.progressMatched,
      value: self.state.value,
      remaining: self.state.repeats,
      completed: _options.repeats - self.state.repeats
    }
    res.completedTime =
      res.completed * _options.duration +
      _options.duration * (end ? res.progress - 1 : res.progress)
    res.remainingTime = _options.repeats * _options.duration - res.completedTime
    return res
  }

  function processProgress(progress) {
    self.state.progress = progress
    self.state.progressMatched = self.state.reversed
      ? 1 - (_options.easing.reverse || _options.easing)(self.state.progress)
      : _options.easing(self.state.progress)
  }

  function _rescale(progress, end) {
    processProgress(progress)
    self.state.value = _options.converters.reduce(function(res, cb) {
      return cb(res, self.state.progressMatched)
    }, self.state.progressMatched)
    self.bus.emit('update', self.state.value, remaining(end))
  }

  self.state = {
    id: tweens.length,
    isRunning: false,
    isRemoved: false,
    progress: 0,
    progressMatched: 0,
    reversed: false,
    repeats: 0
  }

  self.bus = new NanoEvents()

  tweens.push(self)

  self.use = function(enhancer) {
    enhancer(self, _options)
    return self
  }

  self.easing = function(easing) {
    _options.easing = easing
    return self
  }

  self.duration = function(duration) {
    _options.duration = duration
    return self
  }

  self.delay = function(delay) {
    _options.delay = delay
    return self
  }

  self.repeat = function(repeat) {
    _options.repeats = repeat
    return self
  }

  self.reverse = function(val) {
    self.state.reversed = val !== void 0 ? val : !self.state.reversed
    processProgress(1 - self.state.progress)
    if (self.state.isRunning) {
      self.bus.emit('reverse', remaining(), self.state.isRunning)
      self.state.repeats = _options.repeats - self.state.repeats - 1
    }
    return self
  }

  self.on = function(evt, cb) {
    self.bus.on(evt, cb)
    return self
  }

  self.convert = function(cb) {
    _options.converters.push(cb)
    return self
  }

  self.set = function(progress) {
    if (progress > 1) {
      var times = Math.floor(progress)
      self.complete(times)
      if (!self.state.isRunning) return
      _rescale(progress - times)
    } else {
      _rescale(progress)
    }
    return self
  }

  self.tick = function(time) {
    self.set(self.state.progress + time / _options.duration)
  }

  self.start = function() {
    self._i = setTimeout(function() {
      self.state.repeats = _options.repeats
      self.set(0)
      self.state.isRunning = true
      self.bus.emit('start')
    }, _options.delay)
    return self
  }

  self.stop = function() {
    self.set(1)
    self.state.repeats = 0
    self.state.isRunning = false
    self.bus.emit('stop')
    return self
  }

  self.remove = function() {
    if (self.state.isRemoved) return
    tweens.splice(
      tweens.findIndex(function(t) {
        return self.state.id === t.state.id
      }),
      1
    )
    self.state.isRemoved = true
  }

  self.complete = function(times) {
    var isStop = self.state.repeats <= times
    var ticks = isStop ? self.state.repeats : times
    while (ticks > 0) {
      self.state.repeats--
      _rescale(1, true)
      self.bus.emit('step', ticks, remaining())
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

Tween.update = function(now) {
  if (document.hidden) return
  tweens.forEach(function(tween) {
    if (tween.state.isRunning) {
      tween.tick(now - lastTime)
    }
  })
  lastTime = now
}
