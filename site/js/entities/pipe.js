var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("..components.collision/rect");

var Pipe = function(position,flip) {
	this.flip = (typeof(flip) == 'undefined') ? false : flip;
	//console.log("Creating Pipe entity",flip);

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = position.x;
	physics.position.y = position.y;
    physics.acceleration.x = -0.07;


	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, 0.02);
	collision.onCollision = this.onCollision.bind(this);

	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision
	};
Pipe.prototype.onCollision = function(0.2, 1) {
	console.log("Pipe collided with entity:", entity);
    };
};

exports.Pipe = Pipe;
