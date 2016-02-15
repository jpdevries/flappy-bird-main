Math.randomRange = function(min,max) {
      return min + (Math.random() * (max-min));
};

Math.degreesToRadians = function(degrees) {
  return degrees * Math.PI / 180;
}

Math.radiansToDegrees = function(radians) {
  return radians * 180 / Math.PI;
}

var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe_system');

var bird = require('./entities/bird');
var settings = require('./settings');

var FlappyBird = function() {
  var that = this;

  this.gameOver = false;
  this.score = 0;
  this.paused = false;

  var flappy = new bird.Bird();


  this.entities = [flappy];
  this.graphics = new graphicsSystem.GraphicsSystem(this);
  this.physics = new physicsSystem.PhysicsSystem(this.entities);
  this.input = new inputSystem.InputSystem(this.entities);
  this.pipes = new pipeSystem.PipeSystem(this.entities);

  this.pipes.on('passed',function(score){
    that.score = score;
    if(!that.gameOver) console.log(score);
  });

  this.graphics.on('collision',function(id, visible, hidden){
    if(!that.gameOver) {
      console.log('Game over! You cleared ' + that.score + ' pipes!');
    }
    that.gameOver = true;

    //function to display player's score on the overlay after game over
    var writeScore = function(){
      if (that.gameOver = true){
        return('Score: ' + that.score);
      }
    };

    var htmlScore = document.getElementById('score');
    htmlScore.innerHTML = writeScore();

    //Display game controls when "How to Play" button is clicked
    var button = document.getElementById("#howtoplay");
    button.onclick = function(){
    console.log("Clicked!");
  };

    //simple function to show the 'game-over' overlay by changing display property
    var show = function (element) {
      element.style.display = 'block';
    };

    if(that.gameOver) {
      that.graphics.pause();
      that.physics.pause();
      that.pipes.pause();
      //call show function if game over
      //show(document.getElementById('game-over'));
      $("#game-over").delay(500).fadeIn(2000);
    }
  });

  var button = document.getElementById("#replay");
  button.onclick = function(){
    location.reload(true);
  };

  this.input.on('visibilitychange',function(visible){
    console.log('visibilitychange',visible);
    if(visible) {
      that.graphics.paused = false;
      that.physics.run();
      that.pipes.run();
    } else {
      that.graphics.pause();
      that.physics.pause();
      that.pipes.pause();
    }
  });

  this.pipes.on('pipeadded',function(){ // whenever a pipe is added
    var entities = that.entities;
    entities = entities.filter(function(entity){ //
      return (entity.components.physics.position.x > -(that.graphics.canvas.width / that.graphics.canvas.height)) ? true : false;
    });

    // update all the references to our entities
    that.entities = that.graphics.entities = that.physics.entities = that.input.entities = that.pipes.entities = entities;
  });

  this.input.on('Paused', this.handlePaused.bind(this));

  this.input.on('Started', function(){
    that.entities[0].stopHovering();

    that.physics.justBird = false;
    that.pipes.run();

    setTimeout(function(){
      flappy.freakOutOver(0);
    },200);
  });

  this.input.on('FlappyFreakout', function(){
    console.log("I'm doing a backflip!");
    flappy.freakOut();
  });
};

FlappyBird.prototype.handlePaused = function() {
    this.paused = !this.paused;
    if (this.paused){
      this.graphics.pause();
      this.physics.pause();
      this.pipes.pause();
    }
    else {
      this.graphics.run();
      this.physics.run();
      this.pipes.run();
    }
  };

FlappyBird.prototype.run = function() {
    this.graphics.run();
    this.input.run();
    this.physics.run();
};

exports.FlappyBird = FlappyBird;
