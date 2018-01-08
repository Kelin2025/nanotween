import uptime from 'nanouptime'
import NanoEvents from 'nanoevents'

var lastTime = 0
var tweens = []

function tick(tween, diff) {
  if (!tween.state.isRunning) return
  var progress = tween.state.progress + diff / tween._options.duration
  if (progress > 1) {
    while (progress > 1) {
      if (!tween.state.isRunning) return
      tween.complete()
      progress--
    }
  } else {
    tween.set(progress)
  }
}

export default function Tween() {
  this._options = {
    id: tweens.length,
    repeats: 1,
    duration: 0,
    easing: function(x) {
      return x
    },
    reversed: false,
    converters: []
  }

  this.state = {
    isRunning: false,
    current: void 0,
    progress: 0,
    repeats: 0
  }

  var self = this

  function remaining() {
    return {
      progress: self.state.progress,
      value: self.state.value,
      remaining: self.state.repeats + 1,
      completed: self._options.repeats - self.state.repeats - 1
    }
  }

  this.bus = new NanoEvents()

  tweens.push(this)

  this.use = function(enhancer) {
    enhancer(this)
    return this
  }

  this.easing = function(easing) {
    this._options.easing = easing
    return this
  }

  this.duration = function(duration) {
    this._options.duration = duration
    return this
  }

  this.repeat = function(repeat) {
    this._options.repeats = repeat
    return this
  }

  this.reverse = function(val) {
    this._options.reversed = val !== void 0 ? val : !this._options.reversed
    this.state.progress = 1 - this.state.progress
    return this
  }

  this.on = function(evt, cb) {
    this.bus.on(evt, cb)
    return this
  }

  this.convert = function(cb) {
    this._options.converters.push(cb)
    return this
  }

  this.set = function(progress) {
    this.state.progress = progress
    var easing = this._options.easing
    easing.reverse = easing.reverse || easing
    var value = this._options.reversed
      ? 1 - easing.reverse(this.state.progress)
      : easing(this.state.progress)
    this.state.value = this._options.converters.reduce(function(res, cb) {
      return cb(res)
    }, value)
    this.bus.emit('update', this.state.value)
  }

  this.start = function() {
    this.set(0)
    this.state.repeats = this._options.repeats - 1
    this.state.isRunning = true
    this.bus.emit('start')
    return this
  }

  this.stop = function() {
    this.set(1)
    this.state.repeats = 0
    this.state.isRunning = false
    this.bus.emit('stop')
    return this
  }

  this.complete = function() {
    if (this.state.repeats > 0) {
      this.state.repeats--
      this.set(1)
      setTimeout(function() {
        self.bus.emit('step', remaining())
        self.set(0)
      }, 0)
    } else {
      this.state.isRunning = false
      this.set(1)
      setTimeout(function() {
        self.bus.emit('complete')
      }, 0)
    }
  }

  this.play = function() {
    this.state.isRunning = true
    this.bus.emit('play', remaining())
    return this
  }

  this.pause = function() {
    this.state.isRunning = false
    this.bus.emit('pause', remaining())
    return this
  }
}

Tween.update = function() {
  var now = uptime()
  tweens.forEach(function(tween) {
    if (tween.state.isRunning) tick(tween, now - lastTime)
  })
  lastTime = now
}
