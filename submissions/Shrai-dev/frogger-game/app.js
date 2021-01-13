const canvas = {
  width: 505,
  height: 450,
};
const stepX = 102;
const stepY = 83;
const spriteSize = 80;
const playerStartX = 202;
const playerStartY = 404;
const enemyStartX = -30;
const enemyEndX = 530;
const enemyMinSpeed = 100;
const enemyMaxSpeed = 250;

// Enemies our player must avoid
const Enemy = function (enemyStartX, y, speed, player) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = enemyStartX;
  this.y = y;
  this.speed = speed;
  this.player = player;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x > enemyEndX) {
    this.x = enemyStartX;
  }
  this.checkCollisions();
};

Enemy.prototype.checkCollisions = function () {
  if (
    this.player.x < this.x + spriteSize &&
    this.player.x + spriteSize > this.x &&
    this.player.y < this.y + spriteSize * 0.75 &&
    this.player.y + spriteSize * 0.75 > this.y
  ) {
    this.player.x = playerStartX;
    this.player.y = playerStartY;
  }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

const Player = function (playerStartX, playerStartY) {
  this.x = playerStartX;
  this.y = playerStartY;
  this.sprite = "images/char-boy.png";
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function () {
  
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  if (keyPress == "left" && this.x > 0) {
    this.x -= stepX;
  }
  if (keyPress == "right" && this.x < canvas.width - stepX) {
    this.x += stepX;
  }
  if (keyPress == "up" && this.y > 0) {
    this.y -= stepY;
  }
  if (keyPress == "down" && this.y < canvas.height - stepY) {
    this.y += stepY;
  }
  if (this.y < -10) {
    setTimeout(() => {
      this.x = playerStartX;
      this.y = playerStartY;
    }, 800);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const player = new Player(playerStartX, playerStartY);
const allEnemies = [];

const enemyLocationY = [63, 147, 230];
enemyLocationY.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, getEnemySpeed(enemyMinSpeed, enemyMaxSpeed), player);
  allEnemies.push(enemy);
});

function getEnemySpeed(min, max) {
  return Math.floor(Math.random() * max) + min;
}
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
