const ENEMY_INFO = {
	minSpeed: 100,
	maxSpeed: 300,
	sprite: "images/enemy-bug.png",
	width: 75,
	startPositionX: -75
};
const CELL_INFO = {
	width: 101,
	height: 83,
	creaturePositionCorrection: 28,
};
const PLAYER_INFO = {
	sprite: "images/char-boy.png",
	startPositionX: CELL_INFO.width * 2,
	startPositionY: CELL_INFO.height * 5 - CELL_INFO.creaturePositionCorrection,
};
const PLAYING_AREA_INFO = {
	width: CELL_INFO.width * 4,
	height: CELL_INFO.height * 5,
};

const generateEnemySpeed = function () {
	return Math.floor(Math.random() * (ENEMY_INFO.maxSpeed - ENEMY_INFO.minSpeed)) + ENEMY_INFO.minSpeed;
};

const Creature = function (x, y, sprite) {
	this.x = x;
	this.y = y;
	this.sprite = sprite;
};

Creature.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (x, y, playerInstance) {
	Creature.call(this, x, y, ENEMY_INFO.sprite);
	this.speed = generateEnemySpeed();
	this.player = playerInstance;
};

Enemy.prototype = Object.create(Creature.prototype);

Enemy.prototype.update = function (dt) {
	this.x += this.speed * dt;
	if (this.x > CELL_INFO.width * 5) {
		this.x = ENEMY_INFO.startPositionX;
		this.speed = generateEnemySpeed();
	}
	this.checkCollision();
};

Enemy.prototype.checkCollision = function () {
	if (this.x + ENEMY_INFO.width >= this.player.x && this.x < this.player.x + ENEMY_INFO.width && this.y === this.player.y) {
		this.win();
	}
};

Enemy.prototype.win = function () {
	alert("Bugs win\n(You DIE...)");
	this.player.resetGame();
};

const Player = function (x, y) {
	Creature.call(this, x, y, PLAYER_INFO.sprite);
};

Player.prototype = Object.create(Creature.prototype);

Player.prototype.update = function () {};

Player.prototype.win = function () {
	setTimeout(() => {
		alert("You win YEAH!");
		this.resetGame();
	}, 100);
};

Player.prototype.resetGame = function () {
	player.x = PLAYER_INFO.startPositionX;
	player.y = PLAYER_INFO.startPositionY;
};

Player.prototype.updatePosition = function (newX, newY) {
	if (newX >= 0 && newX <= PLAYING_AREA_INFO.width) {
		this.x = newX;
	}
	if (newY >= 0 && newY <= PLAYING_AREA_INFO.height) {
		this.y = newY;
	}
	if (newY < 0) {
		this.y = newY;
		this.win();
	}
};

Player.prototype.handleInput = function (keycode) {
	let newX = this.x,
		newY = this.y;
	switch (keycode) {
		case "up":
			newY = this.y - CELL_INFO.height;
			break;
		case "right":
			newX = this.x + CELL_INFO.width;
			break;
		case "down":
			newY = this.y + CELL_INFO.height;
			break;
		case "left":
			newX = this.x - CELL_INFO.width;
			break;
		default:
			break;
	}
	this.updatePosition(newX, newY);
};

const player = new Player(PLAYER_INFO.startPositionX, PLAYER_INFO.startPositionY);

const enemyStartPostionsY = Array.from({ length: 3 }, (element, index) => (index + 1) * CELL_INFO.height - CELL_INFO.creaturePositionCorrection);
const allEnemies = enemyStartPostionsY.map((posY) => new Enemy(ENEMY_INFO.startPositionX, posY, player));
document.addEventListener("keyup", function (e) {
	var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down",
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
