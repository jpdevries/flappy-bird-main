var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var settings = require("../settings");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -settings.gravity || -0.75;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);

    this.scores = [];

    this.components = {
    	physics: physics,
    	graphics: graphics

    };
};

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
