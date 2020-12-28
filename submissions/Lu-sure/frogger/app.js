const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;

const FIELD_WIDTH = 5 * BLOCK_WIDTH;
const FIELD_HEIGHT = 6 * BLOCK_HEIGHT;

const HEIGHT_SHIFT = 18;

const MOVE_AREA = {width: {start: 0 , end: FIELD_WIDTH - BLOCK_WIDTH}, height: {start: FIELD_HEIGHT - BLOCK_HEIGHT - HEIGHT_SHIFT, end: 0}};

const ENEMY_CONFIG = {
    sprite: 'images/enemy-bug.png',
    startPointX: - BLOCK_WIDTH,
    linesToGo: {first: BLOCK_HEIGHT - HEIGHT_SHIFT, second: 2* BLOCK_HEIGHT - HEIGHT_SHIFT, third: 3* BLOCK_HEIGHT - HEIGHT_SHIFT},
    minSpeed: 100,
    maxSpeed: 450
};

const PLAYER_CONFIG = {
    sprite: 'images/char-boy.png',
    startPos: {x: 2 * BLOCK_WIDTH, y: MOVE_AREA.height.start},
    winPositionY: BLOCK_HEIGHT-HEIGHT_SHIFT,
    thickness: 60
};

const DELAY_OF_COLLISION = 50;
const DELAY_OF_WIN = 200;

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const Hero = function(sprite) {
    this.sprite = sprite;
};

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (y, speed, sprite) {
    Hero.call(this, sprite);
    this.x = ENEMY_CONFIG.startPointX;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype = Object.create(Hero.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > MOVE_AREA.width.end)
        this.x = ENEMY_CONFIG.startPointX;
    checkCollision();
};

const Player = function (sprite) {
    Hero.call(this, sprite);
    this.goToStart();
    this.move = true;
};

Player.prototype = Object.create(Hero.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () { };

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (this.x > MOVE_AREA.width.start) {
                this.x -= BLOCK_WIDTH;
            }
            break;
        case 'right':
            if (this.x < MOVE_AREA.width.end) {
                this.x += BLOCK_WIDTH;
            }
            break;
        case 'up':
            if (this.y > MOVE_AREA.height.end) {
                this.y -= BLOCK_HEIGHT;
            }
            if (this.y < PLAYER_CONFIG.winPositionY) {
                this.move = false;
                setTimeout(() => this.goToStart(), DELAY_OF_WIN);
            }
            break;
        case 'down':
            if (this.y < MOVE_AREA.height.start) {
                this.y += BLOCK_HEIGHT;
            }
            break;
    }
    checkCollision();
};

Player.prototype.goToStart = function () {
    this.x = PLAYER_CONFIG.startPos.x;
    this.y = PLAYER_CONFIG.startPos.y;
    this.move = true;
};

const allEnemies = [
    new Enemy(ENEMY_CONFIG.linesToGo.first, getRandomInteger(ENEMY_CONFIG.minSpeed, ENEMY_CONFIG.maxSpeed), ENEMY_CONFIG.sprite),
    new Enemy(ENEMY_CONFIG.linesToGo.second, getRandomInteger(ENEMY_CONFIG.minSpeed, ENEMY_CONFIG.maxSpeed), ENEMY_CONFIG.sprite),
    new Enemy(ENEMY_CONFIG.linesToGo.third, getRandomInteger(ENEMY_CONFIG.minSpeed, ENEMY_CONFIG.maxSpeed), ENEMY_CONFIG.sprite),
];

const player = new Player(PLAYER_CONFIG.sprite);

const checkCollision = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) < PLAYER_CONFIG.thickness && player.y === allEnemies[i].y) {
            player.move = false;
            setTimeout(() => player.goToStart(), DELAY_OF_COLLISION);
        };
    };
};

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.move === false) {
        return;
    }
    player.handleInput(allowedKeys[e.keyCode]);
});
