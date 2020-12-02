// Enemies our player must avoid

let Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        this.speed = (Math.floor(Math.random() * 51) + 80) * 100 * dt;
    }

    if (player.y == this.y &&
        player.x < this.x + 75 &&
        this.x < player.x + 75) {
        player.x = 202;
        player.y = 400;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    this.sprite = ('images/char-cat-girl.png');
};

Player.prototype.update = function () {
    if (this.y == 0) {
        this.y = 400;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key == 'left' && this.x > 0) {
        this.x -= 101;
    }
    if (key == 'up' && this.y > 0) {
        this.y -= 85;
    }
    if (key == 'right' && this.x < 400) {
        this.x += 101;
    }
    if (key == 'down' && this.y < 400) {
        this.y += 85;
    }
    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 400
        }, 200)
    }
};

// Now instantiate your objects.
// let enemyBoy = new Player();
// let bugs = new Enemy(202, 400, 1000);

const allEnemies = [];

let bugLocation = [60, 145, 230,];

bugLocation.forEach(function (bugY) {
    let enemy = new Enemy(-100, bugY, 1000);
    allEnemies.push(enemy);
});

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(202, 400);

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
