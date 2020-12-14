const block = {
	width: 101,
	height: 85
}

// Enemies our player must avoid
const Enemy = function(x, y, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

	 this.x = x;
	 this.y = y;
	 this.player = player;
	 this.speed = 150 + (Math.random() * 100); //speed between 100 and 250;

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
		 this.x = -101 * 2;
	 }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const checkCollisions = () => {
	allEnemies.forEach(enemy => {
		if(Math.abs(enemy.x - player.x) < 50 &&
			Math.abs(enemy.y - player.y) < 50 ||
			player.y < block.height - 85){
			player.startOver();
		}
	})
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(x, y, player) {
	this.x = x;
	this.y = y;
	this.player = player;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

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
	this.x = 200;
	this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200, 400);

const enemy1 = new Enemy(0, 60);
const enemy2 = new Enemy(0, 140);
const enemy3 = new Enemy(0, 220);
const allEnemies = [
	enemy1,
	enemy2,
	enemy3
];

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
