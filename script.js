const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const gridSize = 30; // grid of 30x30
let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = { x: 1, y: 0 }; // starting moving to the right
let score = 0;

function createGrid() {
    board.innerHTML = ''; // clear the board before redrawing
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.style.width = '10px';
            cell.style.height = '10px';
            cell.style.position = 'absolute';
            cell.style.top = `${i * 10}px`;
            cell.style.left = `${j * 10}px`;
            board.appendChild(cell);
        }
    }
}

function drawSnake() {
    snake.forEach(segment => {
        const snakePart = document.createElement('div');
        snakePart.classList.add('snake');
        snakePart.style.top = `${segment.y * 10}px`;
        snakePart.style.left = `${segment.x * 10}px`;
        board.appendChild(snakePart);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.top = `${food.y * 10}px`;
    foodElement.style.left = `${food.x * 10}px`;
    board.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // add new head to the snake array

    // If snake eats food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        generateFood(); // generate new food
    } else {
        snake.pop(); // remove last segment
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        resetGame();
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -1 };
    } else if (event.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 1 };
    } else if (event.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -1, y: 0 };
    } else if (event.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 1, y: 0 };
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
    };
}

function resetGame() {
    snake = [{ x: 5, y: 5 }];
    direction = { x: 1, y: 0 };
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
}

function gameLoop() {
    createGrid();
    drawSnake();
    drawFood();
    moveSnake();
}

document.addEventListener('keydown', changeDirection);

setInterval(gameLoop, 100); // refresh game every 100ms
