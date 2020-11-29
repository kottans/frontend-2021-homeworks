const FIELD_WIDTH = 101;
const FIELD_HEIGHT = 83;
const SHIFT = 18;

var Enemy = function (y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -FIELD_WIDTH;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 5 * FIELD_WIDTH) {
        this.x = -FIELD_WIDTH;
    };
    collision();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.goToStart();
    this.move = true;
};

Player.prototype.update = function () { };

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0) {
                this.x -= FIELD_WIDTH;
            }
            collision();
            break;
        case 'right':
            if (this.x < 4 * FIELD_WIDTH) {
                this.x += FIELD_WIDTH;
            }
            collision();
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= FIELD_HEIGHT;
            }
            collision();
            if (this.y < FIELD_HEIGHT - SHIFT) {
                this.move = false;
                setTimeout(() => this.goToStart(), 400);
            }
            break;
        case 'down':
            if (this.y < 5 * FIELD_HEIGHT - SHIFT) {
                this.y += FIELD_HEIGHT;
            }
            collision();
            break;
    }
};

Player.prototype.goToStart = function () {
    this.x = 2 * FIELD_WIDTH;
    this.y = 5 * FIELD_HEIGHT - SHIFT;
    this.move = true;
};

var allEnemies = [
    new Enemy(FIELD_HEIGHT - SHIFT, 200),
    new Enemy(2 * FIELD_HEIGHT - SHIFT, 240),
    new Enemy(3 * FIELD_HEIGHT - SHIFT, 180),
];
var player = new Player();

var collision = function () {
    for (let i = 0; i < allEnemies.length; i++) {
        if (Math.abs(player.x - allEnemies[i].x) < FIELD_WIDTH - 18 && player.y == allEnemies[i].y) {
            player.move = false;
            setTimeout(() => player.goToStart(), 200);
        };
    };
};

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.move == false) {
        return;
    }
    player.handleInput(allowedKeys[e.keyCode]);
});
