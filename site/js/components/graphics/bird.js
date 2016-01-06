var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    console.log("Drawing a bird");
    //Start drawing a new path by calling the beginPath function.
    context.beginPath();
    //Use the context.arc function to draw an arc centered 50px from the left 
    //and 50px from the top, w/ radius of 10, and covering an angle between 0
    //and 2 x pi (is a whole circle).
    context.arc(50, 50, 10, 0, 2 * Math.PI);
    //Use the context.fill function to fill in the arc with whatever the current
    //context.fillStyle is (this defaults to black unless changed).
    context.fill();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;