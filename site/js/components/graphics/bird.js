var settings = require("../../settings");

var BirdGraphicsComponent = function(entity) {
    this.entity = entity;

    this.flapIndex = 0;
    this.freakingOut = false;

    this.images = [
      document.getElementById("bird2"),
      document.getElementById("bird1"),
      document.getElementById("bird2"),
      document.getElementById("bird3")
    ];

    this.radians = 0;

    this.interval = window.setInterval(this.flap.bind(this),120);
};

BirdGraphicsComponent.prototype.flap = function() {
  this.flapIndex += 1;
  if(this.flapIndex >= this.images.length) this.flapIndex = 0;

};

BirdGraphicsComponent.prototype.freakOut = function() {
  if(this.freakingOut) return;
  var that = this;
  this.freakingOut = true;
  setTimeout(function(){
    that.freakingOut = false;
  },240);
}

BirdGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;

    //Save a snapshot of the current transformation state.
    context.save();

    //Move the canvas to the x & y cordinates defined in position variable.
    context.translate(position.x, position.y);

    context.scale(-1, 1);
    context.rotate(Math.PI);

    context.save();
    context.translate(settings.birdRadius/2,settings.birdRadius/2);
    context.rotate(this.radians);

    //context.fillRect(-settings.birdRadius/2,-settings.birdRadius/2,settings.birdRadius,settings.birdRadius);

    var verticalVelocity = this.entity.components.physics.velocity.y;
    verticalVelocity = Math.max(settings.minVerticalVelocity,verticalVelocity);
    verticalVelocity = Math.min(settings.maxVerticalVelocity,verticalVelocity);

    verticalVelocity = -verticalVelocity;

    var noseDive = settings.noseDive;

    //Start drawing a new path by calling the beginPath function.
    context.beginPath();


    context.drawImage(this.images[this.flapIndex], -settings.birdRadius/2,-settings.birdRadius/2, settings.birdRadius, settings.birdRadius);
    context.restore();
    //Stop drawing.
    context.closePath();

    //Restore transformation state back to what it was last time context.save was called.
    context.restore();

    if(!this.freakingOut) {
        this.radians = Math.degreesToRadians(verticalVelocity * noseDive);
    } else {
      this.radians += Math.degreesToRadians(-45);
    }

};

exports.BirdGraphicsComponent = BirdGraphicsComponent;