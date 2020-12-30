const stepY = 85;
const stepX = 100;
const playerStartX = 200;
const playerStartY = 400;
const minX = 0;
const maxX = stepX * 4;
const minY = -25;
const maxY = playerStartY;
const enemyStartX = -Math.random() * 300 - 100;

const Enemy = function (x, y, player) {
    this.x = x;
    this.y = y;
    this.setSpeed();
    this.player = player;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    const canvasWidth = ctx.canvas.width;
    if (this.x < canvasWidth)
        this.x += this.speed * dt;
    else {
        this.x = enemyStartX;
        this.setSpeed();
    }
    this.checkCollision();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.setSpeed = function () {
    this.speed = Math.random() * 300 + 200;
}
Enemy.prototype.checkCollision = function () {
    if (Math.abs(this.player.x - this.x) < 80 && this.y === this.player.y) {
        alert('You lost');
        this.player.restart();
    };
};

const Player = function () {
    this.restart();
    this.sprite = "images/char-boy.png";
}
Player.prototype.update = function () {
    if (this.x < minX)
        this.x = minX;
    if (this.x > maxX)
        this.x = maxX;
    if (this.y > maxY)
        this.y = maxY;
    if (this.y == minY) {
        alert('You win');
        this.restart();
    }
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.x -= stepX;
            break;
        case 'up':
            this.y -= stepY;
            break;
        case 'right':
            this.x += stepX;
            break;
        case 'down':
            this.y += stepY;
            break;
    }
}
Player.prototype.restart = function () {
    this.x = playerStartX;
    this.y = playerStartY;
}

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const player = new Player();
const allEnemies = [];

for (let i = 1; i <= 3; i++) {
    const enemy = new Enemy(enemyStartX, i * stepY - 25, player)
    allEnemies.push(enemy);
}

