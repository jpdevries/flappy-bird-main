var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var EventEmitter = require('events');
var util = require('util');


var Pipe = function(position,flip, id) {
	var that = this;
	this.id = (typeof(id) == 'undefined') ? '' : id;
	this.flip = (typeof(flip) == 'undefined') ? false : flip;

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = position.x;
		physics.position.y = position.y;

		physics.velocity.x = -0.4;

		var graphics = new graphicsComponent.PipeGraphicsComponent(this);

		graphics.on('passed',function(graphics){
			that.emit('passed',graphics);
		});

		this.components = {
			physics: physics,
			graphics: graphics
		};
};

util.inherits(Pipe, EventEmitter);

exports.Pipe = Pipe;
