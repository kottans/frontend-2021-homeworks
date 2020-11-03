class Entity {
  constructor(options) {
    Object.assign(this, options);
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Enemy extends Entity {
  static sprite = 'images/enemy-bug.png';

  constructor(options) {
    super(options);
    this.sprite = this.constructor.sprite;
  }

  checkCollision() {
    if (
      this.x >= this.player.x - 50 &&
      this.x <= this.player.x + 50 &&
      this.y === this.player.y
    ) {
      alert('You Lose!');
      this.player.resetPosition();
    }
  }

  checkRouteEnd() {
    const canvasWidth = 505;
    if (this.x > canvasWidth) this.x = -150;
  }

  update(dt) {
    this.x = Math.floor(this.x + this.speed * dt);
    this.checkRouteEnd();
    this.checkCollision();
  }
}

class Player extends Entity {
  static sprite = 'images/char-boy.png';

  constructor(options) {
    super(options);
    this.sprite = options.sprite ? options.sprite : this.constructor.sprite;
  }

  resetPosition() {
    const defaultPosition = 390;
    this.y = defaultPosition;
  }

  checkWallCollision() {
    if (this.x < 0) this.x = 0;
    if (this.x > 402) this.x = 402;
    if (this.y > 380) this.y = 380;
  }

  checkWinCon() {
    if (this.y < 0) {
      setTimeout(() => {
        this.resetPosition();
        alert('You win!');
      }, 10);
    }
  }

  update() {
    this.checkWallCollision();
    this.checkWinCon();
  }

  handleInput(eventKey) {
    switch (eventKey) {
      case 'ArrowUp':
        this.y -= 80;
        break;
      case 'ArrowDown':
        this.y += 80;
        break;
      case 'ArrowRight':
        this.x += 100;
        break;
      case 'ArrowLeft':
        this.x -= 100;
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Resources.load('images/char-cat-girl.png');

const player = new Player({
  x: 200,
  y: 380,
  sprite: 'images/char-cat-girl.png',
});

const makeEnemies = (options) => new Enemy(options);

const enemiesOptions = [
  { x: -500, y: 140, speed: 200, player },
  { x: -50, y: 60, speed: 100, player },
  { x: -120, y: 220, speed: 300, player },
];

const allEnemies = enemiesOptions.map(makeEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (event) {
  player.handleInput(event.key);
});
