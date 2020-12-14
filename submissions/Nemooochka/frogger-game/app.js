const CELL_WIDTH = 101;
const CELL_HEIGHT = 83;
const PIC_OFFSET = 19;
const PIC_WIDTH = 80;
const FIELD_WIDTH = CELL_WIDTH * 5;
const START_POS_X = CELL_WIDTH * 2;
const START_POS_Y = CELL_HEIGHT * 5 - PIC_OFFSET;
const MIN_SPEED = 80;
const MAX_SPEED = 200;


const Enemy = function(y, player) {
    this.x = 0;
    this.y = y;
    this.speed = this.getRandomSpeed();
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if(this.x > FIELD_WIDTH) {
        this.x = 0;
        this.speed = this.getRandomSpeed();
    }
    this.checkCollision();
};

Enemy.prototype.getRandomSpeed = function() {
    return Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;
};

Enemy.prototype.checkCollision = function() {
    if((this.x >= this.player.x - PIC_WIDTH)
        && (this.x <= this.player.x + PIC_WIDTH)
        && (this.player.y === this.y)) this.player.resetPosition();
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


const Player = function() {
    this.resetPosition();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    this.checkBorder();
};

Player.prototype.checkBorder = function() {
    if(this.x < 0) this.x = 0;
    if(this.x >= FIELD_WIDTH) this.x = FIELD_WIDTH - CELL_WIDTH;
    if(this.y < 0) this.winGame();
    if(this.y >= START_POS_Y) this.y = START_POS_Y;
};

Player.prototype.resetPosition = function() {
    this.x = START_POS_X;
    this.y = START_POS_Y;
};

Player.prototype.winGame = function() {
    setTimeout(() => {
        alert('Congratulations!');
        this.resetPosition();
    }, 10);
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
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

let player = new Player(),
    enemy1 = new Enemy(64, player),
    enemy2 = new Enemy(147, player),
    enemy3 = new Enemy(230, player),
    allEnemies = [enemy1, enemy2, enemy3];


document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});