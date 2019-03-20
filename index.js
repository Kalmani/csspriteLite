'use strict';

const deepMixIn = require('mout/object/deepMixIn');
const onRemove  = require('udom/element/onRemove');

class csSpriteLite {

  constructor(options) {
    this.stop = this.stop.bind(this);

    this.options = {
      url       : null,
      width     : 200,
      height    : 200,
      interval  : 100,
      anchor    : document.body,
      loop_from : 0,
      ignored_frames   : [],
      loop_start_coor  : {
        x : 0, y : 0
      },
      current_position : {
        x : 0, y : 0
      }
    };

    this.interval = null;

    deepMixIn(this.options, (options || {}));
  }

  nextStep() {
    if(this.options.loop_from == this.frame && !this.loop_flag) {
      this.options.loop_start_coor = {x : this.options.current_position.x, y : this.options.current_position.y};
      this.loop_flag = true;
    }

    this.options.current_position.x += this.options.width;

    if(this.img_size.width <= this.options.current_position.x)
      this.options.current_position = {x : 0, y : this.options.current_position.y + this.options.height};

    if(this.img_size.height <= this.options.current_position.y) {
      this.frame = this.options.loop_from;
      this.options.current_position = {x : this.options.loop_start_coor.x, y : this.options.loop_start_coor.y};
    }

    if(this.options.ignored_frames.indexOf(this.frame) !== -1)
      this.nextStep();
  }

  setStyles(obj, propertyObject) {
    for(var property in propertyObject)
      obj.style[property] = propertyObject[property];
  }

  play() {
    var src_img = new Image();
    var self    = this;

    src_img.onload = function() {
      self.img_size = {
        width  : this.width,
        height : this.height
      };

      var canvas = document.createElement('div');

      canvas.id  = 'css-sprite';

      self.setStyles(canvas, {
        backgroundImage    : `url('${self.options.url}')`,
        backgroundRepeat   : 'no-repeat',
        backgroundPosition : '0px 0px',
        width              : self.options.width || 200,
        height             : self.options.height || 200
      });

      self.options.anchor.appendChild(canvas);
      onRemove(canvas, self.stop);
      self.frame     = 0;
      self.loop_flag = false;

      self.interval = setInterval(() => {
        self.nextStep();
        self.setStyles(canvas, {
          backgroundPosition : `-${self.options.current_position.x}px -${self.options.current_position.y}px`
        });

        self.frame++;
      }, self.options.interval);
    };

    src_img.src = this.options.url;
  }

  stop() {
    clearInterval(this.interval);
  }

}

module.exports = csSpriteLite;
