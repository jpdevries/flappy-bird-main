//var collisionSystem = require("./collision");

var GraphicsSystem = function(entities) {
    this.entities = entities;
    //Canvas is WHERE we draw to. This part fetches the canvas element.
    this.canvas = document.getElementById('main-canvas');
    this.offcanvas = document.getElementById('offcanvas');
    //Context is WHAT we draw to
    this.context = this.canvas.getContext('2d');

    var canvas = this.canvas,
    offcanvas = this.offcanvas;

    handleResize();
    window.onresize = function() {
        handleResize();
    }
    function handleResize() {
        canvas.width = offcanvas.width = window.innerWidth;
        canvas.height = offcanvas.height = window.innerHeight;
    }
};

GraphicsSystem.prototype.run = function() {
    //Run the graphics rendering loop. requestAnimationFrame runs ever 1/60th of a second.
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function() {
    //Set the canvas to the correct size if the window is resized.
    var canvas = this.canvas,
    offcanvas = this.offcanvas;

    var offcanvasContext = offcanvas.getContext('2d');

    offcanvasContext.clearRect(0,0,offcanvas.width,offcanvas.height);

    // offcanvasContext.fillStyle = 'red';
    // offcanvasContext.beginPath();
    // offcanvasContext.fillRect(0,0,100,100);
    // offcanvasContext.closePath();


    //Clear the canvas, top-left to bottom-right.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.save();
    this.context.translate(this.canvas.width/2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    offcanvasContext.save();
    offcanvasContext.translate(this.canvas.width/2, this.canvas.height);
    offcanvasContext.scale(this.canvas.height, -this.canvas.height);



    //Rendering of graphics goes here
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) continue;

        entity.components.graphics.draw(this.context);
    }

    // just the bird
    for (var i=0; i<1; i++) {
      var entity = this.entities[i];
      if (!'graphics' in entity.components) continue;
      if (!'physics' in entity.components) continue;

      var position = entity.components.physics.position;





      entity.components.graphics.draw(offcanvasContext);


      var imgData = offcanvasContext.getImageData(
        (offcanvas.width/2)-((offcanvas.height*0.1)/2),
        (1-position.y)*offcanvas.height,
        200,
        200
      );
      imgData = this.colorizeImageData(imgData,[0,255,0,255]);

      offcanvasContext.putImageData(imgData,0,0);
    }

    this.context.restore();
    offcanvasContext.restore();

    //Continue the graphics rendering loop.
    window.requestAnimationFrame(this.tick.bind(this));

};

GraphicsSystem.prototype.colorizeImageData = function(imgData,color) {
  var data = imgData.data;
  for(var i = 0; i <= data.length-4; i+=4) {
    if(!(!data[i] && !data[i+1] && !data[i+2] && !data[i+3])) {

      data[i] = color[0];
      data[i+1] = color[1];
      data[i+2] = color[2];
      data[i+3] = color[3];
    }
  }
  return imgData;
}

GraphicsSystem.prototype.imgDataToDataURL = function(imgData) {
  var c = document.createElement('canvas');

  c.width = imgData.width;
  c.height = imgData.height;

  c.getContext('2d').putImageData(imgData,0,0);
  return c.toDataURL();
}


GraphicsSystem.prototype.dataURLtoImg = function(dataURL) {
    var img = new Image();

    img.src = dataURL;
    return img;
}

exports.GraphicsSystem = GraphicsSystem;
