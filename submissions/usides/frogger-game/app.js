const conf = {
  cellWidth: 101,
  cellHeight: 101,
  picOffset: 19,
  bugSpeedMin: 50,
  bugSpeedMax: 200,
  bugWidth: 100,
  playerWidth: 80,
};

const Enemy = function (row, player) {
  this.x = 0;
  this.y = conf.cellHeight * row - conf.picOffset * (row + 1);
  this.speed = this.randomSpeed();
  this.sprite = 'images/enemy-bug.png';
  this.player = player;
};

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > conf.cellWidth * 5) {
    this.x = -100;
    this.speed = this.randomSpeed();
  }
  this.checkCollision();
};

Enemy.prototype.randomSpeed = function () {
  return Math.floor(
    Math.random() * (conf.bugSpeedMax - conf.bugSpeedMin + 1) +
      conf.bugSpeedMin,
  );
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
  if (
    this.x >= this.player.x - conf.bugWidth &&
    this.x <= this.player.x + conf.playerWidth &&
    this.y == this.player.y
  )
    gameOver();
};

const Player = function () {
  this.stepX = 2;
  this.stepY = 5;
  this.sprite = 'images/cat.png';
};

Player.prototype.update = function () {
  this.x = conf.cellWidth * this.stepX;
  this.y = conf.cellHeight * this.stepY - conf.picOffset * (this.stepY + 1);
  this.checkBorders();
};

Player.prototype.checkBorders = function () {
  if (this.x < 0) {
    this.stepX = 0;
  }
  if (this.x > conf.cellWidth * 4) {
    this.stepX = 4;
  }
  if (this.y < 0) {
    winAction();
  }
  if (this.y > conf.cellHeight * 4) {
    this.stepY = 5;
    this.y = conf.cellHeight * this.stepY - conf.picOffset * (this.stepY + 1);
  }
};

function winAction() {
  setTimeout(() => {
    alert('You win!');
    resetGame();
  }, 10);
}

function gameOver() {
  alert('Game over!');
  resetGame();
}

function resetGame() {
  player.stepX = 2;
  player.stepY = 5;
}

Player.prototype.handleInput = function (dir) {
  switch (dir) {
    case 'up':
      this.stepY -= 1;
      break;
    case 'down':
      this.stepY += 1;
      break;
    case 'left':
      this.stepX -= 1;
      break;
    case 'right':
      this.stepX += 1;
      break;
    default:
      break;
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const player = new Player();

const allEnemies = [1, 2, 3].map((row) => new Enemy(row, player));

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
