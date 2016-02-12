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

PhysicsComponent.prototype.update = function(delta,accelerate,position) {
    position = (typeof(position) == 'undefined') ? true : position;
    if(accelerate) {
      this.velocity.x += this.acceleration.x * delta;
      this.velocity.y += this.acceleration.y * delta;
    }

    if(position) {
      this.position.x += this.velocity.x * delta;
      this.position.y += this.velocity.y * delta;
    }
};

exports.PhysicsComponent = PhysicsComponent;
