var pipe = require('../entities/pipe');
var EventEmitter = require('events');
var util = require('util');

var PipeSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.interval = null;
  this.pipesPassed = 0;
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
  console.log("Pipe system paused!");
}

PipeSystem.prototype.tick = function() {
  var that = this;
  var position = {
    x:(this.canvas.width / this.canvas.height),
    y:Math.randomRange(0.25,0.65)
  };

  var pipeSetId = (this.entities.length - 1) / 2;

  function createPipe(pipe,position,flipped,id) {
    var pipe = new pipe.Pipe(position, flipped, id);
    pipe.on('passed',function(graphics){
      if(graphics.entity.flip) {
        that.pipesPassed++;
        that.emit('passed',that.pipesPassed);
      }
    });
    return pipe;
  }

  this.entities.push(createPipe(pipe,position, true, pipeSetId));

  position.y += .25;

  this.entities.push(createPipe(pipe,position, false, pipeSetId));

  this.emit('pipeadded');
};

exports.PipeSystem = PipeSystem;
