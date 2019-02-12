
var canvas = null;
var ctx = null;
var mouseX = null;

var frames = 50;

var ballX = 150;
var ballY = 50;
var ballStepX = 5;
var ballStepY = 5;
var ballRadius = 10;

var paddleX = null;
var paddleWidth = 100;
var paddleHeight = 10;
var paddleOffset = 40;

var stars = [];

function mouseCoords(event) {
    var canvasOffset = canvas.getBoundingClientRect();
    var htmlElement = document.documentElement;
    mouseX = event.clientX - canvasOffset.left - htmlElement.scrollLeft;
    paddleX = mouseX - paddleWidth / 2;
}

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

function drawAll() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawBall(ballX, ballY, ballRadius, 'firebrick');
    drawRect(paddleX, canvas.height - paddleOffset, paddleWidth, paddleHeight, '#fff');
}

function moveAll() {
    var paddleLeftEdge = paddleX;
    var paddleRightEdge = paddleLeftEdge + paddleWidth;
    var paddleTopEdge = canvas.height - paddleOffset;
    var paddleBottomEdge = paddleTopEdge + paddleHeight;

    ballX += ballStepX;
    ballY += ballStepY;

    if (ballX < 0 || ballX > canvas.width) {
        ballStepX *= -1;
    }
    if (ballY < 0 || ballY > canvas.height) {
        ballStepY *= -1;
    }
    if (ballX > paddleLeftEdge && ballX < paddleRightEdge && ballY > paddleTopEdge && ballY < paddleBottomEdge) {
        ballStepY *= -1;
        var paddleCenter = paddleLeftEdge + paddleWidth / 2;
        var ballDistance = ballX - paddleCenter;
        ballStepX = ballDistance * 0.35;
    }
}

function updateAll() {
    setInterval(function () {
        moveAll();
        drawAll();          
    }, 1000 / frames);
}

window.addEventListener('DOMContentLoaded', function () {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    if (ctx) {
        canvas.width = 600;
        canvas.height = 800;

        updateAll();
        canvas.addEventListener('mousemove', mouseCoords, false);    
    }
}, false);
