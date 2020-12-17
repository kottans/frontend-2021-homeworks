const borders = {
    rightBorder: 400,
    leftBorder: 5,
    upBorder: 410,
    downBorder: 70
};

const Enemy = function (x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 75;

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

    Enemy.prototype.update = function (dt) {
        this.x += this.speed * dt;
        if (this.x >= 500) {
            this.x = -10;
            this.speed = Math.floor(40 + Math.random() * 100);
        }
    };

this.checkCollisions = function () {
    allEnemies.forEach(function (enemy) {
        let diffX = Math.abs(enemy.x - player.x);
        let diffY = Math.abs(enemy.y - player.y);
        let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        if (distance <= 50) {
            alert(`Oops... \uD83D\uDE3F Try Again`);
            player.initialCoordinates();
        } else if (player.y === borders.downBorder) {
            player.y = 60;
            setTimeout(function () { alert(`\uD83D\uDE38 Congratulations! You won! \uD83D\uDE38 `); }, 100);
            setTimeout(function () { player.initialCoordinates(); }, 50);
        };
    });
};

const Player = function (x, y) {
    this.sprite = "images/char-cat-girl.png";
    this.x = x;
    this.y = y;
    this.stepX = 98;
    this.stepY = 85;
    this.initialCoordinates = function () {
        this.x = 202; this.y = 400;
    }

    this.update = function () {
    };

   this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

Player.prototype.handleInput = function (direction) { 
 switch (direction) {
        case 'left':
            this.x -=this.stepX;
            break;
        case "up":
            this.y -= this.stepY;
            break
        case "right":
            this.x += this.stepX;
            break;
        case "down":
            this.y += this.stepY;
            break;
        case "other":
            this.x; this.y;
            break;
    }
    if (this.x >= borders.rightBorder) {
        this.x = borders.rightBorder-2;
    } else if (this.x <= borders.leftBorder) {
        this.x = borders.leftBorder+1;
    } else if (this.y >= borders.upBorder) {
        this.y = borders.upBorder-10;
    } else if (this.y <= borders.downBorder) {
        this.y = borders.downBorder;
    }
};

const player = new Player(202,400);

const enemy1 = new Enemy(5, 60);

const enemy2 = new Enemy(50,145);

const enemy3 = new Enemy(280, 145);

const enemy4 = new Enemy(25, 230);

const allEnemies = [
    enemy1,
    enemy2,
    enemy3,
    enemy4
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
