const borders = {
    rightBorder: 400,
    leftBorder: 5,
    upBorder: 410,
    downBorder: 5
};
const someGap = 10;

class GameSprite {
    constructor (x, y,sprite)  {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Enemy extends GameSprite {
    constructor(x, y, sprite = "images/enemy-bug.png", speed = "75") {
        super(x, y, sprite);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    }
    render(){};
};

    Enemy.prototype.update = function (dt) {
        this.x += this.speed * dt;
        const addSpeed = 40;
        if (this.x >= 500) {
        this.x = -someGap;
        this.speed = Math.floor(addSpeed + Math.random() * 100);
        }
    };

this.checkCollisions = function () {
    allEnemies.forEach(function (enemy) {
        const collision_distance = 50;
        let diffX = Math.abs(enemy.x - player.x);
        let diffY = Math.abs(enemy.y - player.y);
        let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        if (distance <= collision_distance) {
            alert(`Oops... \uD83D\uDE3F Try Again`);
            player.initialCoordinates();
        } else if (player.y === borders.downBorder) {
            player.y = someGap;
            setTimeout(function () { alert(`\uD83D\uDE38 Congratulations! You won! \uD83D\uDE38 `); }, 100);
            setTimeout(function () { player.initialCoordinates(); }, 200);
        };
    });
};

class Player extends GameSprite {
    constructor(x = 202, y = 400, sprite = "images/char-cat-girl.png") {
        super(x, y, sprite);
        this.sprite = sprite;
        this.stepX = 98;
        this.stepY = 85;
    }

    render() { };
};

Player.prototype.initialCoordinates = function () {
    this.x = 202; this.y = 400;
};

Player.prototype.update = function () {
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
        this.y = borders.upBorder-someGap;
    } else if (this.y <= borders.downBorder) {
        this.y = borders.downBorder;
    }
};

const player = new Player();

const allEnemies = [
    enemy1=new Enemy(5,60),
    enemy2=new Enemy(50,145),
    enemy3=new Enemy(280,145),
    enemy4=new Enemy(25,230)
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
