var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");

var Pipe = function(y,flip) {
	this.flip = (typeof(flip) == 'undefined') ? false : true;
	//console.log("Creating Pipe entity");

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = y;
    physics.acceleration.x = -0.05;


	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	this.components = {
		physics: physics,
		graphics: graphics
	};
	
};

exports.Pipe = Pipe;
