// Tile size
const tile = {
    width: 101,
    height: 85
}

// Enemies our player must avoid
const Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.changeSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.changeSpeed = function () {
    this.speed = Math.random() * (400 - 100) + 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    if (this.x > tile.width * 5) {
        this.changeSpeed()
        this.x = -tile.width * 1
    }
    this.x += this.speed * dt;
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
const Player = function (x, y) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.stepX = tile.width;
    this.stepY = tile.height;

    this.sprite = "images/char-boy.png";
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.x > 0) this.x -= this.stepX;
            break;
        case 'right':
            if (this.x < tile.width * 4) this.x += this.stepX;
            break;
        case 'up':
            if (this.y > 0) this.y -= this.stepY;
            break;
        case 'down':
            if (this.y < tile.width * 3) this.y += this.stepY;
            break;
    }
}

Player.prototype.resetPosition = function () {
    this.x = this.initialX;
    this.y = this.initialY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(-tile.width * 2, tile.height * 0.5)
const enemy2 = new Enemy(-tile.width * 2, tile.height * 1.5)
const enemy3 = new Enemy(-tile.width * 2, tile.height * 2.5)
const allEnemies = [enemy1, enemy2, enemy3]
const player = new Player(tile.width * 2, tile.height * 4.5)


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const checkCollisions = () => {
    if (player.y < 0 ||
        allEnemies.some(enemy => {
            if (
                Math.abs(Math.abs(enemy.x) - Math.abs(player.x)) < 60
                && Math.abs(Math.abs(enemy.y) - Math.abs(player.y)) < 60
            ) {
                console.log('player', player.x, player.y, 'enemy', enemy.x, enemy.y)
                return true;
            }
        })
    ) {
        console.log
        player.resetPosition()
        console.log('reseted')
    }
}
