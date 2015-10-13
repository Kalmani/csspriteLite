# csSpriteLite

csSpriteLite is a standalone ans light script to animate sprites.

### Version
1.0.0

### Tech
Pure javascript, no dependencies to any libraries !

### Installation
* In pure client side, just take the dist/csSpriteLite.js file and use it as in the exemple.
* You can also use the npm module, require and browserify it.
```
npm install css-sprite-lite
```

### Exemple
```
//////////////////////////
// dist file
<script type="text/javascript" src="csSpriteLite.js">;</script>
// browserified
var csSpriteLite = require('csSpriteLite');
/////////////////////////
 
 
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var sprite = new csSpriteLite({
            anchor : document.getElementById('cssprit-container'),
            url : "sprite.png",
            width  : 184,
            height : 325,
            loop_from : 0, //21
            ignored_frames : [],
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

### Dev mode

Don't forget to rebuild the compiled file if needed :
```sh
$ browserify index.js --standalone csSpriteLite > dist/csSpriteLite.js
```
it AS to be in standalone mode to be used in a non browserified app

You can find this module on npmjs.com :
https://www.npmjs.com/package/css-sprite-lite

### Todos
 - Accept coords for ignored_frames and loop_from
 - Write tests, tests, TESTS !

### License
MIT License style, please distribute & credit me somewhere.
 