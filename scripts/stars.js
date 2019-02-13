
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
    for (let i = 0; i < 1000; i++) {      
        stars[i] = {
            x: getRandCoord(),
            y: getRandCoord(),
            speed: getStarSpeed(),
            angle: randInt(0, 180),
            color: getStarColor(),
        };

        moveStars();
        moveStars();
        moveStars();
        moveStars();
        moveStars();
    }  
}

function getRandCoord() {
    let pos = 1;
    if (randInt(1, 2) == 1) {
        pos = -1;
    }    
    return pos;
}

function printStars() {
    for (let i = 0; i < stars.length; i++) {
        drawBall(
            stars[i].x + canvas.width / 2, 
            stars[i].y + canvas.height / 2, 
            1, 
            stars[i].color,
        );
    }
}

function getStarSpeed() {
    return 1 / randInt(3, 6);
}

function getStarColor() {
    
    let colors = [
        '#ffffff',
        '#98a2fc',
        '#98fcae',
        '#e2fc98',
        '#fcdd98',
        '#fcaa98',
    ];

    return colors[randInt(0, 5)];
}

function moveStars() {
    for (let i = 0; i < stars.length; i++) {        
        let hypotenuse = calcHypotenuse(stars[i].speed, stars[i].angle);
        
        stars[i].speed *= 1.005;
        
        if (stars[i].x > 0) {
            stars[i].x += hypotenuse.x;  
        } else {
            stars[i].x -= hypotenuse.x;  
        }        
        stars[i].y += hypotenuse.y;
        
 
        if (Math.abs(stars[i].x) > canvas.width / 2 || Math.abs(stars[i].y) > canvas.height / 2) {
            stars[i].x = getRandCoord();
            stars[i].y = getRandCoord();
            
            hypotenuse = calcHypotenuse(randInt(1, canvas.width / 2), stars[i].angle);
            if (stars[i].x > 0) {
                stars[i].x += hypotenuse.x;  
            } else {
                stars[i].x -= hypotenuse.x;  
            }        
            stars[i].y += hypotenuse.y;
            
            stars[i].speed = getStarSpeed();
        }

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
