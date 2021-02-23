const CANVAS = {
  blockWidth: 101,
  blockHeight: 82,
  numberOfBlocksX: 5,
  numberOfBlocksY: 6,
  paddingBottom: 62
};

const ENEMY_CONF = {
  minSpeed: 100,
  topInitialY: 60,
  middleInitialY: 145,
  bottomInitialY: 230,
  padding: 50
};

const PLAYER_CONF = {
  initialX: 202,
  initialY: 410
};

const WATER_EDGE = 52;
const INITIAL_ENEMY_X = - CANVAS.blockWidth;
const EDGE_X = CANVAS.blockWidth * CANVAS.numberOfBlocksX
const EDGE_Y = CANVAS.blockHeight * CANVAS.numberOfBlocksY - CANVAS.paddingBottom

// Enemies our player must avoid
const Enemy = function(y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started   
  const RANDOM_ADDITIONAL_SPEED = Math.floor(Math.random() * 200);
  this.x = INITIAL_ENEMY_X;
  this.y = y;
  this.speed = ENEMY_CONF.minSpeed + RANDOM_ADDITIONAL_SPEED;

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
      this.x = -CANVAS.blockWidth;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y, enemies) {
  this.x = x;
  this.y = y;
  this.enemies = enemies;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  this.checkCollision();
};

Player.prototype.checkCollision = function() {
  this.enemies.forEach(function(enemy) {
      if (this.y - ENEMY_CONF.padding < enemy.y &&
          this.y + ENEMY_CONF.padding > enemy.y &&
          this.x - ENEMY_CONF.padding < enemy.x &&
          this.x + ENEMY_CONF.padding > enemy.x) {
            this.lose();
      }
  }, this);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {

  if (this.y >= 0 && keyCode === 'up') {
      this.y -= CANVAS.blockHeight;
  }
  if (this.y < EDGE_Y - CANVAS.blockHeight && keyCode === 'down') {
      this.y += CANVAS.blockHeight;
  }
  if (this.x > 0 && keyCode === 'left') {
      this.x -= CANVAS.blockWidth;
  }
  if (this.x < EDGE_X - CANVAS.blockWidth && keyCode === 'right') {
      this.x += CANVAS.blockWidth;
  }
  if (this.y < WATER_EDGE) {
      this.wins();
  }
};

Player.prototype.resetPosition = function() {
  this.x = PLAYER_CONF.initialX;
  this.y = PLAYER_CONF.initialY;
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
  new Enemy(ENEMY_CONF.topInitialY),
  new Enemy(ENEMY_CONF.middleInitialY),
  new Enemy(ENEMY_CONF.bottomInitialY)
];

const player = new Player(PLAYER_CONF.initialX, PLAYER_CONF.initialY, allEnemies);

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
