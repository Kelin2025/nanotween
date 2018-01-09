# NanoTween

1.5 KB is quite enough for full-featured and comfortable tweening  
![image](https://user-images.githubusercontent.com/4208480/34745457-a234e4b4-f5a1-11e7-8565-920006935cb4.png)

## Is it small enough?

I made some researches with bundlephobia and size-limit and I can say that nanotween is the smallest tweening library on NPM.
```
library    ¦ size
-----------¦-------
es6-tween  ¦ 6.0 KB
tweenr     ¦ 4.7 KB
shifty     ¦ 4.2 KB
tweenjs    ¦ 2.9 KB
tweeno     ¦ 2.8 KB
nanotween  ¦ 1.6 KB
```
## Included features

* Easing functions
* Tweening delays
* Chaining and groupping
* Yo-yo effect
* You can start/stop, play/pause, reverse on-fly or force set tweening progress

## Advantages

* Ultra small size (only **<1.5KB** core, **2KB** with all helpers, **<3KB** with all easings)
* Low-level API lets you easily adapt it to your needs
* Big list of ready-to-use easing functions
* Easings and helpers are separated from core library so you can add only needed functions

## Installation

```
npm install nanotween
yarn add nanotween
```

## Countdown example

Simple countdown timer

```javascript
import NanoTween from 'nanotween'
import { linear } from 'nanotween/easings'

// Start tweening process
const animate = () => {
  requestAnimationFrame(animate)
  Nanotween.update()
}
animate()

// Some element and duration in seconds
const el = document.getElementById('tween')
const duration = 10

// Create tween object
const tween = new NanoTween()
  .duration(duration * 1000)
  .repeat(3)
  .easing(linear)
  .on('update', progress => {
    el.innerHTML = (progress * duration).toFixed(2)
  })
  .on('complete', () => alert('Time is over'))

// Start timer
tween.start()
```

![image](https://user-images.githubusercontent.com/4208480/34684662-e8f51e8c-f4b6-11e7-8106-3160aa031259.png)

## Complete guide

You can find complete guide and more examples on **[Wiki](https://github.com/Kelin2025/nanotween/wiki)** page

## License

[MIT](https://github.com/Kelin2025/nanotween/blob/master/LICENSE)
