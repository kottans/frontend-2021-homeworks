const PLAYER_START_POSITION = { x: 200, y: 380 };
const STEP_Y = 80;
const STEP_X = 102;
const BUGS_PADDING = 18;
const BUGS_START_POSITION = {
  x: -200,
  y: [1, 3, 4].map((rowNumber) => rowNumber * STEP_Y - BUGS_PADDING),
};
const MIN_SPEED = 100;
const MAX_SPEED = 700;
const CANVAS_WIDTH = 505;
const BUG_SIZE = 70;

const Character = function (x, y) {
  this.x = x;
  this.y = y;
};
Character.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (x, y, speed, player) {
  Character.call(this, x, y);
  this.sprite = "images/enemy-bug.png";
  this.speed = speed;
  this.player = player;
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.update = function (dt) {
  this.x += this.speed * dt;
  if (this.x > CANVAS_WIDTH) {
    this.x = BUGS_START_POSITION.x;
  }
  this.handleCollision();
};
Enemy.prototype.handleCollision = function () {
  if (
    Math.abs(this.x - this.player.x) < BUG_SIZE &&
    Math.abs(this.y - this.player.y) < BUG_SIZE
  ) {
    alert("You lose!");
    this.player.resetPosution();
  }
};

const Player = function (x, y) {
  Character.call(this, x, y);
  this.sprite = "images/char-boy.png";
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.update = function (dt) {
  if (this.y < 0) {
    setTimeout(() => {
      alert("You win!");
      this.resetPosution();
    }, 0);
  }
};
Player.prototype.handleInput = function (key) {
  if (key === "left" && this.x > 0) {
    this.x -= STEP_X;
  }
  if (key === "right" && this.x < CANVAS_WIDTH - STEP_X) {
    this.x += STEP_X;
  }
  if (key === "down" && this.y < PLAYER_START_POSITION.y) {
    this.y += STEP_Y;
  }
  if (key === "up" && this.y > 0) {
    this.y -= STEP_Y;
  }
};
Player.prototype.resetPosution = function () {
  this.y = PLAYER_START_POSITION.y;
  this.x = PLAYER_START_POSITION.x;
};

const player = new Player(PLAYER_START_POSITION.x, PLAYER_START_POSITION.y);
const allEnemies = BUGS_START_POSITION.y.map(
  (y) =>
    new Enemy(
      BUGS_START_POSITION.x,
      y,
      getRandomSpeed(MIN_SPEED, MAX_SPEED),
      player
    )
);

function getRandomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
