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

const Enemy = function (x, y, speed, sprite, player) {
    Entity.call(this, x, y, speed, sprite);
    this.player = player;
}

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.update = function (dt) {
    this.position.x += this.speed * dt * (this.level * 0.8);
    if (this.position.x >= canvas.width) {
        this.position.x = -90;
    }
    let lose = this.checkCollision();
    if (lose) {
        this.player.enemies.forEach(enemy => enemy.level = 1);
    }
    this.increaseLevel();
}
Enemy.prototype.checkCollision = function () {
    let positionX = Math.floor(this.position.x);
    if (positionX - 50 < this.player.position.x && this.player.position.x < positionX + 50) {
        if (this.position.y - 55 < this.player.position.y && this.player.position.y < this.position.y + 20) {
            alert(`You lose!\nYour level is ${this.player.level}`);
            this.player.restartPosition();
            this.player.level = 1;
            return true;
        }
    }
    return false;
}

Enemy.prototype.increaseLevel = function () {
    if (this.player.level != this.level) {
        this.level++;
    }
}


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
        this.level++;
        this.restartPosition();
    }
}
Player.prototype.restartPosition = function () {
    this.position.x = this.startX;
    this.position.y = this.startY;
}

Player.prototype.checkWallCollision = function () {
    if (this.position.x < -30) {
        this.position.x = -20;
    } else if (this.position.x > canvas.width - 80) {
        this.position.x = canvas.width - 85;
    } else if (this.position.y > canvas.height - 5) {
        this.position.y = canvas.height - 5;
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

const START_POSITION_PLAYER = {
    X: 200,
    Y: 404
};
const START_POSITION_ENEMY_1 = {
    X: 0,
    Y: 120
};
const START_POSITION_ENEMY_2 = {
    X: 15,
    Y: 220
};
const START_POSITION_ENEMY_3 = {
    X: 30,
    Y: 50
};
const PLAYER_SPEED = 7;
const ENEMY_1_SPEED = 20;
const ENEMY_2_SPEED = 60;
const ENEMY_3_SPEED = 30;


const player = new Player(START_POSITION_PLAYER.X, START_POSITION_PLAYER.Y, PLAYER_SPEED, 'images/char-boy.png');
const enemy1 = new Enemy(START_POSITION_ENEMY_1.X, START_POSITION_ENEMY_1.Y, ENEMY_1_SPEED, 'images/enemy-bug.png', player);
const enemy2 = new Enemy(START_POSITION_ENEMY_2.X, START_POSITION_ENEMY_2.Y, ENEMY_2_SPEED, 'images/enemy-bug.png', player);
const enemy3 = new Enemy(START_POSITION_ENEMY_3.X, START_POSITION_ENEMY_3.Y, ENEMY_3_SPEED, 'images/enemy-bug.png', player);
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
