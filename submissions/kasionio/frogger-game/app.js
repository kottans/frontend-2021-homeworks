const CANVAS = {
    BLOCK_WIDTH: 101,
    BLOCK_HEIGHT: 82,
    NUMBER_OF_BLOCKS_X: 5,
    NUMBER_OF_BLOCKS_Y: 6,
    PADDING_BOTTOM: 62
};

const ENEMY_CONF = {
    MIN_SPEED: 100,
    TOP_INITIAL_Y: 60,
    MIDDLE_INITIAL_Y: 145,
    BOTTOM_INITIAL_Y: 230,
    PADDING: 50
};

const PLAYER_CONF = {
    INITIAL_X: 202,
    INITIAL_Y: 410
};

const WATER_EDGE = 52;
const INITIAL_ENEMY_X = -CANVAS.BLOCK_WIDTH;
const EDGE_X = CANVAS.BLOCK_WIDTH * CANVAS.NUMBER_OF_BLOCKS_X;
const EDGE_Y = CANVAS.BLOCK_HEIGHT * CANVAS.NUMBER_OF_BLOCKS_Y - CANVAS.PADDING_BOTTOM;

// Enemies our player must avoid
const Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started   
    const RANDOM_ADDITIONAL_SPEED = Math.floor(Math.random() * 200);
    this.x = INITIAL_ENEMY_X;
    this.y = y;
    this.speed = ENEMY_CONF.MIN_SPEED + RANDOM_ADDITIONAL_SPEED;

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
    if (this.x > EDGE_X) {
        this.x = -CANVAS.BLOCK_WIDTH;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    this.checkCollision();
};

Player.prototype.checkCollision = function() {
    allEnemies.forEach(function(enemy) {
        if (this.y - ENEMY_CONF.PADDING < enemy.y &&
            this.y + ENEMY_CONF.PADDING > enemy.y &&
            this.x - ENEMY_CONF.PADDING < enemy.x &&
            this.x + ENEMY_CONF.PADDING > enemy.x) {
           	 this.lose();
        }
    }, this);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

    if (this.y >= 0 && keyCode === 'up') {
        this.y -= CANVAS.BLOCK_HEIGHT;
    }
    if (this.y < EDGE_Y - CANVAS.BLOCK_HEIGHT && keyCode === 'down') {
        this.y += CANVAS.BLOCK_HEIGHT;
    }
    if (this.x > 0 && keyCode === 'left') {
        this.x -= CANVAS.BLOCK_WIDTH;
    }
    if (this.x < EDGE_X - CANVAS.BLOCK_WIDTH && keyCode === 'right') {
        this.x += CANVAS.BLOCK_WIDTH;
    }
    if (this.y < WATER_EDGE) {
        this.wins();
    }
};

Player.prototype.resetPosition = function() {
    this.x = PLAYER_CONF.INITIAL_X;
    this.y = PLAYER_CONF.INITIAL_Y;
};

Player.prototype.wins = function() {

    setTimeout(() => {
        alert('You win!');
        this.resetPosition();
    }, 100);
};

Player.prototype.lose = function() {
    setTimeout(() => {
        this.resetPosition();
    }, 100);
    alert('You lose! Keep trying!');
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [
    new Enemy(ENEMY_CONF.TOP_INITIAL_Y),
    new Enemy(ENEMY_CONF.MIDDLE_INITIAL_Y),
    new Enemy(ENEMY_CONF.BOTTOM_INITIAL_Y)
];

const player = new Player(PLAYER_CONF.INITIAL_X, PLAYER_CONF.INITIAL_Y);

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
