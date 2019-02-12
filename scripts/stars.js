
var canvas = null;
var ctx = null;
var frames = 50;

var stars = [];

function drawRect(leftX, leftY, boxWidth, boxHeight, boxFillColor) {
    ctx.fillStyle = boxFillColor;
    ctx.fillRect(leftX, leftY, boxWidth, boxHeight);
}

function drawBall(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 360 * Math.PI / 180, true);
    ctx.fill();
    ctx.closePath();
}

function randInt(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function setStars() {
    for (let i = 0; i < 500; i++) {
        let xPos = 1;
        let yPos = 1;
        if (randInt(1, 2) == 1) {
            xPos = -1;
        }
        if (randInt(1, 2) == 2) {
            yPos = -1;
        }        
        stars[i] = {
            x: xPos,
            y: yPos,
            speed: 1 / randInt(3, 6),
            angle: randInt(0, 180),
        };
        moveStars();
    }  
}

function printStars() {
    for (let i = 0; i < stars.length; i++) {
        drawBall(stars[i].x, stars[i].y, 1, '#fff');
    }
}

function moveStars() {
    for (let i = 0; i < stars.length; i++) {        
        let hypotenuse = calcHypotenuse(stars[i].speed, stars[i].angle);
        
        stars[i].x += hypotenuse.x;
        stars[i].y += hypotenuse.y;
    }
}

function calcHypotenuse(lenght, angle) {
    let radian = angle * Math.PI / 180;
   
    let result = {
        x: (lenght * Math.sin(radian)),
        y: (lenght * Math.cos(radian)),
    };
    
    return result;
}

function updateAll() {
    setInterval(function () {      
        
        drawRect(0, 0, canvas.width, canvas.height, '#000');
        printStars();
        moveStars();
        
    }, 1000 / frames);
}

window.addEventListener('DOMContentLoaded', function () {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    if (ctx) {
        canvas.width = 800;
        canvas.height = 500;

        setStars();
        updateAll();   
    }
}, false);
