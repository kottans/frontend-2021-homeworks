
const FIELD_WIDTH = 505,
        START_POS_X = 202,
        START_POS_Y = 404;  
        CELL_WIDTH = 101; 
        CELL_HEIGHT = 83;


// Enemies our player must avoid
const Enemy = function(x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.player = player;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > FIELD_WIDTH) {
         this.x = 0;
         this.speed =  Math.floor(Math.random() * 256) + 20;
    }
    if (this.collision()) player.resetPosition();
};

Enemy.prototype.collision = function() {
    return (this.y + CELL_HEIGHT > this.player.y && this.player.x < this.x + CELL_WIDTH  && this.player.x > this.x - CELL_WIDTH);
}

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
    if (this.y < 0) {
        setTimeout(player.resetPosition(), 500);
    }
};

Player.prototype.resetPosition = function() {
    this.x = START_POS_X;
    this.y = START_POS_Y;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'up': if (this.y > 0) this.y -=CELL_HEIGHT; break;
        case 'down': if(this.y < 333) this.y += CELL_HEIGHT; break;
        case 'right': if(this.x < 404) this.x += CELL_WIDTH; break;
        case 'left': if (this.x > 0) this.x -= CELL_WIDTH; break;

        default: break;
    }
    
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(START_POS_X, START_POS_Y),
    enemy1 = new Enemy(0, 63, 100, player),
    enemy2 = new Enemy(0, 147, 170, player),
    enemy3 = new Enemy(0, 230, 19, player),
    allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
