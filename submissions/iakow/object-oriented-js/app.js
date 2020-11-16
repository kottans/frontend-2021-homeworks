var enemiesYPositions = {
    'top': 60,
    'middle': 145,
    'bottom': 230
}

var looseSound = new Audio('sound/eralash-konec.mp3');
var winSound = new Audio('sound/win.mp3');

var Enemy = function (row, player) {
    this.sprite = 'images/enemy-bug.png';
    this.y = enemiesYPositions[row];
    this.x = -80;
    this.player = player;
    this.speed = null;

    this.setRandomSpeed();
}

Enemy.prototype.setRandomSpeed = function () {
    this.speed = Math.random() * 1.2 + 0.5;
}

Enemy.prototype.reset = function () {
    this.x = -80;
    this.setRandomSpeed();
}

Enemy.prototype.checkCollision = function () {
    return (Math.abs(this.player.y - this.y) < 40
    && Math.abs(this.player.x - this.x) < 80);
}

Enemy.prototype.update = function (dt) {
    setInterval(() => {
        if (game.isEnd) return;

        if (this.x > 500) {
            this.reset();
            return;
        }

        if (this.checkCollision()) {
            looseSound.play();
            game.reset();
            return;
        }

        this.x = this.x + this.speed;
    }, 2000 / dt);
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {

};

Player.prototype.handleInput = function (key) {
    if (game.isEnd) return;

    if (key === 'up' && this.y >= 72) {
        this.y -= 82;

        if (this.y < 0) {
            winSound.play();
            game.reset();
            return;
        }
    }

    if (key === 'down' && this.y < 400) {
        this.y += 82;
        return;
    }

    if (key === 'left' && this.x > 0) {
        this.x -= 100;
        return;
    }

    if (key === 'right' && this.x < 400) {
        this.x += 100;
        return;
    }
}

var game = {
    isEnd: false,
    reset: function () {
        this.isEnd = true;

        setTimeout(() => {
            player.reset();

            allEnemies.forEach((enemy) => {
                enemy.reset();
            });

            this.isEnd = false;
        }, 1400)
    }
}

var player = new Player();

var allEnemies = [
    new Enemy('top', player),
    new Enemy('middle', player),
    new Enemy('bottom', player)
];

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
