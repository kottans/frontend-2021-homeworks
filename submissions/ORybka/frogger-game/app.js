const param = {
  fieldBorderX: [0, 400],
  fieldBorderY: [0, 400],
  enemyX: -50,
  enemyY: [60, 145, 230],
  minSpeed: 50,
  maxSpeed: 200,
  enemySize: 60,
  initialX: 200,
  initialY: 380,
  playerWidth: 100,
  playerHeight: 80,
};

const Enemy = function (x, y) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = Math.floor(Math.random() * (param.maxSpeed - param.minSpeed) + param.minSpeed);
  this.width = param.enemySize;
  this.endField = param.fieldBorderX[1];
  this.startX = param.enemyX;
};

const allEnemies = [];
param.enemyY.forEach((el) => allEnemies.push(new Enemy(param.enemyX, el)));

Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x >= this.endField + this.width) {
    this.x = this.startX;
  }
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
  this.width = param.playerWidth;
  this.height = param.playerHeight;
  this.startFieldX = param.fieldBorderX[0];
  this.endFieldX = param.fieldBorderX[1];
  this.startFieldY = param.fieldBorderY[0];
  this.endFieldY = param.fieldBorderY[1];
  this.enemies = allEnemies;
  this.enemySize = param.enemySize;
};

const player = new Player(param.initialX, param.initialY);

Player.prototype.update = function () {
  this.checkCollision();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (position) {
  switch (position) {
    case 'left':
      this.x -= this.width;
      if (this.x <= this.startFieldX) {
        this.x = this.startFieldX;
      }
      break;
    case 'up':
      this.y -= this.height;
      if (this.y <= this.startFieldY) {
        this.winMessage();
      }
      break;
    case 'right':
      this.x += this.width;
      if (this.x >= this.endFieldX) {
        this.x = this.endFieldX;
      }
      break;
    case 'down':
      this.y += this.height;
      if (this.y >= this.endFieldY) {
        this.y = this.endFieldY;
      }
      break;
    default:
      break;
  }
};

Player.prototype.checkCollision = function () {
  for (let i = 0; i < this.enemies.length; i++) {
    if (this.y <= this.enemies[i].y + this.enemySize && this.y >= this.enemies[i].y - this.enemySize && this.x <= this.enemies[i].x + this.enemySize && this.x >= this.enemies[i].x - this.enemySize) {
      this.loseMessage();
    }
  }
};

Player.prototype.winMessage = function () {
  setTimeout(() => {
    alert('You win!');
    this.resetGame();
  }, 100);
};

Player.prototype.loseMessage = function () {
  setTimeout(() => {
    alert('Oh no! You lose!');
    this.resetGame();
  }, 0);
};

Player.prototype.resetGame = function () {
  this.x = 200;
  this.y = 380;
};

document.addEventListener('keyup', function (e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
