"use strict";

var Class    = require('uclass');
var onRemove = require('udom/element/onRemove');

var csSpriteLite = new Class({
  Binds : ['stop'],

  Implements : [
    require('uclass/options')
  ],

  options : {
    url : null,
    width : 200,
    height : 200,
    interval : 100,
    anchor : document.body,
    loop_from : 0,
    ignored_frames : [],
    loop_start_coor : {
      x : 0, y : 0
    },
    current_position : {
      x : 0, y : 0
    }
  },

  interval : null,

  initialize : function(options) {
    var self = this;
    self.setOptions(options);
  },

  nextStep : function() {
    var self = this;

    if (self.options.loop_from == self.frame && !self.loop_flag) {
      self.options.loop_start_coor = {x : self.options.current_position.x, y : self.options.current_position.y};
      self.loop_flag = true;
    }

    self.options.current_position.x += self.options.width;
    if (self.img_size.width <= self.options.current_position.x) 
      self.options.current_position = {x : 0, y : self.options.current_position.y + self.options.height};

    if (self.img_size.height <= self.options.current_position.y) {
      self.frame = self.options.loop_from;
      self.options.current_position = {x : self.options.loop_start_coor.x, y : self.options.loop_start_coor.y};
    }

    if (self.options.ignored_frames.indexOf(self.frame) !== -1)
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
        "backgroundImage"    : "url('" + self.options.url + "')",
        "backgroundRepeat"   : "no-repeat",
        "backgroundPosition" : "0px 0px",
        "width"              : self.options.width || 200,
        "height"             : self.options.height || 200
      });

      self.options.anchor.appendChild(canvas);
      onRemove(canvas, self.stop);
      self.frame = 0,
      self.loop_flag = false;

      self.interval = setInterval(function() {
        self.nextStep();
        self.setStyles(canvas, {
          "backgroundPosition" : "-" + self.options.current_position.x + "px -" + self.options.current_position.y + "px"
        });

        self.frame++;
      }, self.options.interval);
    };
    src_img.src = self.options.url;
  },

  stop : function() {
    var self = this;
    clearInterval(self.interval);
  }

});

module.exports = csSpriteLite;
