const defaultPlayerState = {
  sprite: 'images/char-boy.png',
  x: 200,
  y: 400,
  speed: 25,
}

const playingArea = {
  minX: 0, 
  minY: -10,
  maxX: 400,
  maxY: 400,
}

// Actor is parent class for Enemies abd Player
const Actor = function({sprite, x, y, speed}) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.speed = speed;
}

Actor.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function({x, y, speed}) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (state) {
  Actor.call(this,state);
};
Player.prototype = Object.create( Actor.prototype);
Player.prototype.constructor = Actor;

Player.prototype.update = function() {
  
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= this.speed;
      if (this.x < playingArea.minX) {
        this.x = playingArea.minX + this.speed;
      }
      break;
    case 'right':
      this.x += this.speed;
      if (this.x > playingArea.maxX) {
        this.x = playingArea.maxX - this.speed;
      }
      break;
    case 'up':
      this.y -= this.speed;
      if (this.y <= playingArea.minY) {
        alert('You won!');
        this.x = defaultPlayerState.x;
        this.y = defaultPlayerState.y;
      }
      break;
    case 'down':
      this.y += this.speed;
      if (this.y > playingArea.maxY) {
        this.y = playingArea.maxY - this.speed;
      }
      break;
    default:
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// Place the player object in a variable called player
const player = new Player(defaultPlayerState);

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
