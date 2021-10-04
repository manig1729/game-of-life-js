
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

function clearscr() {
    for (i = 0; i <= HEIGHT - 1; i++) {
        for (var j = 0; j <= WIDTH - 1; j++) {
            grid[i][j].isAlive = 0;
        }
    }
    drawCells();
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

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

window.onload = function () {
    canvasContext = canvas.getContext('2d');

    //sets canvas width
    if (mobileCheck == true) {
        throw "Mobile support is not added yet, please view the site on desktops";
    }
    
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

    //drawGlider(54, 3);
    //drawRandom();

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
    for (i = 15; i <= 35; i++) {
        for (j = 15; j <= 35; j++) {
            grid[i][j].isAlive = Math.floor(Math.random() * 1.99);
        }
    }
}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}
