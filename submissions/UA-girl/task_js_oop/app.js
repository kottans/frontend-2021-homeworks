const areaWidth = 505;
const startY = [60, 145, 230];
const startX = [0, 200, 300, 400];
const startPlayerXY = [200, 400];
const stepX = 100;
const stepY = 85;
const levels = {
    low: [200, 400],
    medium: [300, 500],
    hight: [200, 600]
};

let holder;

const button = document.querySelector('.button');
const settings = document.querySelector('.settings');

createScoreHolder();

['click', 'keyup'].forEach(item => button.addEventListener(item, submitButton));

function submitButton(event) {
    if (event.type === 'keyup' && event.keyCode !== 13) {
        return;
    }
    const avatar = document.querySelector('.radio__avatar:checked');
    const level = document.querySelector('.radio__level:checked');
    settings.classList.toggle('hidden');
    for (let i = 0; i < allEnemies.length; i++) {
        allEnemies[i].setSpeed(level.value);
    }
    player.sprite = 'images/' + avatar.value;
}

function createScoreHolder() {
    holder = document.createElement('div');
    const body = document.querySelector('body');
    holder.innerHTML = `Your current score is 0`;
    body.appendChild(holder);
}

function getRandomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function checkMatchPosition(obj1, obj2) {
    return (Math.round(obj1.x / stepX) === Math.round(obj2.x / stepX)) &&
        (Math.round(obj1.y / stepY) === Math.round(obj2.y / stepY));
}


let Enemy = function () {
    this.setDefaultPosition();
    this.setSpeed();
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.setSpeed = function (key = 'low') {
    const [min, max] = levels[key];
    this.speed = getRandomNumber(min, max);
};

Enemy.prototype.setDefaultPosition = function () {
    this.x = 0;
    this.y = startY[getRandomNumber(0, 3)];
};

Enemy.prototype.update = function (dt) {
    this.x += dt * this.speed;
    if (this.x > areaWidth) {
        this.setDefaultPosition();
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let Player = function () {
    this.setDefaultPosition();
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};

Player.prototype.setDefaultPosition = function () {
    [this.x, this.y] = startPlayerXY;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {
    if (this.isWin()) {
        this.setDefaultPosition();
        this.updateScore(5);
        holder.innerHTML = `Cool! You won!!!
        Your score is ${this.score}`;
    }
};

Player.prototype.isWin = function () {
    return this.y < 0;
};

Player.prototype.updateScore = function (x) {
    this.score += x;
};

Player.prototype.handleInput = function (direction) {
    if (direction === 'left' && this.x - stepX >= 0) {
        this.x -= stepX;
    } else if (direction === 'right' && this.x + stepX <= areaWidth - stepX) {
        this.x += stepX;
    } else if (direction === 'down' && this.y + stepY <= startPlayerXY[1]) {
        this.y += stepY;
    } else if (direction === 'up' && this.y > 0) {
        this.y -= stepY;
    }
};

Player.prototype.checkCollisions = function (item) {
    let collision = false;
    if (checkMatchPosition(this, item)) {
        if (item instanceof Enemy) {
            this.updateScore(-5);
            holder.innerHTML = `You lose! =(
         Your score: ${player.score}`;
            this.setDefaultPosition();
        } else {
            this.updateScore(1);
            holder.innerHTML = `Your current score is ${player.score}`;
        }
        collision = true;
    }
    return collision
};


let Treasure = function (imgSource) {
    this.sprite = imgSource;
    this.setDefaultPosition();
};

Treasure.prototype.setDefaultPosition = function () {
    this.x = startX[getRandomNumber(0, 4)];
    this.y = startY[getRandomNumber(0, 3)];
};

Treasure.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


let player = new Player();
let allEnemies = [];
let allTreasures = [];

for (let i = 0; i < 2; i++) {
    allTreasures.push(new Treasure('images/Gem Blue.png'));
}

for (let i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
