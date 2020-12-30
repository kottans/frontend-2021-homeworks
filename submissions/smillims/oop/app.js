const block = {
	width: 101,
	height: 85
};
const positionEnemyY = [60, 140, 220];
const positionPlayer = {
	playerX: 200,
	playerY: 400,
};

const widthEnemies = [80];

// Enemies our player must avoid
const Enemy = function(x, y, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

	 this.x = x;
	 this.y = y;
	 this.player = player;
	 this.speed = (block.width * 1.5) + (Math.random() * block.width); //speed between 100 and 250;

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
	 if (this.x > ctx.canvas.width + block.width){
		 this.x = -block.width * 2;
	 }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
	
Enemy.prototype.checkCollisions = function() {
	if(Math.abs(this.x - this.player.x) < widthEnemies &&
		Math.abs(this.y - this.player.y) < widthEnemies ||
		this.player.y < 0){
			setTimeout(() => {
				this.player.startOver();
			}, 120);
	};
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
	switch(key) {
		case "up":
			if(this.y > 0) {
				this.y -= block.height;
			}
			break;
		case "right":
			if (this.x < block.width*3){
				this.x += block.width;
			}
			break;
		case "down":
			if(this.y < block.height*4){
				this.y += block.height;
			}
			break;
		case "left":
			if (this.x > 0){
				this.x -= block.width;
			}
			break;
	}
};

Player.prototype.startOver = function() {
	this.x = positionPlayer.playerX;
	this.y = positionPlayer.playerY;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(positionPlayer.playerX, positionPlayer.playerY);

const allEnemies = positionEnemyY.map((pos) => new Enemy(0, pos, player));

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
