export default function Chain(tweens) {
  var self = this
  this.current = 0
  var evts = { start: [], stop: [], step: [], complete: [] }

  this.on = function(evt, cb) {
    evts[evt].push(cb)
    return this
  }

  this.start = function() {
    tweens[0].start()
  }

  this.stop = function() {
    tweens[self.current].stop()
  }

  this.play = function() {
    tweens[self.current].play()
  }

  this.pause = function() {
    tweens[self.current].pause()
  }

  tweens[0].on('start', function() {
    evts.start.forEach(function(cb) {
      cb()
    })
  })

  tweens[tweens.length - 1].on('complete', function() {
    evts.complete.forEach(function(cb) {
      cb()
    })
  })

  tweens.forEach(function(tween, index) {
    tween
      .on('start', function() {
        self.current = index
      })
      .on('stop', function() {
        self.current = 0
        evts.stop.forEach(function(cb) {
          cb()
        })
      })
      .on('complete', function() {
        if (index !== tweens.length - 1) {
          tweens[index + 1].start()
          evts.step.forEach(function(cb) {
            cb(index)
          })
        }
      })
  })
}
