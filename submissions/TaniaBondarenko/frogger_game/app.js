const borders = {
    rightBorder: 400,
    leftBorder: 5,
    upBorder: 410,
    downBorder: 70
};

const someGap = 10;

class GameSprite {
    constructor (x, y,sprite)  {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Enemy extends GameSprite {
    constructor(x, y, player,sprite = "images/enemy-bug.png", speed = "75") {
        super(x, y, sprite);
        this.speed = speed;
        this.player = player;
    }
    
    update(dt) {
        this.x += this.speed * dt;
        const addSpeed = 40;
        const pointHideEnemy = 500;
        if (this.x >= pointHideEnemy) {
            this.x = -someGap;
            this.speed = Math.floor(addSpeed + Math.random() * 100);
        }
        this.checkCollisions();
    }

    checkCollisions() {
            const collision_distance = 50;
            let diffX = Math.abs(this.x - this.player.x);
            let diffY = Math.abs(this.y - this.player.y);
            let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            if (distance <= collision_distance) {
                alert(`Oops... \uD83D\uDE3F Try Again`);
               this.player.initialCoordinates();
            } else if (this.player.y === borders.downBorder) {
                this.player.y = someGap; 
                setTimeout(function () { alert(`\uD83D\uDE38 Congratulations! You won! \uD83D\uDE38 `); }, 100);
                setTimeout(this.player.initialCoordinates.bind(this.player),200);
            };
    };
};

class Player extends GameSprite {
    constructor(x = 200, y = 400, sprite = "images/char-cat-girl.png") {
        super(x, y, sprite);
        this.stepX = 100;
        this.stepY = 85;
    }
    
    initialCoordinates() {
        this.x = 200; this.y = 400;
    }
    
    update() {
     }

    handleInput  (direction) {
        switch (direction) {
            case 'left':
                this.x -= this.stepX;
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
            this.x = borders.rightBorder-someGap;
        } else if (this.x <= borders.leftBorder) {
            this.x = borders.leftBorder + someGap;
        } else if (this.y >= borders.upBorder) {
            this.y = borders.upBorder - someGap;
        } else if (this.y <= borders.downBorder) {
            this.y = borders.downBorder;
        }
    };

};

const player = new Player();

const allEnemies = [
    new Enemy(5,60,player),
    new Enemy(50,145,player),
    new Enemy(280,145,player),
    new Enemy(25,230,player)
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
