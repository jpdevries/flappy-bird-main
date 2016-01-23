var pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.interval = null;
}

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

  var pipeGap = .2;

  var position = {
    x:1.5,
    y:(1 - pipeGap) * Math.random()
  };

  this.entities.push(new pipe.Pipe(position, true));
                                                                          

  this.entities.push(new pipe.Pipe(position, false));
  }
};

exports.PipeSystem = PipeSystem;
