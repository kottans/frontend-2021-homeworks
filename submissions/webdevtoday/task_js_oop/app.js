// parameters of field
const FIELD_WIDTH = 505;
const FIELD_HEIGHT = 606;

// Enemy speed points and points out of field
const ENEMY_MIN_SPEED = 1;
const ENEMY_MAX_SPEED = 10;
const ENEMY_DISTANCE_OUT_OF_FIELD_TO_THE_RIGHT = 50;
const ENEMY_DISTANCE_OUT_OF_FIELD_TO_THE_LEFT = -100;

// Player shifts to begin
const PLAYER_CENTERING_SHIFT = 50;
const PLAYER_INITIAL_BOTTOM_PADDING = 220;

// Collision Player Move
const LIMITING_LEFT_PADDING = 100;
const LIMITING_TOP_PADDING = 50;
const LIMITING_RIGHT_PADDING = 200;
const LIMITING_BOTTOM_PADDING = 250;

// Collision Win point
const WIN_POINT_Y_1 = -14;
const WIN_POINT_Y_2 = 0;

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
    this.speed = randomInteger(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED);
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
    if (this.x > FIELD_WIDTH + ENEMY_DISTANCE_OUT_OF_FIELD_TO_THE_RIGHT) {
        this.speed = randomInteger(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED);
        this.x = ENEMY_DISTANCE_OUT_OF_FIELD_TO_THE_LEFT;
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
    this.initX = FIELD_WIDTH / 2 - PLAYER_CENTERING_SHIFT;
    this.initY = FIELD_HEIGHT - PLAYER_INITIAL_BOTTOM_PADDING;
    this.x = this.initX;
    this.y = this.initY;
    this.leftRightStepSize = 100;
    this.upDownStepSize = 80;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {};
Player.prototype.render = function() {
    this.checkCollision();
    ctx.drawImage( Resources.get(this.sprite), this.x, this.y );
};

Player.prototype.checkCollision = function() {
    allEnemies.forEach(enemy => {
        const offset = 20;
        if (this.x >= enemy.x - offset && this.x <= enemy.x + offset * 3 && this.y <= enemy.y + offset && this.y >= enemy.y || this.y >= WIN_POINT_Y_1 && this.y <= WIN_POINT_Y_2) {
            this.x = this.initX;
            this.y = this.initY;
        }
    });
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x >= LIMITING_LEFT_PADDING) this.x -= this.leftRightStepSize;
            break;
        case 'up':
            if (this.y >= LIMITING_TOP_PADDING) this.y -= this.upDownStepSize;
            break;
        case 'right':
            if (this.x <= FIELD_WIDTH - LIMITING_RIGHT_PADDING) this.x += this.leftRightStepSize;
            break;
        case 'down':
            if (this.y <= FIELD_HEIGHT - LIMITING_BOTTOM_PADDING) this.y += this.upDownStepSize;
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
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

