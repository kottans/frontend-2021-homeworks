function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // x: -50; y: 50
    this.x = x;
    this.y = y;
    this.speed = randomInteger(1, 10);
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
    if (this.x > 555) {
        this.speed = randomInteger(1, 10);
        this.x = -100;
    }
    ctx.drawImage(Resources.get(this.sprite), (this.x += this.speed) * dt, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.initX = 505 / 2 - 50;
    this.initY = 606 - 220;
    this.x = this.initX;
    this.y = this.initY;
    this.leftRightStepSize = 100;
    this.upDownStepSize = 80;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {};
Player.prototype.render = function() {
    allEnemies.forEach(enemy => {
        const offset = 20;
        if (this.x >= enemy.x - offset && this.x <= enemy.x + offset * 3 && this.y <= enemy.y + offset && this.y >= enemy.y || this.y >= -14 && this.y <= 0) {
            this.x = this.initX;
            this.y = this.initY;
        }
    });
    ctx.drawImage( Resources.get(this.sprite), this.x, this.y );
};
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x >= 100) this.x -= this.leftRightStepSize;
            break;
        case 'up':
            if (this.y >= 50) this.y -= this.upDownStepSize;
            break;
        case 'right':
            if (this.x <= 505 - 200) this.x += this.leftRightStepSize;
            break;
        case 'down':
            if (this.y <= 606 - 250) this.y += this.upDownStepSize;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(-50, 50), new Enemy(-50, 135), new Enemy(-50, 220)];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        // 37: 'left',
        // 38: 'up',
        // 39: 'right',
        // 40: 'down'
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
