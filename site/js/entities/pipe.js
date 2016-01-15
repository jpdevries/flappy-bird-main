var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function() {
	console.log("Creating Pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.x = -0.1;
    

	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components = {
		physics: physics,
		graphics: graphics
	};
};

exports.Pipe = Pipe;