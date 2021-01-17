const playerStartValue = {
    "x": 200,
    "y": 400,
    "icon": "images/char-boy.png",
    "stepX": 100,
    "stepY": 82,
    "startScore": 0
};

const enemyStartValue = {
    "x": 0,
    "icon": "images/enemy-bug.png",
    "minX": -50,
    "maxX": 510,
    // "firstEnemy": 63,
    // "secondEnemy": 147,
    // "thirdEnemy": 230
    "initialYcoordinates": [63, 147, 230]
};

const coordsGameGround = {
    "min": 0,
    "max": 400,
    "delay": 200,
    "conflictX": 80,
    "conflictY": 60,
    "minSpeed": 100,
    "maxSpeed": 222
};

class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    constructor(x, y, sprite, player) {
        super(x, y, sprite);
        this.speed = this.getRandomSpeed();
        this.player = player;
    }

    update(dt) {
        this.x += this.speed * dt;
        if (this.x > enemyStartValue.maxX) {
            this.x = enemyStartValue.minX;
            this.speed = this.getRandomSpeed();
        }
        this.collisionHappened();
    }

    collisionHappened() {
        if (player.x < this.x + coordsGameGround.conflictX && player.x + coordsGameGround.conflictX > this.x && player.y < this.y + coordsGameGround.conflictY && coordsGameGround.conflictY + player.y > this.y) {
            player.x = playerStartValue.x;
            player.y = playerStartValue.y;
            player.decreaseScore();
        }
    }

    getRandomSpeed() {
        return coordsGameGround.minSpeed + Math.floor(Math.random() * coordsGameGround.maxSpeed);
    }
}

class Player extends Character {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.score = playerStartValue.startScore;
    }

    update(dt) {
        this.takingScorePoint();
    }

    handleInput(keyPress) {
        if (keyPress == 'left' && this.x > coordsGameGround.min) {
            this.x -= playerStartValue.stepX;
        }

        if (keyPress == 'right' && this.x < coordsGameGround.max) {
            this.x += playerStartValue.stepX;
        }

        if (keyPress == 'up' && this.y > coordsGameGround.min) {
            this.y -= playerStartValue.stepY;
        }

        if (keyPress == 'down' && this.y < coordsGameGround.max) {
            this.y += playerStartValue.stepY;
        }
    }

    increaseScore() {
        this.score++;
    }

    decreaseScore() {
        this.score <= playerStartValue.startScore ? this.score = playerStartValue.startScore : this.score--;
    }

    takingScorePoint() {
        if (this.y <= coordsGameGround.min) {
            this.increaseScore();
            this.x = playerStartValue.x;
            this.y = playerStartValue.y;
        }
    }
}

document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const player = new Player(playerStartValue.x, playerStartValue.y, playerStartValue.icon);
//const allEnemies = [enemyStartValue.firstEnemy, enemyStartValue.secondEnemy, enemyStartValue.thirdEnemy].map(y => new Enemy(enemyStartValue.x, y, enemyStartValue.icon, player));
const allEnemies = enemyStartValue.initialYcoordinates.map(y => new Enemy(enemyStartValue.x, y, enemyStartValue.icon, player));
