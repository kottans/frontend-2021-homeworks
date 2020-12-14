const FIELD_WIDTH = 505;
const FIELD_PADDING_TOP = 50;
const ROW_STEP = 83;
const COL_STEP = 101;
const START_X = 2 * COL_STEP;
const START_Y = 4 * ROW_STEP + FIELD_PADDING_TOP;
const MIN_X = 0;
const MAX_X = FIELD_WIDTH - COL_STEP;
const MIN_Y = START_Y - 5 * ROW_STEP;
const MAX_Y = START_Y;
const ENEMIES = 4;
const PLAYER_PADDING = 35;
const MIN_SPEED = 100;
const DIFFICULTY = 200;

let counter = 0;

let scoreBoard = document.createElement("div");
document.body.append(scoreBoard);
scoreBoard.style.cssText = "padding-top: 10px; font-size: 30px; ";
scoreBoard.textContent = `Your score: ${counter}`;

const Enemy = function (x, y, speed, player) {
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.player = player;
	this.sprite = "images/enemy-bug.png";
};

const Player = function (x, y) {
	this.x = x;
	this.y = y;
	this.sprite = "images/char-boy.png";
};

const player = new Player(START_X, START_Y);

const allEnemies = [];
for (let i = 0; i < ENEMIES; i++) {
	let x = -Math.random() * FIELD_WIDTH;
	let y = (i % 3) * ROW_STEP + FIELD_PADDING_TOP;
	let speed = MIN_SPEED + Math.random() * DIFFICULTY;
	let enemy = new Enemy(x, y, speed, player);
	allEnemies.push(enemy);
}

Enemy.prototype.update = function (dt) {
	this.x += this.speed * dt;
	if (this.x > FIELD_WIDTH) {
		this.x = -COL_STEP;
	}
	this.checkCollision();
};

Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function () {
	if (
		((this.x <= this.player.x + PLAYER_PADDING &&
			this.x + COL_STEP >= this.player.x + PLAYER_PADDING) ||
		(this.x >= this.player.x + PLAYER_PADDING &&
			this.x <= this.player.x + COL_STEP - PLAYER_PADDING)) &&
				this.y === this.player.y
	) {
		this.player.loseGame();
	}
};

Player.prototype.update = function () {
	this.winGame();
};

Player.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
	if (direction === "right" && this.x < MAX_X) {
		this.x += COL_STEP;
	} else if (direction === "left" && this.x > MIN_X) {
		this.x -= COL_STEP;
	} else if (direction === "up" && this.y > MIN_Y) {
		this.y -= ROW_STEP;
	} else if (direction === "down" && this.y < MAX_Y) {
		this.y += ROW_STEP;
	}
};

Player.prototype.goToStart = function () {
	this.x = START_X;
	this.y = START_Y;
};

Player.prototype.touchWater = function () {
	return this.y < MIN_Y + ROW_STEP;
};

Player.prototype.winGame = function () {
	if (this.touchWater()) {
		this.goToStart();
		counter++;
		scoreBoard.textContent = `Your score: ${counter}`;
	}
};

Player.prototype.loseGame = function () {
	this.goToStart();
	counter--;
	scoreBoard.textContent = `Your score: ${counter}`;
};

document.addEventListener("keyup", function (e) {
	var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down",
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
