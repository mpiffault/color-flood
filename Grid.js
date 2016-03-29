'use strict';

var Grid = function (width, height, colors, canvas) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
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
        this.draw();
    }
};

Grid.prototype.getString = function () {
    var string = "";
    for (var i=0 ; i < this.height ; i++) {
        string += this.content[i].join(' ') + "\n";
    }
    return string;
};

Grid.prototype.draw = function () {
    var context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    var biggestGridSide = Math.max(this.height, this.width);
    var smallestCanvasSize = Math.min(this.canvas.height, this.canvas.width);
    var cellSize = smallestCanvasSize / biggestGridSide;

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