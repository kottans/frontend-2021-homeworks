const canvas = {
    width: 505,
    height: 450
}

const Entity = function (x, y, speed, sprite) {
    this.position = {
        x,
        y
    };
    this.speed = speed;
    this.sprite = sprite;
    this.level = 1;
}

Entity.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
}

Entity.prototype.increaseLevel = function () {
    this.level++;
}

Entity.prototype.checkWallCollision = function (wallX, wallY, newX, newY) {
    if (this.position.x >= wallX) {
        this.position.x = newX;
    } else if (this.position.y >= wallY) {
        this.position.y = newY;
    }
}

/*Enemy*/

const Enemy = function (x, y, speed, sprite, player) {
    Entity.call(this, x, y, speed, sprite);
    this.player = player;
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.update = function (dt) {
    this.position.x += this.speed * dt * (this.level * 0.8);
    this.checkWallCollision(canvas.width, canvas.height, -90, 0);
    this.checkLose();
}

Enemy.prototype.checkCollision = function () {
    let positionX = Math.floor(this.position.x);
    if (positionX - 50 < player.position.x && player.position.x < positionX + 50) {
        if (this.position.y - 55 < player.position.y && player.position.y < this.position.y + 20) {
            alert(`You lose!\nYour level is ${this.player.level}`);
            return true;
        }
    }
    return false;
}
Enemy.prototype.checkLose = function () {
    let lose = this.checkCollision();
    if (lose) {
        player.restartPosition();
        player.level = 1;
        player.enemies.forEach(enemy => enemy.level = 1);
    }
}

/*Player*/

const Player = function (x, y, speed, sprite) {
    Entity.call(this, x, y, speed, sprite);
    this.startX = this.position.x;
    this.startY = this.position.y;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.update = function () {
    this.checkWin();
    this.checkWallCollision();
}

Player.prototype.checkWin = function () {
    if (this.position.y < -10) {
        alert(`You win!\nYour level is ${this.level}`);
        this.increaseLevel();
        this.enemies.forEach(enemy => enemy.increaseLevel());
        this.restartPosition();
    }
}
Player.prototype.restartPosition = function () {
    this.position.x = this.startX;
    this.position.y = this.startY;
}

Player.prototype.checkWallCollision = function () {
    Entity.prototype.checkWallCollision.bind(this)(canvas.width - 80, canvas.height - 5, canvas.width - 85, canvas.height - 5);
    if (this.position.x < -30) {
        this.position.x = -20;
    }
}

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.position.x -= 20;
            break;
        case 'right':
            this.position.x += 20;
            break;
        case 'up':
            this.position.y -= 20;
            break;
        case 'down':
            this.position.y += 20;
            break;
    }
}

const player = new Player(200, 404, 7, 'images/char-boy.png');

const enemy1 = new Enemy(30, 120, 60, 'images/enemy-bug.png', player);
const enemy2 = new Enemy(15, 220, 30, 'images/enemy-bug.png', player);
const enemy3 = new Enemy(0, 50, 20, 'images/enemy-bug.png', player);
const allEnemies = [enemy1, enemy2, enemy3];

player.enemies = allEnemies;

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
