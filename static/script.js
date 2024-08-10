const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake;
let direction;
let food;
let score;
let game;

const eatSound = new Howl({
    src: ['https://www.soundjay.com/button/beep-07.wav'],
    volume: 0.5
});

const gameOverSound = new Howl({
    src: ['https://www.soundjay.com/button/beep-10.wav'],
    volume: 0.5
});

function startGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };
    direction = "RIGHT";
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
    score = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('game-over').style.display = "none";
    game = setInterval(drawGame, 100);
}

document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.keyCode == 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode == 38 && direction != "DOWN") {
        direction = "UP";
    } else if (event.keyCode == 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode == 40 && direction != "UP") {
        direction = "DOWN";
    }
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "limegreen" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').textContent = score;
        eatSound.play();
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= 20 * box || snakeY < 0 || snakeY >= 20 * box || collision(newHead, snake)) {
        clearInterval(game);
        gameOverSound.play();
        document.getElementById('game-over').style.display = "block";
    } else {
        snake.unshift(newHead);
    }
}

function startNewGame() {
    startGame();
}

// Start the game initially
startGame();
