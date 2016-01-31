var EventEmitter = require('events');
var util = require('util');
var settings = require('../settings');

var InputSystem = function(entities) {
    this.entities = entities;

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

	if (e.keyCode ==32) {
		var bird = this.entities[0];
		bird.components.physics.velocity.y = settings.lift;
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
