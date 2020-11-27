// Enemies our player must avoid

const numEnemies = 5;
const Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  Resources.load(this.sprite);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > 640) {
    this.startPosition();
  }
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
};

Enemy.prototype.startPosition = function () {
  this.x = Math.floor(Math.random() * -700);
  this.y = Math.floor(Math.random() * 335 + 60);
  this.speed = Math.floor(Math.random() * 200 + 50);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function () {
  this.speed = 10;
  this.sprite = 'images/char-horn-girl.png';
  Resources.load(this.sprite);
};

Player.prototype.update = function (dx, dy) {
  const minX = -10,
    maxX = 420,
    minY = -10,
    maxY = 400;

  this.x += dx * this.speed;
  this.y += dy * this.speed;
  if (this.x < minX) {
    this.x = minX;
  }
  if (this.x > maxX) {
    this.x = maxX;
  }
  if (this.y < minY) {
    this.y = minY;
  }
  if (this.y > maxY) {
    this.y = maxY;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
  let dx = 0,
    dy = 0,
    d = 1;
  switch (direction) {
    case 'left':
      dx = -d;
      break;
    case 'up':
      dy = -d;
      break;
    case 'right':
      dx = d;
      break;
    case 'down':
      dy = d;
      break;
    default:
      break;
  }
  this.update(dx, dy);
};

Player.prototype.checkCollisions = function (enemies) {
  return enemies.some(
    function (enemy) {
      const dx = this.x - enemy.x;
      const dy = this.y - enemy.y;
      const checkPointX = dx > 0 ? this.x + 18 : this.x + 84;
      const checkPointY = dy > 0 ? this.y + 85 : this.y + 137;
      if (
        checkPointX >= enemy.x + 18 &&
        checkPointX <= enemy.x + 84 &&
        checkPointY >= enemy.y + 85 &&
        checkPointY <= enemy.y + 137
      ) {
        return true;
      } else {
        return false;
      }
    }.bind(this)
  );
};

Player.prototype.startPosition = function () {
  this.x = 200;
  this.y = 400;
};

Player.prototype.inWater = function () {
  return this.y <= -10;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];
for (let i = 0; i < numEnemies; i++) {
  allEnemies.push(new Enemy());
}
const player = new Player();

document.addEventListener('keydown', function (e) {
  let direction;
  switch (e.code) {
    case 'KeyA':
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'KeyW':
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'KeyD':
    case 'ArrowRight':
      direction = 'right';
      break;
    case 'KeyS':
    case 'ArrowDown':
      direction = 'down';
      break;
  }
  player.handleInput(direction);
});
