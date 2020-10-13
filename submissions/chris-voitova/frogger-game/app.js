//field
const fieldWidth = 505;
const borderCoordX = 400;
const borderCoordY = 450;
const waterCoord = 50;
//enemies
const enemyWidth = 101;
const enemyHeight = 61;
//player
const playerWidth = 101;
const playerHeight = 101;
const playerFieldStep = 50;

// Enemies our player must avoid
const Enemy = function (positionX, positionY, speed, width, height) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.positionX = positionX;
  this.positionY = positionY;
  this.speed = speed;
  this.width = width;
  this.height = height;

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
  this.positionX += this.speed * dt;
  if (this.positionX > fieldWidth) {
    this.positionX = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (positionX, positionY, width, height, stepOnField) {
  this.sprite = "images/char-boy.png";
  this.positionX = positionX;
  this.positionY = positionY;
  this.width = width;
  this.height = height;
  this.initPosition = {
    positionX: positionX,
    positionY: positionY,
  };
  this.stepOnField = stepOnField;
};

Player.prototype.checkCollisions = function (enemies) {
  enemies.forEach((enemy) => {
    if (
      enemy.positionX < this.positionX + this.width &&
      enemy.positionX + enemy.width > this.positionX &&
      enemy.positionY < this.positionY + this.height &&
      enemy.positionY + enemy.height > this.positionY
    ) {
      alert("you are lose!");
      this.goToInitPosition();
    }
  });
};

Player.prototype.goToInitPosition = function () {
  this.positionX = this.initPosition.positionX;
  this.positionY = this.initPosition.positionY;
};

Player.prototype.update = function () {
  this.checkCollisions(allEnemies);
  if (this.positionY <= waterCoord) {
    alert("you are win!");
    this.goToInitPosition();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
    case "up":
      this.positionY -= this.stepOnField;
      break;
    case "down":
      this.positionY += this.stepOnField;
      if (this.positionY > borderCoordY) {
        this.positionY = borderCoordY;
      }
      break;
    case "left":
      this.positionX -= this.stepOnField;
      if (this.positionX < 0) {
        this.positionX = 0;
      }
      break;
    case "right":
      this.positionX += this.stepOnField;
      if (this.positionX > borderCoordX) {
        this.positionX = borderCoordX;
      }
      break;
  }
};

// Now instantiate your objects.

const enemy1 = new Enemy(0, 280, 60, enemyWidth, enemyHeight);
const enemy2 = new Enemy(0, 200, 100, enemyWidth, enemyHeight);
const enemy3 = new Enemy(30, 130, 80, enemyWidth, enemyHeight);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player

const player = new Player(200, 450, playerWidth, playerHeight, playerFieldStep);

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
