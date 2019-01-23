
var cellSide = 10;
var grid = [];
var gridCopy = [];

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    gridSetup();

    var framesPerSecond = 11;
    setInterval(function(){
        drawCells();
        calculateCells();
    }, 1000/framesPerSecond);
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = 0;
        this.width = cellSide;
        this.height = cellSide;
    }

    draw() {
        if(this.isAlive == 1){
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

    drawGlider(54,3);

    for(var i = 0; i<=59; i++){
        gridCopy[i] = [];
    }

    for(i = 0; i <= 59; i++){
        for(var j = 0; j<=59; j++) {
            if(grid[i][j].isAlive == 0){
                gridCopy[i][j] = 0;
            }
            else if(grid[i][j].isAlive == 1){
                gridCopy[i][j] = 1;
            }
        }
    }
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
    for(i = 0; i <= 59; i++){
        for(var j = 0; j<=59; j++) {
            if(grid[i][j].isAlive == 0){
                gridCopy[i][j] = 0;
            }
            else if(grid[i][j].isAlive == 1){
                gridCopy[i][j] = 1;
            }
        }
    }

    for(var i = 0; i <= 59; i++){
        for(var j = 0; j<=59; j++) {
            if(i > 1 && j > 1){
                if(i < 57 && j < 57){
                    var sum = 0;
                    sum = gridCopy[i-1][j-1] + gridCopy[i-1][j] + gridCopy[i-1][j+1] + gridCopy[i][j-1] + gridCopy[i][j+1] + gridCopy[i+1][j-1] + gridCopy[i+1][j] + gridCopy[i+1][j+1];
                    if(gridCopy[i][j] == 1){
                        if(sum <= 1 || sum >= 4)
                        grid[i][j].isAlive = 0;
                        else
                        grid[i][j].isAlive = 1;
                    }   
                    else if(gridCopy[i][j] == 0){
                    if(sum == 3){
                    //console.log("hi");
                    grid[i][j].isAlive = 1;}
                    }
                }
            }
        }
    }
}

function drawGlider(i, j) {
    grid[i][j].isAlive = 1;
    grid[i][j+1].isAlive = 1;
    grid[i][j+2].isAlive = 1;
    grid[i+1][j+2].isAlive = 1;
    grid[i+2][j+1].isAlive = 1;
}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}