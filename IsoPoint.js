'use strict';

var IsoPoint = function(x, y) {
    this.x = x || 250;
    this.y = y || 250;
};

IsoPoint.prototype.addVector = function (vector, size) {
    if (size != 0) {
        size = size || 1;
    }
    var newPoint = new IsoPoint(this.x, this.y);
    newPoint.x = newPoint.x + vector.dX * size;
    newPoint.y = newPoint.y + vector.dY * size;
    return newPoint;
};

IsoPoint.prototype.toString = function () {
    return "{x:"+this.x+",y:"+this.y+"}";
};
