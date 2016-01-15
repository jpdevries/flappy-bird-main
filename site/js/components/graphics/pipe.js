var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    console.log("Drawing a pipe");

    var position = this.entity.components.physics.position;

    //Save a snapshot of the current transformation state.
    context.save();

    var canvas = document.getElementById("main-canvas");
    var context = canvas.getContext("2d");
    var image = document.getElementById("pipe");
    context.drawImage(image, 0.5, 0.75, 0.2, 1.5);

    //(2-Math.random()/2)

    //Move the canvas to the x & y cordinates defined in position variable.
    //context.translate(position.x, position.y);

    //Start drawing a new path by calling the beginPath function.
    //context.beginPath();

    //use fillStyle to tell the computer what color the pipe should be
    //context.fillStyle = "green";

    //Use fillRect function to tell computer where to draw the pipe & what size
    //first number is how far from left, second is how far from top right, 
    //third and fourth are width and height of pipe
    //context.fillRect(1, .5, .2, 1.5);
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;

