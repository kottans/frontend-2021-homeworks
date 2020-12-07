const dx = 101;
const dy = 80;
const icon_height = 60;
const player_start_x = dx * 2;
const player_start_y = dy * 5;

//enemy speed
const max_speed_value = 350;
const min_speed_value = 100;

function calculateRandomSpeed() {
    return Math.random() * (max_speed_value - min_speed_value) + min_speed_value;
}

class Character {

    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y);
    }
}


class Enemy extends Character {

    constructor(x, y, player, image = 'images/enemy-bug.png') {
        super(x, y, image);
        this.player = player;
        this.speed = calculateRandomSpeed();
    }

    update(dt) {
        if (this.x > ctx.canvas.width) {
            this.x = 0;
            this.speed = calculateRandomSpeed();
        } else {
            this.x += this.speed * dt;
        }
    }

    findCollision() {
        if (this.x > this.player.x - icon_height &&
            this.x < this.player.x + icon_height &&
            this.y > this.player.y - icon_height &&
            this.y < this.player.y + icon_height) {
            window.requestAnimationFrame(() => {
                if (confirm('Unfortunately, you lose!\nRestart the game')) {
                    this.player.x = player_start_x;
                    this.player.y = player_start_y;
                }
            });
        }
    }
}

    class Player extends Character {

    constructor(x = player_start_x, y = player_start_y, image = 'images/char-boy.png') {
        super(x, y, image);
    }

    isWinner() {
        if (this.y <= 0) {
            window.requestAnimationFrame(() => {
                if (confirm('Congratulations, you won!\nRestart the game')) {
                    this.x = player_start_x;
                    this.y = player_start_y;
                }
            });
        }
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x > 0) {
                    this.x -= dx;
                }
                break;
            case 'right':
                if (this.x + dx < ctx.canvas.width) {
                    this.x += dx;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= dy;
                }
                break;
            case 'down':
                if (this.y + dy * 2 < ctx.canvas.height - icon_height) {
                    this.y += dy;
                }
                break;
        }
    }
}

const player = new Player();
const arrayOfRows = [0,1,2];
const allEnemies = arrayOfRows.map(y => new Enemy(0, (y * dy) + icon_height, player));

document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
