
var cellSide = 10;
var grid = [];
var gridCopy = [];
var paused = true;

// GLOBAL VARIABLES HEIGHT AND WIDTH
var HEIGHT = 60;
var WIDTH = 80;

var canvas = document.getElementById('gameCanvas');

function togglePause()
{
    if (!paused)
    {
        paused = true;
    } else if (paused)
    {
       paused = false;
    }
}
//sets height and width then sets up the grid with new size. resets current grid.
function fullscreen(){
    if (WIDTH == 80) {
        canvas.height = window.innerHeight; 
        canvas.width = window.innerWidth;
        HEIGHT = window.innerHeight/10;
        WIDTH = window.innerWidth/10;
    } else {
        canvas.height = 600;
        canvas.width = 600;
        HEIGHT = 60;
        WIDTH = 80;
    }
    gridSetup();
}
window.addEventListener('keydown', function (e) {
    var key = e.key;
    if (key === ' ')// space key
    {
        togglePause();
    }
    });

//calculates cursorpoint - length to element
function getCursorInCanvas(point){
    var rect = point.target.getBoundingClientRect();
    newLifeX = Math.floor((point.clientX-rect.left)/cellSide);
    newLifeY = Math.floor((point.clientY-rect.top)/cellSide);
    return [newLifeY,newLifeX];
}

    
canvas.addEventListener("mousemove", cursor => {
    if (cursor.buttons == 1){
        points = getCursorInCanvas(cursor);
        newLifeY = points[0];
        newLifeX = points[1];
        grid[newLifeY][newLifeX].isAlive = 1;
    }
});

canvas.addEventListener("click", cursor => {
        points = getCursorInCanvas(cursor)
        newLifeY = points[0];
        newLifeX = points[1];

        if (grid[newLifeY][newLifeX].isAlive == 1) {
            grid[newLifeY][newLifeX].isAlive = 0;
        }
        else {
            grid[newLifeY][newLifeX].isAlive = 1;
        }
});

window.onload = function () {
    canvasContext = canvas.getContext('2d');

    //sets canvas width
    
    gridSetup();

    var framesPerSecond = 20;
    drawCells();
    setInterval(function () {
        if (!paused) {
            drawCells();
            calculateCells();
        }
        else if (paused) {
            drawCells();
        }
    }, 1000 / framesPerSecond);
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
        if (this.isAlive == 1) {
            this.color = 'white';
        }
        else {
            this.color = 'black'
        }

        colorRect(this.x, this.y, this.width - 1, this.height - 1, this.color);
    }
}
// Set up the grid
function gridSetup() {
    for (var i = 0; i <= HEIGHT - 1; i++) {
        grid[i] = [];
    }

    for (i = 0; i <= HEIGHT - 1; i++) {
        for (var j = 0; j <= WIDTH - 1; j++) {
            grid[i][j] = new Cell(j * cellSide, i * cellSide, 'black');
        }
    }

    drawGlider(54, 3);
    drawRandom();

    for (var i = 0; i <= HEIGHT - 1; i++) {
        gridCopy[i] = [];
    }

    for (i = 0; i <= HEIGHT - 1; i++) {
        for (var j = 0; j <= WIDTH - 1; j++) {
            if (grid[i][j].isAlive == 0) {
                gridCopy[i][j] = 0;
            }
            else if (grid[i][j].isAlive == 1) {
                gridCopy[i][j] = 1;
            }
        }
    }
}

// function to draw cells and background
function drawCells() {
    // Draw the background
    colorRect(0, 0, canvas.width, canvas.height, 'green');

    for (var i = 0; i <= HEIGHT - 1; i++) {
        for (var j = 0; j <= WIDTH - 1; j++) {
            grid[i][j].draw();
        }
    }
}

function calculateCells() {
    for (i = 0; i <= HEIGHT - 1; i++) {
        for (var j = 0; j <= WIDTH - 1; j++) {
            if (grid[i][j].isAlive == 0) {
                gridCopy[i][j] = 0;
            }
            else if (grid[i][j].isAlive == 1) {
                gridCopy[i][j] = 1;
            }
        }
    }

    for (var i = 0; i <= HEIGHT - 1; i++) {
        for (var j = 0; j <= WIDTH - 1; j++) {
            if (i > 1 && j > 1) {
                if (i < HEIGHT - 3 && j < WIDTH - 3) {
                    var sum = 0;
                    sum = gridCopy[i - 1][j - 1] + gridCopy[i - 1][j] + gridCopy[i - 1][j + 1] + gridCopy[i][j - 1] + gridCopy[i][j + 1] + gridCopy[i + 1][j - 1] + gridCopy[i + 1][j] + gridCopy[i + 1][j + 1];
                    if (gridCopy[i][j] == 1) {
                        if (sum <= 1 || sum >= 4)
                            grid[i][j].isAlive = 0;
                        else
                            grid[i][j].isAlive = 1;
                    }
                    else if (gridCopy[i][j] == 0) {
                        if (sum == 3) {
                            grid[i][j].isAlive = 1;
                        }
                    }
                }
            }
        }
    }
}

function drawGlider(i, j) {
    grid[i][j].isAlive = 1;
    grid[i][j + 1].isAlive = 1;
    grid[i][j + 2].isAlive = 1;
    grid[i + 1][j + 2].isAlive = 1;
    grid[i + 2][j + 1].isAlive = 1;
}

function drawRandom() {
    for (i = 25; i <= 35; i++) {
        for (j = 25; j <= 35; j++) {
            grid[i][j].isAlive = Math.floor(Math.random() * 1.99);
        }
    }
}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}
