const enemyFrame = {
  width: 98,
  height: 56,
};

const gameFrame = {
  borderX: 400,
  borderY: 450,
  waterArea: 50,
};

const playerFrame = {
  width: 70,
  height: 86,
  step: 50,
  startX: 215,
  startY: 400,
};

class Enemy {
  constructor(x, y, speed) {
    this.sprite = "images/enemy-bug.png";
    this.width = enemyFrame.width;
    this.height = enemyFrame.height;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > ctx.canvas.width) {
      this.x = -enemyFrame.width;
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Player {
  constructor() {
    this.sprite = "images/char-boy.png";
    this.x = playerFrame.startX;
    this.y = playerFrame.startY;
    this.width = playerFrame.width;
    this.height = playerFrame.height;
    this.step = playerFrame.step;
  }
  checkCollisions(enemy) {
    if (
      enemy.x < this.x + this.width &&
      enemy.x + enemy.width > this.x &&
      enemy.y < this.y + this.height &&
      enemy.y + enemy.height > this.y
    ) {
      setTimeout(() => {
        alert("You're lose Bro!");
        this.resetGame();
      }, 0);
    }
  }
  isWin() {
    if (this.y <= gameFrame.waterArea) {
      setTimeout(() => {
        alert("You're win Bro!");
        this.resetGame();
      }, 0);
    }
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  resetGame() {
    this.x = playerFrame.startX;
    this.y = playerFrame.startY;
  }

  update() {
    this.isWin();
  }
  handleInput(enterKey) {
    switch (enterKey) {
      case "up":
        this.y -= this.step;
        break;
      case "down":
        this.y += this.step;
        if (this.y > gameFrame.borderY) {
          this.y = gameFrame.borderY;
        }
        break;
      case "left":
        this.x -= this.step;
        if (this.x < this.step) {
          this.x = this.step;
        }
        break;
      case "right":
        this.x += this.step;
        if (this.x > gameFrame.borderX) {
          this.x = gameFrame.borderX;
        }
        break;
    }
  }
}

const enemiesValues = [
  {
    x: -enemyFrame.width,
    y: 200,
    speed: 70,
  },
  {
    x: -enemyFrame.width,
    y: 150,
    speed: 140,
  },
  {
    x: -enemyFrame.width,
    y: 90,
    speed: 90,
  },
];
const allEnemies = enemiesValues.map(
  ({ x, y, speed }) => new Enemy(x, y, speed)
);

const player = new Player();

document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
