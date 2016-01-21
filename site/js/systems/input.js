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
  console.log('keydown');
	if (e.keyCode == 32) {
	console.log("spacebar pressed!");
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.4;
	}
};

exports.InputSystem = InputSystem;
