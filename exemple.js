var csSpriteLite = require('./index.js');

document.onreadystatechange = function () {
  if (document.readyState == "complete") {

    var sprite = new csSpriteLite({
      anchor : document.getElementById('cssprit-container'),
      sprite : {
        url : "sprite.png",
        element_width  : 450,
        element_height : 400
      },
      loop_from : 21,
      ignored_frames : [62]
    });

    sprite.play();
  }
}
