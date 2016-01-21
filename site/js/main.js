Math.randomRange = function(min,max) {
  return min + (Math.random() * (max-min));
};

var flappyBird = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function() {
    var app = new flappyBird.FlappyBird();
    app.run();
});
