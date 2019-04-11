# csSpriteLite

csSpriteLite is a standalone and light script to animate sprites.

### Installation
```
npm install css-sprite-lite
```

### Example
```
const csSpriteLite = require('css-sprite-lite');
 
let sprite = new csSpriteLite({
    anchor : document.getElementById('cssprit-container'),
    url : "sprite.png",
    classname : 'class_1 class_2'
    width  : 184,
    height : 325,
    loop_from : 8,
    ignored_frames : [29, 30],
    interval : 100,
    onLoaded : function(sprite) {
      sprite.goTo(5);
      sprite.play();
      sprite.pauseTo(60);
    }
});


<div id="cssprit-container"></div>
```

### Options
* anchor : The dom element you want to display your sprite into. Default is document.body
* url : The file path of your sprite
* classname : Add passed class to the sprite container
* width / height : The size of a UNIQUE element in your sprite
* interval : Time (in ms) between to elements of your sprite. Default is 100
* loop_from : Just in case you don't want to loop from the beginning of your sprite (imagine an intro for exemple). Default is 0
* ignored_frames : Array of elements you eventually want to ignore.
* onLoaded : Callback used when the source sprite is loaded.

### NB
loop_from and ignored_frames options work with frame numbers : for exemple, if you have 8 frames of intro, you should loop from frame 8 (begin with frame 0, same thing for ignored_frames)...


### Methods
```
play()
  Play sprite with passed options. If you paused it, it will resume from current frame.

pause()
  Pause animation on current frame.

goTo(frame_key)
  Alias of pause method, point to passed frame key.

pauseTo(frame_key)
  Will play untill frame key.

```

### Todos
 - Accept coords for ignored_frames and loop_from
 - Write tests, tests, TESTS !

### License
MIT License style, please distribute & credit me somewhere.
