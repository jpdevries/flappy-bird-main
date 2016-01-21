var InputSystem = function(entities) {
    console.log('InputSystem');
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function() {
    console.log('run');
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('keydown', this.onkeydown.bind(this));
};

InputSystem.prototype.onClick = function() {
	console.log("click detected!");
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.4;
};

InputSystem.prototype.onkeydown = function(e) {
	if (e.keyCode == 32) {
	console.log("spacebar pressed!");
	var bird = this.entities[0];
	bird.components.physics.velocity.y = 0.4;
	}
};

exports.InputSystem = InputSystem;
