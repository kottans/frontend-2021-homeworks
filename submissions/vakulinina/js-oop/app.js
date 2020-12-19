const fieldWidth = 505;
const fieldTopPadding = 50;
const stepX = 101;
const stepY = 83;
const playerStartY = 4 * stepY + fieldTopPadding;
const playerStartX = 2 * stepX;
const enemySize = 80;
const enemyStartX = -stepX;
const enemyEndX = fieldWidth + stepX;
const enemyMinSpeed = 100;
const enemyMaxSpeed = 400;
const numberOfEnemies = 5;
let keysEnabled = true;
let score = 0;

const scoreBoard = document.createElement('h2');
scoreBoard.style = 'margin: 30px 0 0 0; font-family: Arial, sans-serif;'
scoreBoard.textContent = `Your score: ${score}`;
document.body.append(scoreBoard);

const Enemy = function (y, speed) {
    this.x = enemyStartX;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > enemyEndX) {
        this.x = enemyStartX;
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function () {
    this.checkCollisions();
};

Player.prototype.checkCollisions = function () {
    allEnemies.forEach(enemy => {
        if (this.y === enemy.y && this.x >= (enemy.x - enemySize * 0.7) && this.x <= enemy.x + enemySize) {
            this.x = playerStartX;
            this.y = playerStartY;
            updateScore();
        }
    })
};

Player.prototype.reset = function () {
    this.x = playerStartX;
    this.y = playerStartY;
    keysEnabled = true;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left' && this.x > 0) {
        this.x -= stepX;
    } else if (key === 'right' && this.x < (fieldWidth - stepX)) {
        this.x += stepX;
    } else if (key === 'up' && this.y > 0) {
        this.y -= stepY;
    } else if (key === 'down' && this.y !== playerStartY) {
        this.y += stepY;
    }

    if (this.y < fieldTopPadding) {
        keysEnabled = false;
        setTimeout(this.reset.bind(this), 600);
        updateScore('win');
    }
};

let player = new Player(playerStartX, playerStartY);

const allEnemies = [];
for (let i = 1; i <= numberOfEnemies; i++) {
    let enemyStartY = fieldTopPadding + (i % 3) * stepY;
    let enemy = new Enemy(enemyStartY, getRandomIntInclusive(enemyMinSpeed, enemyMaxSpeed));
    allEnemies.push(enemy);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateScore(result) {
    result === 'win' ? score++ : score = 0;
    scoreBoard.textContent = `Your score: ${score}`;
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (keysEnabled) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
