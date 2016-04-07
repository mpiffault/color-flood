'use strict';

var canvas = document.getElementById('2dgrid');

var isoCanvas = document.getElementById('3dgrid');

var TOP_COLOR = 0;
var LEFT_COLOR = 1;
var RIGHT_COLOR = 2;
var colorsHash = {
    'A' : ['#655643'],
    'B' : ['#80BCA3'],
    'C' : ['#F6F7BD'],
    'D' : ['#E6AC27'],
    'E' : ['#BF4D28']
};
var colors = [];
for (var color in colorsHash) {
    if (colorsHash.hasOwnProperty(color)) {
        var leftColor = toLeftColor(colorsHash[color][TOP_COLOR]);
        var rightColor = toRightColor(colorsHash[color][TOP_COLOR]);
        colorsHash[color].push(leftColor);
        colorsHash[color].push(rightColor);
        colors.push(color);
    }
}

var grid1 = new Grid(10,10,colors, canvas, isoCanvas);

function initButtons() {
    for (var localColor in colorsHash) {
        if (colorsHash.hasOwnProperty(localColor)) {
            var button = _addElement(document.body, 'button', {id: localColor});
            button.appendChild(document.createTextNode(localColor));
            button.style.background = colorsHash[localColor][0];
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
grid1.draw3dGrid();

function valueBetween(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

isoCanvas.addEventListener('mousemove', function (e) {
    if (e.buttons === 1) {
        if (e.ctrlKey) {
            origin.x += e.movementX;
            origin.y += e.movementY;
            grid1.draw3dGrid();
        } else {
            zHorizontalAngle = valueBetween(zHorizontalAngle - e.movementY / 100, 0, Math.PI/2);
            zRotationAngle = valueBetween(zRotationAngle - e.movementX / 100, 0, Math.PI/2);
            grid1.draw3dGrid();
        }
    }
});