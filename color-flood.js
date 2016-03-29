'use strict';

var canvas = document.getElementById('2dgrid');

var canvas3d = document.getElementById('3dgrid');

var colorsHash = {
    'A' : '#5bc0eb',
    'B' : '#fde74c',
    'C' : '#9bc53d',
    'D' : '#e55934',
    'E' : '#fa7921'
};
var colors = [];
for (var color in colorsHash) {
    if (colorsHash.hasOwnProperty(color)) {
        colors.push(color);
    }
}

var grid1 = new Grid(10,10,colors, canvas);

var xVector = {
    dX: 20 * Math.sin(Math.PI / 3),
    dY: 20 * Math.cos(Math.PI / 3)
};

var yVector = {
    dX: -20 * Math.sin(Math.PI / 3),
    dY: 20 * Math.cos(Math.PI / 3)
};

var zVector = {
    dX: 0,
    dY: -20
};

function draw3dGrid(canvas) {

    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.stroke();
    drawIsoLine(context, zeroPoint, xVector, 10);
    drawIsoLine(context, zeroPoint, yVector, 10);

    drawIsoLine(context, zeroPoint, zVector, 10);
    for (var i = 1 ; i <= 10 ; i++) {
        // test
        context.strokeStyle = '#888888';
        drawIsoLine(context, zeroPoint.addVector(yVector, i), xVector, 10, 0.5);
        drawIsoLine(context, zeroPoint.addVector(xVector, i), yVector, 10, 0.5);
    }

    for (i = 0 ; i < grid1.width ; i++) {
        for (var j = 0; j < grid1.height; j++) {
            drawCube(context, zeroPoint.addVector(xVector, i).addVector(yVector, j), colorsHash[grid1.content[i][j]]);
        }
    }
}

function drawIsoLine(context, origin, vector, size, width) {

    width = width || 1;
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    context.lineTo(origin.x + (vector.dX * size), origin.y + (vector.dY * size));
    context.lineWidth = width;
    context.stroke();
}

function drawCube (context, origin, color) {

    color = color || '#888888';
    var topColor = color;
    var t1 = origin.addVector(xVector, -1);
    var t2 = t1.addVector(yVector, -1);
    var t3 = t2.addVector(xVector);
    var t4 = t3.addVector(yVector);
    var topPoints = [t1,t2,t3,t4];

    drawFacet(context, origin, topPoints, topColor);
    var leftColor = toLeftColor(color);
    var l1 = origin.addVector(yVector, -1);
    var l2 = l1.addVector(zVector, -1);
    var l3 = l2.addVector(yVector);
    var l4 = l3.addVector(zVector);
    var leftPoints = [l1,l2,l3,l4];

    drawFacet(context, origin, leftPoints, leftColor);
    var rightColor = toRightColor(color);
    var r1 = origin.addVector(xVector, -1);
    var r2 = r1.addVector(zVector, -1);
    var r3 = r2.addVector(xVector);
    var r4 = r3.addVector(zVector);
    var rightPoints = [r1,r2,r3,r4];
    drawFacet(context, origin, rightPoints, rightColor);
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

function drawFacet (context, origin, points, color) {
    context.beginPath();
    context.moveTo(origin.x, origin.y);
    for (var i = 0 ; i < points.length ; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
    var colorBackup = context.fillStyle;
    context.fillStyle = color;
    context.fill();
    context.fillStyle = colorBackup;
}

function initButtons() {
    for (var localColor in colorsHash) {
        if (colorsHash.hasOwnProperty(localColor)) {
            var button = _addElement(document.body, 'button', {id: localColor});
            button.appendChild(document.createTextNode(localColor));
            button.style.background = colorsHash[localColor];
            button.onclick = function (closureColor) {
                return function () {
                    grid1.changeColor(closureColor);
                }
            }(localColor);
        }
    }
}


initButtons();

grid1.draw();
draw3dGrid(canvas3d);