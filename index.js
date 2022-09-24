var blockSize = 25;
var col = 20;
var row = 20;
var board;
var context;

//snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;

//food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var gameOver = false;

var count = 0;

var displayCount = document.getElementById('score');
var stop = document.getElementById('stop');
var restart = document.getElementById('restart');
var slowSpeed = document.getElementById('slow');
var mediumSpeed = document.getElementById('medium');
var highSpeed = document.getElementById('high');

var setSpeed = 100;

slowSpeed.addEventListener('click', () => {
    setSpeed = 10;
});
mediumSpeed.addEventListener('click', () => {
    setSpeed = 100;
});
highSpeed.addEventListener('click', () => {
    setSpeed = 1000;
});


window.onload = function(){
    board = document.getElementById('board');
    board.height = row*blockSize;
    board.width = col*blockSize;
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keyup', changeDirection);
    
    setInterval(update, setSpeed);

    displayCount.innerHTML = count;
}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize); 

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        placeFood();

        displayCount.innerHTML = ++count;
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if(snakeX < -25 || snakeX > col*blockSize || snakeY < -25 || snakeY > row*blockSize){
        gameOver = true;
        alert('Game Over');
    }
    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert('Game Over');
        }
    }
}

function changeDirection(e){
    slowSpeed.setAttribute('disabled', '');
    mediumSpeed.setAttribute('disabled', '');
    highSpeed.setAttribute('disabled', '');

    slowSpeed.style.color = '#bbb';
    mediumSpeed.style.color = '#bbb';
    highSpeed.style.color = '#bbb';

    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random()*col)*blockSize;
    foodY = Math.floor(Math.random()*row)*blockSize;
}

restart.addEventListener('click', () => {
    location.reload();
})