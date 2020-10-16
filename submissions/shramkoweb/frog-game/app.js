const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 85;
const ENEMIES_CONF = {
    MAX_SPEED: 250,
    MIN_SPEED: 50,
    OFFSET_Y: 20,
    SPRITE: 'images/enemy-bug.png',
    START_X: 0,
};
const PLAYER_CONF = {
    HEIGHT: 60,
    SPRITE: 'images/char-boy.png',
    START_X: BLOCK_WIDTH * 2,
    START_Y: BLOCK_WIDTH * 4,
    WIDTH: 80,
};

const Character = function (x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (x, y, player) {
    Character.call(this, x, y, ENEMIES_CONF.SPRITE);
    this.speed = this.getRandomSpeed();
    this.player = player;
};

Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.getRandomSpeed = function () {
    return Math.random() * (ENEMIES_CONF.MAX_SPEED - ENEMIES_CONF.MIN_SPEED) + ENEMIES_CONF.MIN_SPEED;
};

Enemy.prototype.isCollision = function () {
    if (
        this.player.x < this.x + PLAYER_CONF.WIDTH &&
        this.player.x + PLAYER_CONF.WIDTH > this.x &&
        this.player.y < this.y + PLAYER_CONF.HEIGHT &&
        this.player.y + PLAYER_CONF.HEIGHT > this.y
    ) {
        alert('You lose!')
        this.player.x = PLAYER_CONF.START_X;
        this.player.y = PLAYER_CONF.START_Y;
    }
};

Enemy.prototype.update = function (dt) {
    if (this.x > ctx.canvas.width) {
        this.x = 0;
        this.speed = this.getRandomSpeed();
    } else {
        this.x += this.speed * dt;
    }
};

const Player = function (x, y) {
    Character.call(this, x, y, PLAYER_CONF.SPRITE);
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.checkWin = function () {
    if (player.y <= 0) {
        window.requestAnimationFrame(() => {
            const needRestart = confirm('You win!');
            if (needRestart) {
                this.x = PLAYER_CONF.START_X;
                this.y = PLAYER_CONF.START_Y;
            }
        })
    }
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.x > 0) {
                this.x -= BLOCK_WIDTH;
            }
            break;
        case 'right':
            if (this.x < ctx.canvas.width - BLOCK_WIDTH) {
                this.x += BLOCK_WIDTH;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= BLOCK_HEIGHT;
            }
            break;
        case 'down':
            if (this.y < PLAYER_CONF.START_Y) {
                this.y += BLOCK_HEIGHT;
            }
            break;
    }
};

const player = new Player(PLAYER_CONF.START_X, PLAYER_CONF.START_Y);
const allEnemies = [1, 2, 3].map(positionY => {
    return new Enemy(ENEMIES_CONF.START_X, (positionY * BLOCK_HEIGHT) - ENEMIES_CONF.OFFSET_Y, player);
});

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
