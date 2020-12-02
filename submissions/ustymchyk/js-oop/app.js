const Helper = {
    cellWidth: 101,
    cellHeight: 83,
    cellOffsetTop: 50,
    cellOffsetBottom: 40,
    get cellFullHeight() {
        return this.cellHeight + this.cellOffsetTop + this.cellOffsetBottom;
    }
};
///////
// Player
////// 
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';

        this.x = 0;
        this.y = 0;
        this.nextX = 0;
        this.nextY = 0;
        this.centerX = 0;
        this.centerY = 0;
    }
    init() {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        this.x = canvasWidth % 2 ? (canvasWidth - Helper.cellWidth) / 2 : canvasWidth / 2;
        this.y = canvasHeight - Helper.cellHeight - Helper.cellOffsetTop - Helper.cellOffsetBottom - 45;
        this.nextX = this.x;
        this.nextY = this.y;

        this.setCenter();
    }
    setCenter() {
        this.centerX = this.x + Helper.cellWidth / 2;
        this.centerY = this.y + Helper.cellOffsetTop + Helper.cellHeight / 2;
    }
    update() {
        if (this.y !== this.nextY) {
            this.y += this.stepY;
        }
        if (this.x !== this.nextX) {
            this.x += this.stepX;
        }

        this.setCenter();
        this.checkWin();
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    checkWin() {
        if (this.y === -27) {
            alert('You won!');

            this.init();
        }
    }
    handleUp() {
        const nextY = this.nextY - Helper.cellHeight;

        if (nextY >= 0 - Helper.cellOffsetTop) {
            this.nextY = nextY;
            this.stepY = (nextY - this.y) / 8;
        }
    }
    handleDown() {
        const nextY = this.nextY + Helper.cellHeight;

        if (nextY <= ctx.canvas.height - Helper.cellFullHeight) {
            this.nextY = nextY;
            this.stepY = (nextY - this.y) / 8;
        }
    }
    handleRight() {
        const nextX = this.nextX + Helper.cellWidth;

        if (nextX < ctx.canvas.width) {
            this.nextX = nextX;
            this.stepX = (nextX - this.x) / 8;
        }
    }
    handleLeft() {
        const nextX = this.nextX - Helper.cellWidth;
        if (nextX >= 0) {
            this.nextX = nextX;
            this.stepX = (nextX - this.x) / 8;
        }
    }
}

////////
// Enemy
///////
class Enemy {
    constructor(row, player) {
        this.sprite = 'images/enemy-bug.png';
        this.row = row;
        this.player = player;
    }
    init() {
        this.setSpeed();
        this.setOffset();
        this.y = this.row * Helper.cellHeight - 25;
    }
    update(dt) {
        const canvasWidth = ctx.canvas.width;

        if (this.x < canvasWidth) {
            this.x += dt * this.speed;
        } else {
            this.x = -Helper.cellWidth;
            this.setSpeed();
        }

        this.setCenter();
        this.checkCollision();
    }
    setSpeed() {
        this.speed = Math.random() * 300 + 200;
    }
    setOffset() {
        this.x = -Helper.cellHeight - Math.random() * Helper.cellWidth * 5;
    }
    setCenter() {
        this.centerX = this.x + Helper.cellWidth / 2;
        this.centerY = this.y + Helper.cellOffsetTop + Helper.cellHeight / 2;
    }
    checkCollision() {
        const playerCenterX = this.player.centerX;
        const playerCenterY = this.player.centerY;

        if (Math.abs(playerCenterX - this.centerX) < 65 && Math.abs(playerCenterY - this.centerY) < 55) {
            alert('You lost!');

            this.player.init();
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        'ArrowLeft': 'handleLeft',
        'ArrowUp': 'handleUp',
        'ArrowRight': 'handleRight',
        'ArrowDown': 'handleDown'
    };

    const methodName = allowedKeys[e.key];

    if (methodName) {
        player[methodName]()
    }
});

const player = new Player();
const allEnemies = [];

for (let i = 0; i < 3; i++) {
    const enemy = new Enemy(i + 1, player);
    allEnemies.push(enemy);
}


(function init() {
    setTimeout(() => {
        player.init();
        allEnemies.forEach(enemy => enemy.init());
    }, 0);
})();
