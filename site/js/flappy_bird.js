Math.randomRange = function(min,max) {
  	  return min + (Math.random() * (max-min));
};

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe_system');

var bird = require('./entities/bird');



var FlappyBird = function() {
  var that = this;

  this.entities = [new bird.Bird()];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
  this.pipes = new pipeSystem.PipeSystem(this.entities);

  this.input.on('visibilitychange',function(visible){
    console.log('visibilitychange',visible);
    if(visible) {
      that.graphics.paused = false;
      that.physics.run();
      that.pipes.run();
    } else {
      that.graphics.pause();
      that.physics.pause();
      that.pipes.pause();
    }
  });

  this.pipes.on('pipeadded',function(){ // whenever a pipe is added
    var entities = that.entities;
    entities = entities.filter(function(entity){ //
      return (entity.components.physics.position.x > -2) ? true : false;
    });

    // update all the references to our entities
    that.entities = that.graphics.entities = that.physics.entities = that.input.entities = that.pipes.entities = entities;

    console.log(that.entities.length,that.graphics.entities.length,that.physics.entities.length,that.input.entities.length,that.pipes.entities.length);
  });


};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;
