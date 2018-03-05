# csSpriteLite

csSpriteLite is a standalone and light script to animate sprites.

### Version
1.2.0

### Tech
Pure javascript, no dependencies to any libraries !

### Installation
```
npm install css-sprite-lite
```

### Example
```
const csSpriteLite = require('csSpriteLite');
 
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var sprite = new csSpriteLite({
            anchor : document.getElementById('cssprit-container'),
            url : "sprite.png",
            width  : 184,
            height : 325,
            loop_from : 8,
            ignored_frames : [29, 30],
            interval : 100
        });
        sprite.play();
    }
}

<div id="cssprit-container"></div>
```

### Options
* anchor : The dom element you want to display your sprite into
* url : The file path of your sprite
* width / height : The size of a UNIQUE element in your sprite
* interval : Time (in ms) between to elements of your sprite
* loop_from : Just in case you don't want to loop from the beginning of your sprite (imagine an intro for exemple)
* ignored_frames : Array of elements you eventually want to ignore.

### NB
loop_from and ignored_frames options work with frame numbers : for exemple, if you have 8 frames of intro, you should loop from frame 8 (begin with frame 0, same thing for ignored_frames)...

You can find this module on npmjs.com :
https://www.npmjs.com/package/css-sprite-lite

### Todos
 - Accept coords for ignored_frames and loop_from
 - Write tests, tests, TESTS !
 - Add pause / restart methods

### License
MIT License style, please distribute & credit me somewhere.
 
