const Helper = {
    cellWidth: 101,
    cellHeight: 83,
    cellOffsetTop: 50,
    cellOffsetBottom: 40,
    getCanvasHeight(rows) {
        return this.cellOffsetTop + this.cellOffsetBottom + rows * this.cellHeight;
    },
    getCanvasWidth(cols) {
        return cols * this.cellWidth;
    },
    get cellFullHeight() {
        return this.cellHeight + this.cellOffsetTop + this.cellOffsetBottom;
    }
};
///////
// Hero
////// 
const Hero = function () {
    this.sprite = 'images/char-boy.png';

    this.x = 0;
    this.y = 0;
    this.nextX = 0;
    this.nextY = 0;
    this.centerX = 0;
    this.centerY = 0;
}

Hero.prototype.init = function () {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    this.x = canvasWidth % 2 ? (canvasWidth - Helper.cellWidth) / 2 : canvasWidth / 2;
    this.y = canvasHeight - Helper.cellHeight - Helper.cellOffsetTop - Helper.cellOffsetBottom - 25;
    this.nextX = this.x;
    this.nextY = this.y;

    this.setCenter();
}

Hero.prototype.setCenter = function () {
    this.centerX = this.x + Helper.cellWidth / 2;
    this.centerY = this.y + Helper.cellOffsetTop + Helper.cellHeight / 2;
}

Hero.prototype.update = function () {
    if (this.y !== this.nextY) {
        this.y += this.stepY;
    }
    if (this.x !== this.nextX) {
        this.x += this.stepX;
    }

    this.setCenter();
}

Hero.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Hero.prototype.handleUp = function () {
    const nextY = this.nextY - Helper.cellHeight;

    if (nextY >= 0 - Helper.cellOffsetTop) {
        this.nextY = nextY;
        this.stepY = (nextY - this.y) / 8;
    }
}

Hero.prototype.handleDown = function () {
    const nextY = this.nextY + Helper.cellHeight;

    if (nextY <= ctx.canvas.height - Helper.cellFullHeight) {
        this.nextY = nextY;
        this.stepY = (nextY - this.y) / 8;
    }
}

Hero.prototype.handleRight = function () {
    const nextX = this.nextX + Helper.cellWidth;

    if (nextX < ctx.canvas.width) {
        this.nextX = nextX;
        this.stepX = (nextX - this.x) / 8;
    }
}

Hero.prototype.handleLeft = function () {
    const nextX = this.nextX - Helper.cellWidth;
    if (nextX >= 0) {
        this.nextX = nextX;
        this.stepX = (nextX - this.x) / 8;
    }
}

const hero = new Hero();

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        'ArrowLeft': 'handleLeft',
        'ArrowUp': 'handleUp',
        'ArrowRight': 'handleRight',
        'ArrowDown': 'handleDown'
    };

    const methodName = allowedKeys[e.key];

    if (methodName) {
        hero[methodName]()
    }
});

////////
// Enemy
///////
const Enemy = function (row) {
    this.sprite = 'images/enemy-bug.png';
    this.row = row;
};

Enemy.prototype.init = function () {
    this.setSpeed();
    this.setOffset();
    this.y = this.row * Helper.cellHeight - 25;
}

Enemy.prototype.update = function (dt) {
    const canvasWidth = ctx.canvas.width;

    if (this.x < canvasWidth) {
        this.x += dt * this.speed;
    } else {
        this.x = -Helper.cellWidth;
        this.setSpeed();
    }

    this.setCenter();
};

Enemy.prototype.setSpeed = function () {
    this.speed = Math.random() * 300 + 200;
}

Enemy.prototype.setOffset = function () {
    this.x = -Helper.cellHeight - Math.random() * Helper.cellWidth * 5;
}

Enemy.prototype.setCenter = function () {
    this.centerX = this.x + Helper.cellWidth / 2;
    this.centerY = this.y + Helper.cellOffsetTop + Helper.cellHeight / 2;
}

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const allEnemies = [...Array(5).keys()].map(num => new Enemy(num + 1));

/////////////
// Start game
////////////
Engine(this);
