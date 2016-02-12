var EventEmitter = require('events');
var util = require('util');
var settings = require('../settings');

var started = false;

var InputSystem = function(entities) {
    this.entities = entities;
    var that = this;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');

    var visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      visibilityChange = "webkitvisibilitychange";
    }

    this.waiting = setInterval(function(){
      console.log("fake flap!");
      that.onClick();
    }, 1000);   

    document.body.addEventListener('click', function(){
      clearInterval(that.waiting);
    });

    document.addEventListener(visibilityChange, this.handleVisibilityChange.bind(this), false);
};

util.inherits(InputSystem, EventEmitter);

InputSystem.prototype.run = function() {
    document.body.addEventListener('click', this.onClick.bind(this));
    document.body.addEventListener('keydown', this.onkeydown.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = settings.lift;
};

InputSystem.prototype.onkeydown = function(e) {
  if(!started) {var started = true;
    this.emit('Started');
    console.log(started);
    var started = true;
  }
  

  clearInterval(this.waiting);

	if (e.keyCode ==32) {
		var bird = this.entities[0];
		bird.components.physics.velocity.y = settings.lift;
	}
  //if 'p' key is pressed, pause the game
  else if (e.keyCode ==80) {
    this.emit('Paused');
  }
};



InputSystem.prototype.handleVisibilityChange = function() {
  var hidden;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
  }

  if (document[hidden]) {
    this.emit('visibilitychange',false);
  } else {
    this.emit('visibilitychange',true);
  }
};

exports.InputSystem = InputSystem;