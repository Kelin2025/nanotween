# NanoTween

1.5 KB is quite enough for comfortable tweening  
![image](https://user-images.githubusercontent.com/4208480/34684747-27532bc4-f4b7-11e7-9387-bc4e87ad0eab.png)

## Included features

* Easing functions
* Chaining and groupping
* Yo-yo effect
* You can start/stop, play/pause, reverse on-fly or force set tweening progress

## Advantages

* Ultra small size (only **<1.5KB** core, **<2KB** with all helpers, **<3KB** with all easings)
* Low-leveled API lets you easily adapt it to your needs
* Big list of ready-to-use easing functions.
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
