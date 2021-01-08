// Enemies our player must avoid.........

const PLAYER_CONF = {
    START_X: 202,
    START_Y: 405,
    MOVE_LEFT_RIGTH: 102,
    MOVE_UP_DOWN: 83,
    PAUSE: 600,
    MAX_X_RIGHT: 405,
    MAX_Y_DOWN: 405,
};

const ENEMY_CONF = {
	MAX_X: 510,
	MIN_X: -50,
	SPEED_COEFF: 100,
	SPEED_FACTOR: 222,
	WIDTH: 80,
	HEIGHT: 60,
    START_X: 0,
    SPEED_START: 200,
};

class Character {
	constructor (x, y, sprite) {
		this.x = x;
		this.y = y;
		this.sprite = sprite;
	}

	render () {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
} 

class Player extends Character {
	constructor(x, y, sprite = 'images/char-boy.png') {
		super(x, y, sprite);
	}
	update(dt) {

	}
	handleInput (keyPress) {
		if (keyPress == 'left' && this.x > 0) {
        	this.x -= PLAYER_CONF.MOVE_LEFT_RIGTH;
    	};
    	if (keyPress == 'right' && this.x < PLAYER_CONF.MAX_X_RIGHT) {
        	this.x += PLAYER_CONF.MOVE_LEFT_RIGTH;
    	};
    	if (keyPress == 'up' && this.y > 0) {
        	this.y -= PLAYER_CONF.MOVE_UP_DOWN;
    	};
    	if (keyPress == 'down' && this.y < PLAYER_CONF.MAX_Y_DOWN) {
        	this.y += PLAYER_CONF.MOVE_UP_DOWN;
    	};
    	if (this.y < 0) {
        	setTimeout(function(){
            	player.x = PLAYER_CONF.START_X;
            	player.y = PLAYER_CONF.START_Y;
        	}, PLAYER_CONF.PAUSE);
    	}
	}
}

class Enemy extends Character {
	constructor (x, y, speed, sprite = 'images/enemy-bug.png') {
		super(x, y, sprite);
		this.speed = speed;
	}

	update (dt) {
		this.x = this.x + this.speed * dt;

    	if (this.x > ENEMY_CONF.MAX_X) {
        	this.x = ENEMY_CONF.MIN_X;
        	this.speed = ENEMY_CONF.SPEED_COEFF + Math.floor(Math.random() * ENEMY_CONF.SPEED_FACTOR);
    	}

    	this.checkCollisions();
	}

	checkCollisions () {
		if (player.x < this.x + ENEMY_CONF.WIDTH &&
        	player.x + ENEMY_CONF.WIDTH > this.x &&
        	player.y < this.y + ENEMY_CONF.HEIGHT &&
        	player.y + ENEMY_CONF.HEIGHT > this.y) {
        		player.x = PLAYER_CONF.START_X;
        		player.y = PLAYER_CONF.START_Y;
    		}
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
const ENEMY_LOCATION = [63, 147, 230];

ENEMY_LOCATION.forEach(function(locationY){
    enemy = new Enemy(ENEMY_CONF.START_X, locationY, ENEMY_CONF.SPEED_START);
    allEnemies.push(enemy);
});

let player = new Player(PLAYER_CONF.START_X, PLAYER_CONF.START_Y);
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
