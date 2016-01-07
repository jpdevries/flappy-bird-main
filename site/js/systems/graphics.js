var GraphicsSystem = function(entities) {
    this.entities = entities;
    //Canvas is WHERE we draw to. This part fetches the canvas element.
    this.canvas = document.getElementById('main-canvas');
    //Context is WHAT we draw to
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function() {
    //Run the graphics rendering loop. requestAnimationFrame runs ever 1/60th of a second.
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
    //Set the canvas to the correct size if the window is resized.
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    //Clear the canvas, top-left to bottom-right.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Rendering of graphics goes here
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }
        entity.components.graphics.draw(this.context);
    }

    //Continue the graphics rendering loop.
    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;