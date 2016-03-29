'use strict';

var canvas = document.getElementById('2dgrid');

var isoCanvas = document.getElementById('3dgrid');

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
        var leftColor = toLeftColor(colorsHash[color][0]);
        var rightColor = toRightColor(colorsHash[color][0]);
        colorsHash[color].push(leftColor);
        colorsHash[color].push(rightColor);
        colors.push(color);
    }
}

var grid1 = new Grid(25,25,colors, canvas, isoCanvas);

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