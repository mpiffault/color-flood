'use strict';

var DEG_30 = Math.PI / 3;
var DEG_60 = (Math.PI * 2) / 3;
var DEG_45 = Math.PI / 4;
var DEG_90 = Math.PI / 2;

var zHorizontalAngle = DEG_30;
var zRotationAngle = DEG_45;

var xVector = {
    dX: function() {return 20 * Math.cos(zRotationAngle);},
    dY: function() {return 20 * Math.sin(zRotationAngle)*(Math.cos(zHorizontalAngle));}
};

var yVector = {
    dX: function() {return -20 * Math.sin(zRotationAngle);},
    dY: function() {return 20 * Math.cos(zRotationAngle)*(Math.cos(zHorizontalAngle));}
};

var zVector = {
    dX: function() {return 0;},
    dY: function() {return -20 * Math.sin(zHorizontalAngle);}
};

var origin = new IsoPoint().addVector(xVector, 5).addVector(yVector, 5);

Grid.prototype.draw3dGrid = function() {
    var i;

    var context = this.isoCanvas.getContext('2d');

    context.clearRect(0, 0, this.isoCanvas.width, this.isoCanvas.height);

    context.globalAlpha = 1;

    for (var k = 0 ; k < this.content.length ; k++) {
        for (i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                var cubeOrigin = origin.addVector(zVector, k).addVector(xVector, i+1-this.width/2).addVector(yVector, j+1-this.height/2);
                if (this.mustBeDrawn(k, i, j)) {
                    drawCube(context, cubeOrigin, this.content[k][i][j]);
                }
            }
        }
    }

};

Grid.prototype.mustBeDrawn = function(k, i, j) {
    return (this.content[k][i][j] != undefined) &&
        (
            (k == this.content.length - 1)
            || (i == this.width - 1)
            || (j == this.height - 1)
            || (
                (k+1 < this.content.length && this.content[k+1][i][j] == undefined)
                || (i+1 < this.content[0].length && this.content[k][i+1][j] == undefined)
                || (j+1 < this.content[0][0].length && this.content[k][i][j+1] == undefined)
            )
        )
};

function drawCube (context, cubeOrigin, color) {

    var topColor = colorsHash[color][TOP_COLOR];
    var t1 = cubeOrigin.addVector(xVector, -1);
    var t2 = t1.addVector(yVector, -1);
    var t3 = t2.addVector(xVector);
    var t4 = t3.addVector(yVector);
    var topPoints = [t1,t2,t3,t4];
    drawFacet(context, cubeOrigin, topPoints, topColor);

    var leftColor = colorsHash[color][LEFT_COLOR];
    var l1 = cubeOrigin.addVector(yVector, -1);
    var l2 = l1.addVector(zVector, -1);
    var l3 = l2.addVector(yVector);
    var l4 = l3.addVector(zVector);
    var leftPoints = [l1,l2,l3,l4];
    drawFacet(context, cubeOrigin, leftPoints, leftColor);

    var rightColor = colorsHash[color][RIGHT_COLOR];
    var r1 = cubeOrigin.addVector(xVector, -1);
    var r2 = r1.addVector(zVector, -1);
    var r3 = r2.addVector(xVector);
    var r4 = r3.addVector(zVector);
    var rightPoints = [r1,r2,r3,r4];
    drawFacet(context, cubeOrigin, rightPoints, rightColor);
}

function toLeftColor(color) {
    var r = _hexToR(color);
    var g = _hexToG(color);
    var b = _hexToB(color);

    r = Math.max(0,r - 30);
    g = Math.max(0,g - 30);
    b = Math.max(0,b - 30);

    return _rgbToHex(r,g,b);
}

function toRightColor(color) {
    var r = _hexToR(color);
    var g = _hexToG(color);
    var b = _hexToB(color);

    r = Math.max(0,r - 60);
    g = Math.max(0,g - 60);
    b = Math.max(0,b - 60);

    return _rgbToHex(r,g,b);
}

function drawFacet (context, cubeOrigin, points, color) {
    context.beginPath();
    context.moveTo(cubeOrigin.x, cubeOrigin.y);
    for (var i = 0 ; i < points.length ; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
    context.fillStyle = color;
    context.fill();
}
