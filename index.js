'use strict';

const deepMixIn = require('mout/object/deepMixIn');
const onRemove  = require('udom/element/onRemove');

class csSpriteLite {

  constructor(options) {
    this.pause   = this.pause.bind(this);
    this.goTo    = this.pause.bind(this);
    this.play    = this.createInterval.bind(this);

    this.pauseTo = (frame) => this.pause_to = frame;

    this.options = {
      url       : null,
      width     : 200,
      height    : 200,
      interval  : 100,
      classname : '',
      anchor    : document.body,
      loop_from : 0,
      onLoaded  : Function.prototype,
      ignored_frames   : []
    };

    this.loop_start_coor  = {x : 0, y : 0};
    this.current_position = {x : 0, y : 0};

    this.pause_to = null;
    this.frame    = null;
    this.canvas   = null;
    this.img_size = null;
    this.interval = null;

    deepMixIn(this.options, (options || {}));

    this.loadSrc();
  }

  loadSrc() {
    var src_img = new Image();

    src_img.onload = (evt) => {
      let src = evt.target;

      this.img_size = {
        width  : src.width,
        height : src.height
      };

      this.canvas = document.createElement('div');

      this.canvas.classList.add('css-sprite');
      this.options.classname.split(' ').forEach((classname) => (classname) ? this.canvas.classList.add(classname) : null);

      this.setStyles(this.canvas, {
        backgroundImage    : `url('${this.options.url}')`,
        backgroundRepeat   : 'no-repeat',
        backgroundPosition : '0px 0px',
        width              : this.options.width || 200,
        height             : this.options.height || 200
      });

      this.options.anchor.appendChild(this.canvas);

      onRemove(this.canvas, this.pause);

      this.frame     = 0;
      this.loop_flag = false;

      this.options.onLoaded(this);
    };

    src_img.src = this.options.url;
  }

  nextStep() {
    if(this.options.loop_from == this.frame && !this.loop_flag) {
      this.loop_start_coor = {x : this.current_position.x, y : this.current_position.y};
      this.loop_flag = true;
    }

    this.current_position.x += this.options.width;

    if(this.img_size.width <= this.current_position.x)
      this.current_position = {x : 0, y : this.current_position.y + this.options.height};

    if(this.img_size.height <= this.current_position.y) {
      this.frame = this.options.loop_from;
      this.current_position = {x : this.loop_start_coor.x, y : this.loop_start_coor.y};
    }

    if(this.options.ignored_frames.indexOf(this.frame) !== -1)
      this.nextStep();
  }

  setStyles(obj, propertyObject) {
    for(var property in propertyObject)
      obj.style[property] = propertyObject[property];
  }

  createInterval() {
    this.interval = setInterval(() => {
      if(this.pause_to && this.frame == this.pause_to)
        return this.pause();

      this.nextStep();
      this.setStyles(this.canvas, {
        backgroundPosition : `-${this.current_position.x}px -${this.current_position.y}px`
      });

      this.frame++;
    }, this.options.interval);
  }

  pause(frame) {
    clearInterval(this.interval);

    this.pause_to = null;

    if(frame !== undefined) {
      this.frame            = 0;
      this.current_position = {x : 0, y : 0};

      for(let i = 0; i <= frame; i++) {
        this.current_position.x += this.options.width;

        if(this.img_size.width <= this.current_position.x)
          this.current_position = {x : 0, y : this.current_position.y + this.options.height};

        this.frame++;
      }

      this.setStyles(this.canvas, {
        backgroundPosition : `-${this.current_position.x}px -${this.current_position.y}px`
      });
    }
  }

}

module.exports = csSpriteLite;
