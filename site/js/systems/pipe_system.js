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

  var position = {
    x:1.5,
    y:Math.randomRange(0.25,0.65)
  };

  this.entities.push(new pipe.Pipe(position, true));
            
  position.y += .25;                                                              

  this.entities.push(new pipe.Pipe(position, false));
  
};

exports.PipeSystem = PipeSystem;
