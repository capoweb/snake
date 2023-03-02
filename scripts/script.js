const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
let text = document.querySelector('.score-count');

const foodImg = new Image();
foodImg.src = "carrot.png" 

const ground = new Image();
ground.src = "ground.png"

let box = 32;
let score = 0;

// const scoreConverter = () =>{
//     text.innerHTML = score;
// }
// scoreConverter()

let food = {
    x: Math.floor((Math.random() * 16 + 3)) * box,
    y: Math.floor((Math.random() * 16 + 3)) * box,
};
console.log(food.x, food.y)


let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction)

let dir;

function direction(event){
    if(event.keyCode == 37 )
    dir = "left";
    else if(event.keyCode == 38 )
    dir = "up";
    else if(event.keyCode == 39 )
    dir = "right";
    else if(event.keyCode == 40 )
    dir = "down";
}


function drawGame() {
      ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
        

    for(let i=0; i<snake.length ;i++){
        ctx.fillStyle = i == 0 ? "#2e765c" :"#a7f2ca";
        ctx.fillRect(snake[i].x, snake[i].y, box, box )
    }
    // ctx.fillStyle = "white";
    // ctx.font = "50px Arial";
    // ctx.fillText(text, box * 2.5, box * 1.5 )

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

      if(snakeX == food.x && snakeY == food.y){
        text.innerHTML = score;
        score++;
        food = {
          x: Math.floor((Math.random() * 17 + 1)) * box,
          y: Math.floor((Math.random() * 15 + 1)) * box,
      };
      }else{
        snake.pop()
      }

    if(snakeX < box || snakeX > box * 17 
      ||snakeY < 3 * box || snakeY > box * 17){
        clearInterval(game);
        alert("Game over")
      }


    if(dir == "left") snakeX -=box;
    if(dir == "right") snakeX +=box;
    if(dir == "up") snakeY -=box;
    if(dir == "down") snakeY +=box;
  
    let newHead = {
        x:snakeX,
        y:snakeY
    };
    snake.unshift(newHead)
}

let game = setInterval(drawGame, 200);
