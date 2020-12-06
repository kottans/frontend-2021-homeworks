const numEnemies = 5;
const enemyMinSpeed = 50;
const enemyMaxSpeed = 250;
const enemyMinStartX = -700;
const enemyMaxStartX = 0;
const enemyMinStartY = 60;
const enemyMaxStartY = 395;

const playerStartX = 200;
const playerStartY = 400;
const playerSpeed = 10;

const collisionMinX = 18;
const collisionMaxX = 84;
const collisionMinY = 85;
const collisionMaxY = 137;

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const Enemy = function () {
  this.sprite = 'images/enemy-bug.png';
  Resources.load(this.sprite);
  this.toStartPosition();
};

Enemy.prototype.update = function (dt) {
  const resetLine = 640;
  this.x += this.speed * dt;
  if (this.x > resetLine) {
    this.toStartPosition();
  }
};

Enemy.prototype.toStartPosition = function () {
  this.x = randomMinMax(enemyMinStartX, enemyMaxStartX);
  this.y = randomMinMax(enemyMinStartY, enemyMaxStartY);
  this.speed = randomMinMax(enemyMinSpeed, enemyMaxSpeed);
};

Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () {
  this.speed = playerSpeed;
  this.sprite = 'images/char-horn-girl.png';
  Resources.load(this.sprite);
  this.toStartPosition();
};

Player.prototype.update = function (dx = 0, dy = 0) {
  const minX = -10;
  const maxX = 420;
  const minY = -10;
  const maxY = 400;

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
  const d = 1;
  let dx = 0;
  let dy = 0;
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
      const checkPointX =
        dx > 0 ? this.x + collisionMinX : this.x + collisionMaxX;
      const checkPointY =
        dy > 0 ? this.y + collisionMinY : this.y + collisionMaxY;
      if (
        checkPointX >= enemy.x + collisionMinX &&
        checkPointX <= enemy.x + collisionMaxX &&
        checkPointY >= enemy.y + collisionMinY &&
        checkPointY <= enemy.y + collisionMaxY
      ) {
        return true;
      } else {
        return false;
      }
    }.bind(this)
  );
};

Player.prototype.toStartPosition = function () {
  this.x = playerStartX;
  this.y = playerStartY;
};

Player.prototype.inWater = function () {
  const finishLine = -10;
  return this.y <= finishLine;
};

function checkCollisions() {
  if (player.checkCollisions(allEnemies) || player.inWater()) {
    allEnemies.forEach(function (enemy) {
      enemy.toStartPosition();
    });
    player.toStartPosition();
  }
}

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
