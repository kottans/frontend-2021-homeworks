// parameters of field
const FIELD_WIDTH = 505;
const FIELD_HEIGHT = 606;

// Enemy speed points and points out of field
const ENEMY_MIN_SPEED = 1;
const ENEMY_MAX_SPEED = 10;
const ENEMY_DISTANCE_OUT_OF_FIELD_TO_THE_RIGHT = 50;
const ENEMY_DISTANCE_OUT_OF_FIELD_TO_THE_LEFT = -100;
const ENEMY_INITIAL_X_POSITION = -50;
const ENEMY_INITIAL_Y_POSITION_START = 50;
const ENEMY_INITIAL_Y_POSITION_FINISH = 220;
const ENEMY_Y_POSITION_STEP = 85;
const ENEMY_HEATBOX = 60;
const ENEMY_SPRITE = 'images/enemy-bug.png';
const allEnemies = [];

// Player shifts to begin
const PLAYER_CENTERING_SHIFT = 50;
const PLAYER_INITIAL_BOTTOM_PADDING = 220;
const PLAYER_X_STEP_SIZE = 100;
const PLAYER_Y_STEP_SIZE = 80;
const PLAYER_SPRITE = 'images/char-boy.png';
const PLAYER_INIT_X = FIELD_WIDTH / 2 - PLAYER_CENTERING_SHIFT;
const PLAYER_INIT_Y = FIELD_HEIGHT - PLAYER_INITIAL_BOTTOM_PADDING;

// Collision Player Move
const LIMITING_LEFT_PADDING = 100;
const LIMITING_TOP_PADDING = 50;
const LIMITING_RIGHT_PADDING = 200;
const LIMITING_BOTTOM_PADDING = 250;

// Collision Win point
const WIN_POINT_Y_1 = -14;
const WIN_POINT_Y_2 = 0;

function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}


const Character = function(x, y) {
    this.x = x;
    this.y = y;
};
Character.prototype.update = function(dt) {};
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
const Enemy = function(x, y, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // x: -50; y: 50
    Character.call(this, x, y);
    this.speed = randomInteger(ENEMY_MIN_SPEED, ENEMY_MAX_SPEED);
    this.player = player;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = ENEMY_SPRITE;
};
Enemy.prototype = Object.create(Character.prototype);

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
    this.checkCollision();
    ctx.drawImage(Resources.get(this.sprite), (this.x += this.speed) * dt, this.y);
};
Enemy.prototype.checkCollision = function() {
    if (this.player.x >= this.x - ENEMY_HEATBOX && this.player.x <= this.x + ENEMY_HEATBOX && this.player.y >= this.y - ENEMY_HEATBOX && this.player.y <= this.y + ENEMY_HEATBOX || this.player.y >= WIN_POINT_Y_1 && this.player.y <= WIN_POINT_Y_2) {
        this.player.x = PLAYER_INIT_X;
        this.player.y = PLAYER_INIT_Y;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    Character.call(this, PLAYER_INIT_X, PLAYER_INIT_Y);
    this.sprite = PLAYER_SPRITE;
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x >= LIMITING_LEFT_PADDING) this.x -= PLAYER_X_STEP_SIZE;
            break;
        case 'up':
            if (this.y >= LIMITING_TOP_PADDING) this.y -= PLAYER_Y_STEP_SIZE;
            break;
        case 'right':
            if (this.x <= FIELD_WIDTH - LIMITING_RIGHT_PADDING) this.x += PLAYER_X_STEP_SIZE;
            break;
        case 'down':
            if (this.y <= FIELD_HEIGHT - LIMITING_BOTTOM_PADDING) this.y += PLAYER_Y_STEP_SIZE;
            break;
    }
};

// var allEnemies = [new Enemy(-50, 50), new Enemy(-50, 135), new Enemy(-50, 220)];
const player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
for (let i = ENEMY_INITIAL_Y_POSITION_START; i <= ENEMY_INITIAL_Y_POSITION_FINISH; i += ENEMY_Y_POSITION_STEP) {
    allEnemies.push(new Enemy(ENEMY_INITIAL_X_POSITION, i, player));
}

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

