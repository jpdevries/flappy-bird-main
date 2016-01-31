Math.randomRange = function(min,max) {
  	  return min + (Math.random() * (max-min));
};

Math.degreesToRadians = function(degrees) {
  return degrees * Math.PI / 180;
}

Math.radiansToDegrees = function(radians) {
  return radians * 180 / Math.PI;
}

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe_system');

var bird = require('./entities/bird');
var settings = require('./settings');

var FlappyBird = function() {
  var that = this;

  this.gameOver = false;
  this.score = 0;

  this.entities = [new bird.Bird()];
  this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
  this.pipes = new pipeSystem.PipeSystem(this.entities);

  this.pipes.on('passed',function(score){
    that.score = score;
    if(!that.gameOver) console.log(score);
  });

  this.graphics.on('collision',function(){
    if(!that.gameOver) {
      console.log('gameOver you got ' + that.score);
    }
    that.gameOver = true;

    if(that.gameOver) {
      that.graphics.pause();
      that.physics.pause();
      that.pipes.pause();
    }

  });

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
      return (entity.components.physics.position.x > -(that.graphics.canvas.width / that.graphics.canvas.height)) ? true : false;
    });

    // update all the references to our entities
    that.entities = that.graphics.entities = that.physics.entities = that.input.entities = that.pipes.entities = entities;
  });


};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;
