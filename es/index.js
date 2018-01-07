import uptime from 'nanouptime'
import NanoEvents from 'nanoevents'

var lastTime = 0
var tweens = []

function tick(tween, diff) {
  if (!tween.state.isRunning) return
  var progress = tween.state.progress + diff / tween._options.duration
  if (progress > 1) {
    while (progress > 1) {
      tween.complete()
      progress--
    }
  } else {
    tween._rescale(progress)
  }
}

export default function Tween() {
  this._options = {
    id: tweens.length,
    repeats: 1,
    duration: 0,
    easing: null,
    reversed: false,
    enhancers: []
  }

  this.state = {
    isRunning: false,
    current: void 0,
    progress: 0,
    repeats: 0
  }

  this.bus = new NanoEvents()

  tweens.push(this)

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
    this.state.repeats = repeat - 1
    return this
  }

  this.reverse = function(val) {
    this._options.reversed = val !== void 0 ? val : !this._options.reversed
    return this
  }

  this._rescale = function(progress) {
    this.state.progress = progress
    this.state.value = this._options.enhancers.reduce(function(res, cb) {
      return cb(res)
    }, this.state.progress)
    this.bus.emit('update', this.state.value)
  }

  this.start = function() {
    this._rescale(0)
    this.state.isRunning = true
    this.bus.emit('start')
    return this
  }

  this.stop = function() {
    this._rescale(1)
    this.state.isRunning = false
    this.bus.emit('stop')
    return this
  }

  this.complete = function(emit) {
    emit = emit === void 0 ? true : emit
    if (this.state.repeats > 0) {
      this.state.repeats--
      this._rescale(1)
      if (emit) {
        this.bus.emit('step', {
          value: this.state.value,
          remains: this.state.repeats + 1,
          step: this._options.repeats - this.state.repeats - 1
        })
      }
      this._rescale(0)
    } else {
      this.state.isRunning = false
      this._rescale(1)
      if (emit) this.bus.emit('complete')
    }
  }

  this.play = function() {
    this.state.isRunning = true
    this.bus.emit('play')
    return this
  }

  this.pause = function() {
    this.state.isRunning = false
    this.bus.emit('pause')
    return this
  }

  this.on = function(evt, cb) {
    this.bus.on(evt, cb)
    return this
  }

  this.enhance = function(cb) {
    this._options.enhancers.push(cb)
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
