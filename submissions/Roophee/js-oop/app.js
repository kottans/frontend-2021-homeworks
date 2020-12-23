const CELL_WIDTH = 101,
    CELL_HEIGHT = 83,
    CELL_PADDING_BOTTOM = 25;
PLAYER_START_X = CELL_WIDTH * 2,
    PLAYER_START_Y = CELL_HEIGHT * 5 - CELL_PADDING_BOTTOM,
    ENEMY_START_X = -CELL_WIDTH,
    FIRST_ENEMY_Y = CELL_HEIGHT * 1 - CELL_PADDING_BOTTOM,
    SECOND_ENEMY_Y = CELL_HEIGHT * 2 - CELL_PADDING_BOTTOM,
    THIRD_ENEMY_Y = CELL_HEIGHT * 3 - CELL_PADDING_BOTTOM,

    MAX_SPEED = 200,
    MIN_SPEED = 120,
    CANVAS_AREA = {
        width: CELL_WIDTH * 5,
        height: CELL_HEIGHT * 6
    };

const Entity = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed = this.generateRandSpeed();
}

Entity.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Entity.prototype.generateRandSpeed = function () {
    return Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED;
}

var Enemy = function (x, y) {
    Entity.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.playerLose = function () {
    player.resetGame();
}

Enemy.prototype.ateThePlayer = function () {
    if (this.x + CELL_WIDTH >= player.x + 25 && this.x <= player.x - 25 + CELL_WIDTH && this.y === player.y) {
        confirm('You were brave, but your enemies are cunning and merciless. Do you want to play again?');
        this.playerLose();
        for (let enemy in allEnemies) {
            this.speed = this.generateRandSpeed();
            this.x = ENEMY_START_X;
        };
    }
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x >= CANVAS_AREA.width) {
        this.x = -CELL_WIDTH
    };
    this.ateThePlayer();
};

const Player = function (x, y) {
    Entity.call(this, x, y);
    this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Entity.prototype);

Player.prototype.resetGame = function () {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
};

Player.prototype.win = function () {
    setTimeout(() => {
        alert(' Congratulations !!! You have reached the river.');
        this.resetGame();
    }, 10);
};

Player.prototype.stayOnTheField = function () {
    if (this.x >= CANVAS_AREA.width) this.x = CANVAS_AREA.width - CELL_WIDTH;
    if (this.x < 0) this.x = 0;
    if (this.y > CANVAS_AREA.height - CELL_PADDING_BOTTOM - 1) this.y = CANVAS_AREA.height - CELL_HEIGHT - CELL_PADDING_BOTTOM;
    if (this.y <= 0) this.win();
};

Player.prototype.update = function () {
    this.stayOnTheField();
};

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'up':
            this.y -= CELL_HEIGHT;
            break;
        case 'down':
            this.y += CELL_HEIGHT;
            break;
        case 'left':
            this.x -= CELL_WIDTH;
            break;
        case 'right':
            this.x += CELL_WIDTH;
            break;
    }
};

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let player = new Player(PLAYER_START_X, PLAYER_START_Y),
    enemy1 = new Enemy(ENEMY_START_X, FIRST_ENEMY_Y),
    enemy2 = new Enemy(ENEMY_START_X, SECOND_ENEMY_Y),
    enemy3 = new Enemy(ENEMY_START_X, THIRD_ENEMY_Y),
    allEnemies = [enemy1, enemy2, enemy3];
