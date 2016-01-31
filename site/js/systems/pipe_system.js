var pipe = require('../entities/pipe');
var EventEmitter = require('events');
var util = require('util');

var PipeSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.interval = null;
}

util.inherits(PipeSystem, EventEmitter);

PipeSystem.prototype.run = function() {
  this.tick();
  this.interval = window.setInterval(this.tick.bind(this),2000);
};

PipeSystem.prototype.pause = function() {
  if(this.interval != null) {
    window.clearInterval(this.interval);
    this.interval = null;
  }
}

PipeSystem.prototype.tick = function() {

  var position = {
    x:(this.canvas.width / this.canvas.height),
    y:Math.randomRange(0.25,0.65)
  };

  this.entities.push(new pipe.Pipe(position, true));

  position.y += .25;

  this.entities.push(new pipe.Pipe(position, false));

  this.emit('pipeadded');
};

exports.PipeSystem = PipeSystem;
