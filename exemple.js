var csSpriteLite = require('./index.js');

document.onreadystatechange = function () {
  if (document.readyState == "complete") {

    var sprite = new csSpriteLite({
      anchor : document.getElementById('cssprit-container'),
      sprite : {
        url : "sprite.png",
        element_width  : 184, //450
        element_height : 325 //450
      },
      loop_from : 0, //21
      ignored_frames : [], //62?
      interval : 100
    });

    sprite.play();
  }
}
