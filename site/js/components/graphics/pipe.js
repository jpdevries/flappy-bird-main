var EventEmitter = require('events');
var util = require('util');
var settings = require("../../settings");

var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
    this.image = document.getElementById("pipe");

    this.emitted = false;
};

util.inherits(PipeGraphicsComponent, EventEmitter);

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var flip = this.entity.flip;

    //Save a snapshot of the current transformation state.
    context.save();

    //Move the canvas to the x & y cordinates defined in position variable.
    context.translate(position.x, position.y);



    if(position.x < -settings.pipeWidth && !this.emitted) {
      this.emit('passed',this);
      this.emitted = true;
    }


    if(flip) {
      context.scale(1,-1);
    }

    var image = this.image;

    context.drawImage(image, 0, 0, settings.pipeWidth, 1);

    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;