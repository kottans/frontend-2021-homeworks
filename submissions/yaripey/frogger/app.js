const tile = {
  width: 101,
  height: 85
}

const COLLISION_DISTANCE = 60

const levelBorders = {
  bottomBorder: tile.height * 4,
  waterBorder: 0,
  leftBorder: 0,
  rightBorder: tile.width * 4
}

const initPositionPlayer = [
  tile.width * 2,
  tile.height * 4.5
]

class Character {
  constructor(x, y, sprite) {
    this.sprite = sprite
    this.x = x;
    this.y = y;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
  }

  update() {

  }
}

class Enemy extends Character {
  maxSpeed = 400
  minSpeed = 100

  additionalCoordinateValue = 100
  // This value is used in repositioning of the enemies
  // so that they dissapear and appear off the screen.

  constructor(y) {
    super(-tile.width * 2, y, "images/enemy-bug.png")
    this.changeSpeed()
  }

  changeSpeed() {
    this.speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed
  }

  update(dt) {
    if (this.x > levelBorders.rightBorder + this.additionalCoordinateValue) {
      this.changeSpeed()
      this.x = levelBorders.leftBorder - this.additionalCoordinateValue
    }
    this.x += this.speed * dt
  }
}

class Player extends Character {
  stepX = tile.width;
  stepY = tile.height;
  constructor([x, y]) {
    super(x, y, "images/char-boy.png")
    this.initialX = x;
    this.initialY = y;
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        if (this.x > levelBorders.leftBorder) this.x -= this.stepX;
        break;
      case 'right':
        if (this.x < levelBorders.rightBorder) this.x += this.stepX;
        break;
      case 'up':
        if (this.y > levelBorders.waterBorder) this.y -= this.stepY;
        break;
      case 'down':
        if (this.y < levelBorders.bottomBorder) this.y += this.stepY;
        break;
    }
  }

  resetPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(tile.height * 0.5)
const enemy2 = new Enemy(tile.height * 1.5)
const enemy3 = new Enemy(tile.height * 2.5)
const allEnemies = [enemy1, enemy2, enemy3]
const player = new Player(initPositionPlayer)


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

const checkCollisions = () => {
  if (player.y < levelBorders.waterBorder) {
    alert('You\'ve made it to the water! Congratulations!')
    player.resetPosition()
  }
  if (allEnemies.some(enemy => {
    if (
      Math.abs(Math.abs(enemy.x) - Math.abs(player.x)) < COLLISION_DISTANCE
      && Math.abs(Math.abs(enemy.y) - Math.abs(player.y)) < COLLISION_DISTANCE
    ) {
      return true;
    }
  })) {
    alert('You\'ve been struck by a bug! (What an irony)')
    player.resetPosition()
  }
}
