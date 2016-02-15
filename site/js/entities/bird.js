var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var settings = require("../settings");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.50;
    physics.acceleration.y = -settings.gravity || -0.75;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);

    this.scores = [];
    this.t = 0;
    this.freq = 0.0375;
    this.distance = 0.05;
    this.hovering = true;

    this.components = {
    	physics: physics,
    	graphics: graphics
    };

    window.requestAnimationFrame(this.tick.bind(this));
};

Bird.prototype.tick = function() {

  this.t += this.freq;

  this.components.physics.position.y = 0.5 + (Math.sin(this.t) * this.distance);

  if(this.hovering) window.requestAnimationFrame(this.tick.bind(this));
}

Bird.prototype.stopHovering = function() {
  this.hovering = false;
  //this.components.physics.position.y = 0.5;
}

Bird.prototype.freakOut = function() {
  this.components.graphics.freakOut();
}

Bird.prototype.freakOutOver = function(score) {
  var scores = this.scores;

  for(var i = 0; i < scores.length; i++) {
    if(scores[i] == score) return false;
  }
  this.components.graphics.freakOut();

  scores.push(score);

  return true;
}

exports.Bird = Bird;
