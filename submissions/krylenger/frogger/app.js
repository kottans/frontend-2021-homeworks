const borders = {
    topY: 49,
    rightX: 420,
    bottomY: 464,
    leftX: 20 
}

const tileDimensions = {
    width: 100,
    height: 83
}

const score = document.querySelector('.score');
const lives = document.querySelector('.lives');

const getRandomSpeed = () => {
    return Math.floor(Math.random() * (350 - 100 + 1)) + 100;
}


//////////  PLAYER /////////////////

const Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 60;
  this.height = 83;
  this.sprite = 'images/enemy-bug.png';
  this.score = 0;
  this.lives = 3;
}

Player.prototype.update = function () {
if (this.y === borders.topY) {
  setTimeout(() => {
      this.score += 2;
      score.textContent = `Score: ${this.score}`
    alert(`Well done! Your score is ${this.score}. Keep it up!`);
    this.y = borders.bottomY;
  }, 13);
}
};

Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case "up":
      if (this.y > borders.topY) {
        this.y -= tileDimensions.height;
      }
      break;
    case "down":
      if (this.y < borders.bottomY) {
        this.y += tileDimensions.height;
      }
      break;
    case "left":
      if (this.x > borders.leftX) {
          this.x -= tileDimensions.width;
      }
      break;
    case "right":
      if (this.x < borders.rightX) {
          this.x += tileDimensions.width;
      }
      break;
  }
}

Player.prototype.movePlayerToStartPosition = function() {
  this.y = borders.bottomY;
  this.x = 220;
}

Player.prototype.decreaseOneLife = function() {
  this.lives -= 1;
  score.textContent = `Score: ${this.score}`;
  lives.textContent = `Lives: ${this.lives}`;
  alert("Oooops..");
}

Player.prototype.resetGame = function() {
  alert(`You lose :( Your score is ${this.score} Another try?`);
  this.lives = 3;
  this.score = 0;
  score.textContent = `Score: ${this.score}`;
  lives.textContent = `Lives: ${this.lives}`;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

let player = new Player(220, 464);


//////////  Enemy /////////////////

const Enemy = function() {
    this.width = 70;
    this.height = 83;
    this.leftPlayingBorder = -150;
    this.rightPlayingBorder = 500;
    this.speed = getRandomSpeed();
};

Enemy.prototype.handleCollision = function () {
  if (
    this.x + this.width > this.player.x &&
    this.player.x + this.player.width > this.x &&
    this.player.y > this.y - this.height &&
    this.player.y - this.player.height < this.y
  ) {
    setTimeout(() => {
      this.player.decreaseOneLife();
      if (this.player.lives === 0) {
        this.player.resetGame();
      }
      this.player.movePlayerToStartPosition();
    }, 13);
  }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//////////  EnemyBoy /////////////////

const EnemyBoy = function(x, y, player) {
  Enemy.apply(this, arguments);
    this.x = x;
    this.y = y;
    this.player = player;
    this.sprite = 'images/char-boy.png';
}

EnemyBoy.prototype = Object.create(Enemy.prototype);
EnemyBoy.prototype.constructor = EnemyBoy;  

EnemyBoy.prototype.update = function(dt) {
    this.x -= this.speed * dt;
    if (this.x < this.leftPlayingBorder) {
        this.x = this.rightPlayingBorder;
        this.speed = getRandomSpeed();
    }
    this.handleCollision();
};

//////////  EnemyGirl /////////////////

const EnemyGirl = function(x, y, player) {
    Enemy.apply(this, arguments)
    this.x = x;
    this.y = y;
    this.player = player; 
    this.sprite = 'images/char-horn-girl.png'
}

EnemyGirl.prototype = Object.create(Enemy.prototype);
EnemyGirl.prototype.constructor = EnemyGirl;

EnemyGirl.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > this.rightPlayingBorder) {
        this.x = this.leftPlayingBorder;
        this.speed = getRandomSpeed();
    }
    this.handleCollision();
};

let enemyGirlFirst = new EnemyGirl(-150, 132, player);
let enemyGirlSecond = new EnemyGirl(-150, 215, player);
let enemyGirlThird = new EnemyGirl(-150, 298, player);
let enemyBoyFirst = new EnemyBoy(550, 132, player);
let enemyBoySecond = new EnemyBoy(550, 215, player);
let enemyBoyThird = new EnemyBoy(550, 298, player);
const allEnemies = [enemyGirlFirst, enemyGirlSecond, enemyGirlThird, enemyBoyFirst, enemyBoySecond, enemyBoyThird];


//////////  ITEM /////////////////

const getRandomPositionInArray = (arrLength) => {
    return (Math.floor(Math.random() * arrLength));
}

const getRandomPosition = () => {
  const x = [0, 100, 200, 300, 400];
  const y = [132, 215, 298];

  const randomX = x[getRandomPositionInArray(x.length)];
  const randomY = y[getRandomPositionInArray(y.length)];
  return { x: randomX, y: randomY };
};

const Item = function() {
    this.rndPosition = getRandomPosition();
    this.x = this.rndPosition.x;
    this.y = this.rndPosition.y;
    this.width = 100;
    this.height = 83;
}

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//////////  STAR /////////////////

const Star = function(player) {
    Item.apply(this, arguments);
    this.player = player;
    this.sprite = 'images/Star.png';
}

Star.prototype = Object.create(Item.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function() {
    if (this.y === this.player.y && this.x === this.player.x - 20) {
        this.x = getRandomPosition().x;
        this.y = getRandomPosition().y;
        setTimeout(() => {
            this.player.score += 1;
            score.textContent = `Score: ${this.player.score}`;
        }, 100);
    }
}

//////////  HEART /////////////////

const Heart = function(player) {
    Item.apply(this, arguments);
    this.player = player;
    this.sprite = 'images/Heart2.png';
}

Heart.prototype = Object.create(Item.prototype);
Heart.prototype.constructor = Heart;

Heart.prototype.update = function() {
    if (this.y === this.player.y && this.x === this.player.x - 20) {
        this.x = getRandomPosition().x;
        this.y = getRandomPosition().y;
        setTimeout(() => {
            this.player.lives += 1;
            lives.textContent = `Lives: ${this.player.lives}`
        }, 13);
    }
}

let star = new Star(player);
let heart = new Heart(player);


document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
