var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');

var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var pipeGap = 0.25;

var FlappyBird = function() {
    var p1Y, p2Y;
    p1Y = p2Y = randomRange(0.25,0.65);

    p1Y += pipeGap;

    this.entities = [new bird.Bird(), new pipe.Pipe(p1Y), new pipe.Pipe(p2Y,true)];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);

    function randomRange(min,max) {
  	  return min + (Math.random() * (max-min));
  	}
};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
};

exports.FlappyBird = FlappyBird;
