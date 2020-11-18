// Enemies our player must avoid
var Enemy = function(x,y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';    
  this.x = x;
  this.y = y;
  this.v = Math.random()*500;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.v;
  if (this.x >= 500) {
      this.x = -100;
      this.v = Math.random()*500;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Player.prototype.update = function(dt) {
  allEnemies.forEach(enemy => {
      if ( Math.abs(this.y - enemy.y) < 15 &&  Math.abs(this.x - enemy.x) < 80) {
          this.x = 200;
          this.y = 400;
      }
  });
  if (this.y === -15) {
      alert('YOU WIN!!');
      this.x = 200;
      this.y = 400;
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
  var stepX = 100;
  var stepY = 83;
  var minX = 0;
  var maxX = 400;
  var minY = -15;
  var maxY = 400;
  var addStep = function(startPosition, min, max, step){
      var newPosition = startPosition + step;
      return newPosition >= max ? max : newPosition  <= min ? min : newPosition
  }
  switch(move) {
      case 'left':
          this.x = addStep(this.x, minX, maxX, -stepX);
          break;
      case 'up':
          this.y = addStep(this.y, minY, maxY, -stepY);
          break;
      case 'right':
          this.x = addStep(this.x, minX, maxX, stepX);
          break;
      case 'down':
          this.y = addStep(this.y, minY, maxY, stepY);
          break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(-100, 60), new Enemy(-100, 145), new Enemy(-100, 225),new Enemy(-100, 60), new Enemy(-100, 145), new Enemy(-100, 225)];
// Place the player object in a variable called player
var player = new Player(200, 400);

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
