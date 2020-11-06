function randomSpeed() {
    return Math.random() * (200 - 50) + 50;
}

// Enemies our player must avoid
let Enemy = function (x, y, player, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 65;
    this.player = player;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -150;
    }
    this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
    let pos1 = this.player.x < this.x + this.width,
        pos2 = this.x < this.player.x + this.width,
        pos3 = this.player.y < this.y + this.width,
        pos4 = this.y < this.player.y + this.width;
    if (pos1 && pos2 && pos3 && pos4) {
        alert("You lose!");
        player.restart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.stepX = 100;
    this.stepY = 80;
    this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function () {
    if (this.x < 0) this.x = 0;
    if (this.x > 200 * 2) this.x = 200 * 2;
    if (this.y > 380) this.y = 380;
    // If the character is above zero on the Y-axis,
    // then it is considered that he won
    if (this.y < 0) {
        setTimeout(() => {
            alert("You win!");
            this.restart();
        }, 10);
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left') {
        player.x -= this.stepX;
    }
    if (key === 'up') {
        player.y -= this.stepY;
    }
    if (key === 'right') {
        player.x += this.stepX;
    }
    if (key === 'down') {
        player.y += this.stepY;
    }
};

Player.prototype.restart = function () {
    player.x = 200;
    player.y = 380
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200, 380);
const allEnemies = [];

[50, 130, 220].map((enemyCoordinate) => {
    let enemy = new Enemy(0, enemyCoordinate, player, randomSpeed());
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
