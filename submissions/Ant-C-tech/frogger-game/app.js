const FIELD_LEFT_BORDER = 0
const FIELD_RIGHT_BORDER = 400
const FIELD_TOP_BORDER = 60;

const FIELD_CELL_WIDTH = 100;
const FIELD_CELL_HEIGHT = 85;

const MIN_ENEMY_SPEED = 130;
const MAX_ENEMY_SPEED = 450;
const ENEMY_START_MIN = FIELD_LEFT_BORDER - 400;
const ENEMY_START_MAX = FIELD_LEFT_BORDER - 100;
const ENEMY_FINISH = FIELD_RIGHT_BORDER + 200;
const ENEMY_MIN = 3;
const ENEMY_MAX = 9;
const NUMBER_OF_ENEMIES = _getRandomIntInclusive(ENEMY_MIN, ENEMY_MAX);

const PLAYER_START_X = 200;
const PLAYER_START_Y = 400;
const PLAYER_WIDTH = 50;

const BODY = document.querySelector('body');


const Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speedValue = _getRandomIntInclusive(MIN_ENEMY_SPEED, MAX_ENEMY_SPEED);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.move(dt);
    this.checkFinish();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.move = function(dt) {
    this.x = this.x + this.speedValue * dt;
};

Enemy.prototype.checkFinish = function() {
    if (this.x > ENEMY_FINISH) {
        this.x = _getRandomIntInclusive(ENEMY_START_MIN, ENEMY_START_MAX);
        this.speedValue = _getRandomIntInclusive(MIN_ENEMY_SPEED, MAX_ENEMY_SPEED);
    };
};


const Player = function(x, y, allEnemies) {
    this.x = x;
    this.y = y;
    this.allEnemies = allEnemies
    this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
    this.checkCollision();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.lastX = this.x;
    this.lastY = this.y;

    switch (true) {
        case key === 'left':
            this.x -= FIELD_CELL_WIDTH;
            break;
        case key === 'right':
            this.x += FIELD_CELL_WIDTH;
            break;
        case key === 'up':
            this.y -= FIELD_CELL_HEIGHT;
            break;
        case key === 'down':
            this.y += FIELD_CELL_HEIGHT;
            break;
        default:
            break;
    };

    if (this.x > FIELD_RIGHT_BORDER || this.x < FIELD_LEFT_BORDER) {
        this.x = this.lastX;
    };
    if (this.y > PLAYER_START_Y) {
        this.y = this.lastY;
    };

    this.checkWin();
};

Player.prototype.checkCollision = function() {
    for (const bug of this.allEnemies) {
        if (bug.y === this.y) {
            if (bug.x <= this.x + PLAYER_WIDTH && bug.x >= this.x - PLAYER_WIDTH) {
                this.x = PLAYER_START_X;
                this.y = PLAYER_START_Y;

                _addMessage('Sorry! You lose!');
            };
        };
    };
};

Player.prototype.checkWin = function() {
    if (this.y < FIELD_TOP_BORDER) {
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;

        _addMessage('Congratulations! You won!');
    };
};


let allEnemies = [];
for (let index = 0; index < NUMBER_OF_ENEMIES; index++) {
    const bugY = (FIELD_TOP_BORDER + (index % 3) * FIELD_CELL_HEIGHT);
    const bug = new Enemy(_getRandomIntInclusive(ENEMY_START_MIN, ENEMY_START_MAX), bugY);
    allEnemies.push(bug);
};

const player = new Player(PLAYER_START_X, PLAYER_START_Y, allEnemies);

document.addEventListener('keydown', function(e) {
    e.preventDefault();
});
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function _addMessage(message) {
    const mesWrapper = document.createElement('h3')
    mesWrapper.innerText = message
    BODY.appendChild(mesWrapper)
}
