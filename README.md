# csSpriteLite

csSpriteLite is a standalone and light script to animate sprites.

### Tech
Pure javascript, no dependencies to any libraries !

### Installation
```
npm install css-sprite-lite
```

### Example
```
const csSpriteLite = require('csSpriteLite');
 
let sprite = new csSpriteLite({
    anchor : document.getElementById('cssprit-container'),
    url : "sprite.png",
    width  : 184,
    height : 325,
    loop_from : 8,
    ignored_frames : [29, 30],
    interval : 100
});

sprite.play();

<div id="cssprit-container"></div>
```

### Options
* anchor : The dom element you want to display your sprite into. Default is document.body
* url : The file path of your sprite
* width / height : The size of a UNIQUE element in your sprite
* interval : Time (in ms) between to elements of your sprite. Default is 100
* loop_from : Just in case you don't want to loop from the beginning of your sprite (imagine an intro for exemple). Default is 0
* ignored_frames : Array of elements you eventually want to ignore.

### NB
loop_from and ignored_frames options work with frame numbers : for exemple, if you have 8 frames of intro, you should loop from frame 8 (begin with frame 0, same thing for ignored_frames)...


### Methods
```
play()
  Play sprite with passed options. If you paused it, it will resume from current frame.

pause()
  Pause animation on current frame.

```

### Todos
 - Accept coords for ignored_frames and loop_from
 - Write tests, tests, TESTS !
 - Add pause / restart methods

### License
MIT License style, please distribute & credit me somewhere.
 
