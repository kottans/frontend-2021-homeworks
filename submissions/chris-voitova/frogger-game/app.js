const field = {
  width: 505,
  height: 606,
  edges: {
    x: 400,
    y: 450,
  },
  waterPosition: 50,
};

// Enemies our player must avoid
const Enemy = function (x, y, speed, width = 101, height = 61) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
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
  this.x += this.speed * dt;
  if (this.x > field.width) {
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function (x, y, step = 50, width = 101, height = 101) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.initPosition = {
    x: x,
    y: y,
  };
  this.step = step;
};

Player.prototype.checkCollisions = function (enemies) {
  enemies.forEach((enemy) => {
    if (
      enemy.x < this.x + this.width &&
      enemy.x + enemy.width > this.x &&
      enemy.y < this.y + this.height &&
      enemy.y + enemy.height > this.y
    ) {
      alert("you are lose!");
      this.goToInitPosition();
    }
  });
};

Player.prototype.goToInitPosition = function () {
  this.x = this.initPosition.x;
  this.y = this.initPosition.y;
};

Player.prototype.update = function () {
  this.checkCollisions(allEnemies);
  if (this.y <= field.waterPosition) {
    alert("you are win!");
    this.goToInitPosition();
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  if (key === "up") {
    this.y -= this.step;
  }
  if (key === "down") {
    this.y += this.step;
    if (this.y > field.edges.y) {
      this.y = field.edges.y;
    }
  }
  if (key === "left") {
    this.x -= this.step;
    if (this.x < 0) {
      this.x = 0;
    }
  }
  if (key === "right") {
    this.x += this.step;
    if (this.x > field.edges.x) {
      this.x = field.edges.x;
    }
  }
};

// Now instantiate your objects.

const enemy1 = new Enemy(0, 280, 60);
const enemy2 = new Enemy(0, 200, 100);
const enemy3 = new Enemy(30, 130, 80);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player

const player = new Player(200, 450);

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
