var PhysicsSystem = function(entities) {
    this.entities = entities;
    this.interval = null;
    this.justBird = true;
};

PhysicsSystem.prototype.run = function() {
    // Run the update loop
    this.interval = window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.pause = function() {
  clearInterval(this.interval);
};

PhysicsSystem.prototype.tick = function() {
  //console.log('pock',this.entities);
    for (var i=0; i < ((this.justBird) ? 1 : this.entities.length); i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1/60,i<1,!this.justBird); // pass in the framerate and whether or not to accelerate (only acceralte the bird in other words don't accelerate the pipes)
    }
};

exports.PhysicsSystem = PhysicsSystem;
