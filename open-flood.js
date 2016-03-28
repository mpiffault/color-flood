'use strict';

var canvas = document.getElementById('2dgrid');
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

var Grid = function (width, height, colors) {
    this.width = width;
    this.height = height;
    this.content = _createGridContent(width, height, colors);
    this.currentColor = this.content[0][0];
};

Grid.prototype.changeColor = function (newColor, x, y) {
    x = x || 0;
    y = y || 0;

    if (x < 0 || y < 0 || x >= this.width || y >= this.length
        || this.content[x][y] != this.currentColor) {
        return;
    }

    this.content[x][y] = newColor;
    this.changeColor(newColor, x+1, y);
    this.changeColor(newColor, x, y+1);
    this.changeColor(newColor, x-1, y);
    this.changeColor(newColor, x, y-1);

    if (x == 0 && y == 0) {
        this.currentColor = newColor;
        this.draw(canvas);
    }
};

Grid.prototype.getString = function () {
    var string = "";
    for (var i=0 ; i < this.height ; i++) {
        string += this.content[i].join(' ') + "\n";
    }
    return string;
};

Grid.prototype.draw = function (canvas) {
    var context = canvas.getContext('2d');
    var biggestGridSide = Math.max(this.height, this.width);
    var smallestCanvasSize = Math.min(canvas.height, canvas.width);
    var cellSize = smallestCanvasSize / biggestGridSide;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0 ; i < this.width ; i++) {
        for (var j = 0 ; j < this.height ; j++) {
            var startI = i * cellSize;
            var startJ = j * cellSize;
            var color = colorsHash[this.content[i][j]];

            context.beginPath();
            context.rect(startI, startJ, Math.ceil(cellSize), Math.ceil(cellSize));
            context.fillStyle = color;
            context.fill();
        }
    }
};

function _addElement(_parent, nature, attributes) {
    var newElement = document.createElement(nature);
    for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            newElement.setAttribute(key, attributes[key]);
        }
    }
    _parent.appendChild(newElement);
    return newElement;
}

function _createGridContent(width, height, colors) {
    var matrix = new Array(width);
    for(var i = 0 ; i < width ; i++) {
        matrix[i] = new Array(height);
        for (var j = 0 ; j < height ; j++) {
            matrix[i][j] = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    return matrix;
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

var grid1 = new Grid(10,10,colors);

initButtons();

grid1.draw(canvas);