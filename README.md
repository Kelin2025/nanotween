# NanoTween

~1.5 KB is quite enough for full-featured and comfortable tweening  
![image](https://user-images.githubusercontent.com/4208480/34992412-34f0d6aa-fade-11e7-9352-111f39113387.png)

## Is it small enough?

I made some researches with [bundlephobia](https://bundlephobia.com) and [size-limit](https://github.com/ai/size-limit) and here's what I can say

> **For now, NanoTween core is the smallest tweening core on NPM**

```
library    ¦ size
-----------¦-------
gsap       ¦ 37.0 KB
moofx      ¦  7.4 KB
es6-tween  ¦  6.0 KB
animejs    ¦  5.7 KB
kute       ¦  5.6 KB
tweenr     ¦  4.7 KB
shifty     ¦  4.2 KB
kute       ¦  3.4 KB
tweenjs    ¦  2.9 KB
tweeno     ¦  2.8 KB
anim       ¦  1.1 KB
nanotween  ¦  0.8 KB
```

## Included features

* Easing functions
* Tweening delays
* Chaining and groupping
* Yo-yo effect
* You can start/stop, play/pause, reverse on-fly or force set tweening progress
* Also has IIFE build to include as `<script>` file

## Advantages

* Ultra small size (only **<1KB** core, **1.5KB** with **all** helpers, **<2.5KB** with **all** easings)
* Low-level API lets you easily adapt it to your needs
* Big list of ready-to-use easing functions
* Easings and helpers are separated from core library so you can add only needed functions

## Installation

### From NPM

```
npm install nanotween
yarn add nanotween
```

### From unpckg

```
<script src="https://unpkg.com/nanotween@0.5.0/dist/index.js"></script>
<script src="https://unpkg.com/nanotween@0.5.0/dist/helpers.js"></script>
<script src="https://unpkg.com/nanotween@0.5.0/dist/easings.js"></script>
```

`NanoTween` is available as is.
Helpers are available in `ntHelpers` global variable, easings - in `ntEasings`.  
If you don't need helpers or easings, you can include only core script.

## Complete guide

You can find complete guide and live demos on **[wiki](https://github.com/Kelin2025/nanotween/wiki)**

## Countdown example

Simple countdown timer

```javascript
import NanoTween from 'nanotween'
import { linear } from 'nanotween/easings'

// Start tweening process
const animate = time => {
  requestAnimationFrame(animate)
  NanoTween.update(time)
}
animate(performance.now())

// Duration in seconds
const duration = 10

// Element
const el = document.getElementById('tween')

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

## License

[MIT](https://github.com/Kelin2025/nanotween/blob/master/LICENSE)
