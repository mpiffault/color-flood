'use strict';

var MAIN_LAYER = 0;

var Grid = function (width, height, colors, canvas, isoCanvas) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.isoCanvas = isoCanvas;
    this.content = _createGridContent(width, height, colors);
    this.currentColor = this.content[MAIN_LAYER][0][0];
};

Grid.prototype.changeColor = function (newColor, x, y, layer, witness) {
    if (newColor == this.currentColor) {
        return;
    }
    x = x || 0;
    y = y || 0;

    if (layer == undefined) {
        layer = new Array(this.width);
        for (var i=0 ; i < this.width ; i++) {
            layer [i] = new Array(this.height);
        }
        this.content.splice(1,0,layer);
        witness = new Array(this.width);
        for (i=0 ; i < this.width ; i++) {
            witness [i] = new Array(this.height);
        }
    }

    if (!this.isColorable(x, y, witness)) {
        return;
    }

    this.content[MAIN_LAYER][x][y] = newColor;
    witness[x][y] = true;
    layer[x][y] = this.currentColor;
    this.changeColor(newColor, x+1, y, layer, witness);
    this.changeColor(newColor, x, y+1, layer, witness);
    this.changeColor(newColor, x-1, y, layer, witness);
    this.changeColor(newColor, x, y-1, layer, witness);

    if (x == 0 && y == 0) {
        this.currentColor = newColor;
        this.draw();
        this.draw3dGrid();
    }
};

Grid.prototype.isColorable = function (x, y, witness) {
    return !(x < 0 || y < 0 || x >= this.width || y >= this.height)
    && (this.content[MAIN_LAYER][x][y] == this.currentColor && !witness[x][y]);
};

Grid.prototype.getString = function () {
    var string = "";
    for (var i=0 ; i < this.height ; i++) {
        string += this.content[MAIN_LAYER][i].join(' ') + "\n";
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
            var color = colorsHash[this.content[MAIN_LAYER][i][j]][0];

            context.beginPath();
            context.rect(startI, startJ, Math.ceil(cellSize), Math.ceil(cellSize));
            context.fillStyle = color;
            context.fill();
        }
    }
};

function _createGridContent(width, height, colors) {
    var cube = new Array(1);
    cube[0] = new Array(width);
    for(var i = 0 ; i < width ; i++) {
        cube[0][i] = new Array(height);
        for (var j = 0 ; j < height ; j++) {
            cube[0][i][j] = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    return cube;
}