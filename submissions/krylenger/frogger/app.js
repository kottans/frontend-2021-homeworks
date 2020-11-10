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

const randomSpeed = () => {
    return Math.floor(Math.random() * (350 - 100 + 1)) + 100;
}

//////////  Enemy /////////////////

const Enemy = function() {
    this.width = 70;
    this.height = 83;
    this.speed = randomSpeed();
};

Enemy.prototype.handleGameOver = function () {
  if (
    this.x + this.width > player.x &&
    player.x + player.width > this.x &&
    player.y > this.y - this.height &&
    player.y - player.height < this.y
  ) {
    setTimeout(() => {
      player.lives -= 1;
      score.textContent = `Score: ${player.score}`;
      lives.textContent = `Lives: ${player.lives}`;
      alert("Oooops..");
      if (player.lives === 0) {
        alert(`You lose :( Your score is ${player.score} Another try?`);
        player.lives = 3;
        player.score = 0;
        score.textContent = `Score: ${player.score}`;
        lives.textContent = `Lives: ${player.lives}`;
      }
      player.y = borders.bottomY;
      player.x = 220;
    }, 13);
  }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//////////  EnemyBoy /////////////////

const EnemyBoy = function(x, y) {
    Enemy.apply(this, arguments);
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

EnemyBoy.prototype = Object.create(Enemy.prototype);
EnemyBoy.prototype.constructor = EnemyBoy;  

EnemyBoy.prototype.update = function(dt) {
    this.x -= this.speed * dt;
    if (this.x < -150) {
        this.x = 500;
        this.speed = randomSpeed();
    }
    this.handleGameOver();
};

//////////  EnemyGirl /////////////////

const EnemyGirl = function(x, y) {
    Enemy.apply(this, arguments)
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png'
}

EnemyGirl.prototype = Object.create(Enemy.prototype);
EnemyGirl.prototype.constructor = EnemyGirl;

EnemyGirl.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x > 500) {
        this.x = -150;
        this.speed = randomSpeed();
    }
    this.handleGameOver();
};

let enemyGirlFirst = new EnemyGirl(-150, 132);
let enemyGirlSecond = new EnemyGirl(-150, 215);
let enemyGirlThird = new EnemyGirl(-150, 298);
let enemyBoyFirst = new EnemyBoy(550, 132);
let enemyBoySecond = new EnemyBoy(550, 215);
let enemyBoyThird = new EnemyBoy(550, 298);
const allEnemies = [enemyGirlFirst, enemyGirlSecond, enemyGirlThird, enemyBoyFirst, enemyBoySecond, enemyBoyThird];


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

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
}

let player = new Player(220, 464);

//////////  ITEM /////////////////

const randomPositionInArray = (arrLength) => {
    return (Math.floor(Math.random() * arrLength));
}

const randomPosition = () => {
  const x = [0, 100, 200, 300, 400];
  const y = [132, 215, 298];

  const randomX = x[randomPositionInArray(x.length)];
  const randomY = y[randomPositionInArray(y.length)];
  return { x: randomX, y: randomY };
};

const Item = function() {
    this.rndPosition = randomPosition();
    this.x = this.rndPosition.x;
    this.y = this.rndPosition.y;
    this.width = 100;
    this.height = 83;
}

Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//////////  STAR /////////////////

const Star = function() {
    Item.apply(this, arguments);
    this.sprite = 'images/Star.png';
}

Star.prototype = Object.create(Item.prototype);
Star.prototype.constructor = Star;

Star.prototype.update = function() {
    if (this.y === player.y && this.x === player.x - 20) {
        this.x = randomPosition().x;
        this.y = randomPosition().y;
        setTimeout(() => {
            player.score += 1;
            score.textContent = `Score: ${player.score}`;
        }, 100);
    }
}

//////////  HEART /////////////////

const Heart = function() {
    Item.apply(this, arguments);
    this.sprite = 'images/Heart2.png';
}

Heart.prototype = Object.create(Item.prototype);
Heart.prototype.constructor = Heart;

Heart.prototype.update = function() {
    if (this.y === player.y && this.x === player.x - 20) {
        this.x = randomPosition().x;
        this.y = randomPosition().y;
        setTimeout(() => {
            console.log('hi');
            player.lives += 1;
            lives.textContent = `Lives: ${player.lives}`
        }, 13);
    }
}

let star = new Star();
let heart = new Heart();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
