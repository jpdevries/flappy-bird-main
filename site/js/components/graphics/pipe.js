var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function() {
    console.log("Drawing a pipe");
    //Start drawing a new path by calling the beginPath function.
    context.beginPath();
    //use fillStyle to tell the computer what color the pipe should be
    context.fillStyle = "green";
    //Use fillRect function to tell computer where to draw the pipe & what size
    //first number is how far from left, second is how far from top right, 
    //third and fourth are width and height of pipe
    context.fillRect(200, 200, 100, 200);
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;