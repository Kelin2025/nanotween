export default function Chain(tweens) {
  var self = this
  var evts = { start: [], stop: [], step: [], update: [], complete: [] }

  self.current = 0
  self.tweens = tweens

  self.on = function(evt, cb) {
    evts[evt].push(cb)
    return this
  }

  self.start = function() {
    self.stop()
    tweens[0].start()
  }

  self.stop = function() {
    tweens[self.current].stop()
  }

  self.play = function() {
    tweens[self.current].play()
  }

  self.pause = function() {
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
      .on('play', function(meta) {
        evts.play.forEach(function(cb) {
          cb(meta, index)
        })
      })
      .on('pause', function(meta) {
        evts.pause.forEach(function(cb) {
          cb(meta, index)
        })
      })
      .on('update', function(meta) {
        evts.update.forEach(function(cb) {
          cb(meta, index)
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
