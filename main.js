
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
        this.width = cellSide;
        this.height = cellSide;
    }

    draw() {
        if(this.isAlive){
            this.color = 'white';
        }
        else {
            this.color = 'black'
        }

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

    drawGlider(30,30);
}

function drawCells() {
    // Drawing the background
    colorRect(0, 0, canvas.width, canvas.height, 'green');

    for(var i = 0; i <= 59; i++){
        for(var j = 0; j<=59; j++) {
            grid[i][j].draw();
        }
    }
}

function calculateCells () {

}

function drawGlider(i, j) {
    grid[i][j].isAlive = true;
    grid[i][j+1].isAlive = true;
    grid[i][j+2].isAlive = true;
    grid[i+1][j+2].isAlive = true;
    grid[i+2][j+1].isAlive = true;
}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}