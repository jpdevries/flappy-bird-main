var settings = require("../../settings");

var BirdGraphicsComponent = function(entity) {
    this.entity = entity;

    this.flapIndex = 0;

    this.images = [
      document.getElementById("bird2"),
      document.getElementById("bird1"),
      document.getElementById("bird2"),
      document.getElementById("bird3")
    ];

    this.interval = window.setInterval(this.flap.bind(this),240);
};

BirdGraphicsComponent.prototype.flap = function() {
  this.flapIndex += 1;
  if(this.flapIndex >= this.images.length) this.flapIndex = 0;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    //Save a snapshot of the current transformation state.
    context.save();

    //Move the canvas to the x & y cordinates defined in position variable.
    context.translate(position.x, position.y);

    //Start drawing a new path by calling the beginPath function.
    context.beginPath();

    context.scale(-1, 1);
    context.rotate(Math.PI);
    context.drawImage(this.images[this.flapIndex], 0, 0, settings.birdRadius, settings.birdRadius);

    //Stop drawing.
    context.closePath();

    //Restore transformation state back to what it was last time context.save was called.
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
