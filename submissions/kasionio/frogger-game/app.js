// Enemies our player must avoid
const ENEMY_START_POSITION_X = -100;

var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    const MIN_SPEED = 100;
    this.x = ENEMY_START_POSITION_X;
    this.y = y;
    this.speed = MIN_SPEED + Math.floor(Math.random() * 200);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 520) {
        this.x = ENEMY_START_POSITION_X;
    } else if (player.y === this.y && player.x - 60 < this.x && player.x + 50 > this.x) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (this.y > 0 && keyCode === 'up') {
        this.y -= 85;
    }
    if (this.y < 400 && keyCode === 'down') {
        this.y += 85;
    }
    if (this.x > 0 && keyCode === 'left') {
        this.x -= 100;
    }
    if (this.x < 400 && keyCode === 'right') {
        this.x += 100;
    }
    if (this.y < 0) {
        this.reset()
    }
}

let counter = 0;
Player.prototype.reset = function() {
    setTimeout(() => {
        this.x = 200;
        this.y = 400;
    }, 100);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy(230);
let enemy2 = new Enemy(145);
let enemy3 = new Enemy(60);
const allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
