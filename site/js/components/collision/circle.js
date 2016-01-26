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
