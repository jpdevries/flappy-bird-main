var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var settings = require("../settings");

var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -settings.gravity || -0.75;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);

    this.components = {
    	physics: physics,
    	graphics: graphics

    };
};

exports.Bird = Bird;
