(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CircleCollisionComponent = function(entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function(entity) {
    /*if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else */if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {x: (positionA.x - positionB.x),
                y: (positionA.y - positionB.y)};

    var distanceSquared = (diff.x * diff.x) + (diff.y * diff.y);
    var radiusSum = radiusA + radiusB;
    return false;
    return distanceSquared < (radiusSum * radiusSum);
};

CircleCollisionComponent.prototype.collideRect = function(entity) {
    var clamp = function(value, low, high) {
      //console.log(value,low,high);
      if (value < low) {
        return low;
      }
      if (value > high) {
        return high;
      }
      return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = {x:entity.components.physics.position.x,y:entity.components.physics.position.y};
    var sizeB = entity.components.collision.size;

    if(entity.flip) positionB.y = 1 - positionB.y;

    //console.log(positionB);
    //console.log(positionA.x, positionB.x - sizeB.x / 2,positionB.x + sizeB.x / 2);
    //console.log(positionA.y, positionB.y - sizeB.y / 2,positionB.y + sizeB.y / 2);

    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
                 positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
                 positionB.y + sizeB.y / 2)
    };


    var radiusA = this.radius;

    var diff = {x: positionA.x - closest.x,
                y: positionA.y - closest.y};

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    //console.log(positionA,positionB,closest,diff);
    //console.log(diff, distanceSquared, radiusA * radiusA);
    //console.log(distanceSquared, radiusA * radiusA);
    //return false;
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;

},{}],2:[function(require,module,exports){
var RectCollisionComponent = function(entity, size) {
    this.entity = entity;
    this.size = size;
    console.log(this.size);
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function(entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function(entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function(entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x - sizeA.x / 2;
    var rightA = positionA.x + sizeA.x / 2;
    var bottomA = positionA.y - sizeA.y / 2;
    var topA = positionA.y + sizeA.y / 2;

    var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    return !(leftA > rightB || leftB > rightA ||
             bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;

},{}],3:[function(require,module,exports){
var BirdGraphicsComponent = function(entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function(context) {
    //console.log("Drawing a bird");

    var position = this.entity.components.physics.position;

    //Save a snapshot of the current transformation state.
    context.save();

    //Move the canvas to the x & y cordinates defined in position variable.
    context.translate(position.x, position.y);

    //Start drawing a new path by calling the beginPath function.
    context.beginPath();

    //Use the context.arc function to draw an arc centered 0px from the left of the canvas
    //and 0px from the top of the canvas, w/ radius of 0.02, and covering an angle between 0
    //and 2 x pi (is a whole circle).
    //context.arc(0, 0, 0.02, 0, 2 * Math.PI);

    //Use the context.fill function to fill in the arc with whatever the current
    //context.fillStyle is (this defaults to black unless changed).
    //context.fill();

    var image = document.getElementById("bird");
    context.scale(-1, 1);
    context.rotate(Math.PI);
    context.drawImage(image, 0, 0, 0.1, 0.1);

    //Stop drawing.
    context.closePath();

    //Restore transformation state back to what it was last time context.save was called.
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;

},{}],4:[function(require,module,exports){
var PipeGraphicsComponent = function(entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function(context) {
    var position = this.entity.components.physics.position;
    var flip = this.entity.flip;

    //Save a snapshot of the current transformation state.
    context.save();

    //Move the canvas to the x & y cordinates defined in position variable.
    context.translate(position.x, position.y);


    if(flip) {
      context.scale(1,-1);
    }

    var image = document.getElementById("pipe");

    context.drawImage(image, 0, 0, 0.2, 1);

    context.restore();

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

},{}],5:[function(require,module,exports){
var PhysicsComponent = function(entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function(delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],6:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/circle");


var Bird = function() {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -0.75;

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    //collision.onCollision = this.onCollision.bind(this);

    this.components = {
    	physics: physics,
    	graphics: graphics,
    	collision: collision
    };
};

Bird.prototype.onCollision = function(entity) {
	console.log("Bird collided with entity:", entity);
};

exports.Bird = Bird;

},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":5}],7:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");
var physicsComponent = require("../components/physics/physics");
var collisionComponent = require("../components/collision/rect");

var Pipe = function(position,flip) {
	this.flip = (typeof(flip) == 'undefined') ? false : flip;
	//console.log("Creating Pipe entity",flip);

	var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.x = position.x;
	physics.position.y = position.y;
    physics.acceleration.x = -0.07;


	var graphics = new graphicsComponent.PipeGraphicsComponent(this);
	var collision = new collisionComponent.RectCollisionComponent(this, {x:0.02,y:1});
	//collision.onCollision = this.onCollision.bind(this);

	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision
	};
};

Pipe.prototype.onCollision = function(entity,pipeWidth,pipeHeight) {
	pipeWidth = (typeof(pipeWidth) == 'undefined') ? 0.2 : pipeWidth;
	pipeHeight = (typeof(pipeHeight) == 'undefined') ? 1 : pipeHeight;
	console.log("Pipe collided with entity:",entity);
};

exports.Pipe = Pipe;

},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],8:[function(require,module,exports){
Math.randomRange = function(min,max) {
  	  return min + (Math.random() * (max-min));
};

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe_system');

var bird = require('./entities/bird');



var FlappyBird = function() {

    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipes = new pipeSystem.PipeSystem(this.entities);


};

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;

},{"./entities/bird":6,"./systems/graphics":10,"./systems/input":11,"./systems/physics":12,"./systems/pipe_system":13}],9:[function(require,module,exports){
var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});
},{"./flappy_bird":8}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
var InputSystem = function(entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    document.body.addEventListener('keydown', this.onkeydown.bind(this));
};

InputSystem.prototype.onClick = function() {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.4;
};

InputSystem.prototype.onkeydown = function(e) {

	if (e.keyCode ==32) {
		var bird = this.entities[0];
		bird.components.physics.velocity.y = 0.4;
	}
};

exports.InputSystem = InputSystem;

},{}],12:[function(require,module,exports){


var PhysicsSystem = function(entities) {
    this.entities = entities;
    //this.collisionSystem = new collisionSystem.CollisionSystem(entities);
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function() {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
    //this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;

},{}],13:[function(require,module,exports){
var pipe = require('../entities/pipe');

var PipeSystem = function(entities) {
  this.entities = entities;
  this.canvas = document.getElementById('main-canvas');
  this.interval = null;
}

PipeSystem.prototype.run = function() {
  this.tick();
  this.interval = window.setInterval(this.tick.bind(this),2000);
};

PipeSystem.prototype.pause = function() {
  if(this.interval != null) {
    window.clearInterval(this.interval);
    this.interval = null;
  }
}

PipeSystem.prototype.tick = function() {

  var position = {
    x:1.5,
    y:Math.randomRange(0.25,0.65)
  };

  this.entities.push(new pipe.Pipe(position, true));
            
  position.y += .25;                                                              

  this.entities.push(new pipe.Pipe(position, false));
  
};

exports.PipeSystem = PipeSystem;

},{"../entities/pipe":7}]},{},[9]);
