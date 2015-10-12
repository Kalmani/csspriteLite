var Class    = require('uclass');

var csSpriteLite = new Class({

  Implements : [
    require('uclass/options')
  ],

  initialize : function(options) {

    var self = this;
    self.interval = options.interval || 100;
    self.sprite_opts = options.sprite;
    self.anchor = options.anchor;
    self.loop_from = options.loop_from || 0;
    self.ignored_frames = options.ignored_frames || [];

    self.loop_start_coor = self.current_position = {x : 0, y : 0}
  },

  nextStep : function() {
    var self = this;

    if (self.loop_from == self.frame && !self.loop_flag) {
      self.loop_start_coor = {x : self.current_position.x, y : self.current_position.y};
      self.loop_flag = true;
    }

    self.current_position.x += self.sprite_opts.element_width;
    if (self.img_size.width <= self.current_position.x) 
      self.current_position = {x : 0, y : self.current_position.y + self.sprite_opts.element_height};

    if (self.img_size.height <= self.current_position.y) {
      self.frame = self.loop_from;
      self.current_position = {x : self.loop_start_coor.x, y : self.loop_start_coor.y};
    }

    if (self.ignored_frames.indexOf(self.frame) !== -1)
      self.nextStep();
  },

  setStyles : function(obj, propertyObject) {
   for (var property in propertyObject)
      obj.style[property] = propertyObject[property];
  },

  play : function() {
    var self = this,
        src_img = new Image();

    src_img.onload = function() {
      self.img_size = {
        'width' : this.width,
        'height' : this.height
      };

      var canvas = document.createElement("div");
      canvas.id  = "css-sprite";

      self.setStyles(canvas, {
        "backgroundImage"    : "url('" + self.sprite_opts.url + "')",
        "backgroundRepeat"   : "no-repeat",
        "backgroundPosition" : "0px 0px",
        "width"              : self.sprite_opts.element_width || 200,
        "height"             : self.sprite_opts.element_height || 200
      });

      self.anchor.appendChild(canvas);

      self.frame = 0,
      self.loop_flag = false;

      setInterval(function() {
        self.nextStep();
        self.setStyles(canvas, {
          "backgroundPosition" : "-" + self.current_position.x + "px -" + self.current_position.y + "px"
        });

        self.frame++;
      }, self.interval);
    };
    src_img.src = self.sprite_opts.url;
  }
});

module.exports = csSpriteLite;
