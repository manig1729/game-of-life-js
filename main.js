
var cellSide = 10;
var grid = [];

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    gridSetup();

    var framesPerSecond = 1;
    setInterval(function(){
        drawCells();
        calculateCells();
    }, 1000/framesPerSecond);
}

class Cell {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = cellSide;
        this.height = cellSide;
    }

    draw() {
        colorRect(this.x, this.y, this.width - 1, this.height - 1, this.color);
    }
}

function gridSetup() {
    for(var i = 0; i<=59; i++){
        grid[i] = [];
    }

    for(i = 0; i <= 59; i++){
        for(var j = 0; j<=59; j++) {
            grid[i][j] = new Cell(j*cellSide, i*cellSide, 'black');
        }
    }
}

function drawCells() {
    for(var i = 0; i <= 59; i++){
        for(var j = 0; j<=59; j++) {
            grid[i][j].draw();
        }
    }
}

function calculateCells () {

}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}