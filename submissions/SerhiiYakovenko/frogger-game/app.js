const cellWidth = 100;
const cellHeight = 80;
const fieldWidth = 5 * cellWidth;
const rows = 3;
const enemyWidth = 80;
const startPositionX = 200;
const startPositionY = 380;

var Enemy = function (y, player) {
  this.x = 0;
  this.y = y;
  this.player = player;
  this.setRandomSpeed();
  this.sprite = "images/enemy-bug.png";
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.checkCollision()) alert("Better luck next time, bevare of bugs");
};

Enemy.prototype.setRandomSpeed = function () {
  this.speed = randomSpeed(50, 250);
};

Enemy.prototype.checkCollision = function () {
  if (
    this.x >= this.player.x - cellWidth &&
    this.x <= this.player.x + cellWidth &&
    this.player.y === this.y
  ) {
    this.player.moveToStart();
    return true;
  } else {
    return false;
  }
};

Enemy.prototype.render = function () {
  if (this.x > fieldWidth) {
    this.x = 0;
  }
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {
  this.moveToStart();
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function () {
    if(this.x < 0) this.x = 0;
    if(this.x >= fieldWidth) this.x = fieldWidth-cellWidth;
    if(this.y >= startPositionY) this.y = startPositionY;
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.moveToStart = function () {
  this.x = startPositionX;
  this.y = startPositionY;
};

Player.prototype.handleInput = function (keyCode) {
  switch (keyCode) {
    case "up":
      this.y -= cellHeight;
      if (this.y < 0) {
        alert("Easy peasy lemon squeezy");
        this.moveToStart();
      }
      break;
    case "down":
      this.y += cellHeight;
      break;
    case "left":
      this.x -= cellWidth;
      break;
    case "right":
      this.x += cellWidth;
      break;
  }
};

let player = new Player();
let allEnemies = [];
for (var i = 1; i <= rows; i++) {
  allEnemies.push(new Enemy(i * cellHeight - 20, player));
}

document.addEventListener("keyup", function (e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

function randomSpeed(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
