const enemyInfo = {
	minSpeed: 100,
	maxSpeed: 300,
	sprite: "images/enemy-bug.png",
	width: 75,
};
const cellInfo = {
	width: 101,
	height: 83,
	beingPositionCorrection: 28,
};
const playerInfo = {
	sprite: "images/char-boy.png",
	startPositionX: cellInfo.width * 2,
	startPositionY: cellInfo.height * 5 - cellInfo.beingPositionCorrection,
};
const playingAreaInfo = {
	width: cellInfo.width * 4,
	height: cellInfo.height * 5,
};
const allEnemies = [];

let generateEnemySpeed = function () {
	return Math.floor(Math.random() * (enemyInfo.maxSpeed - enemyInfo.minSpeed)) + enemyInfo.minSpeed;
};

const Being = function (x, y, sprite) {
	this.x = x;
	this.y = y;
	this.sprite = sprite;
};

Being.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Enemy = function (x, y) {
	Being.call(this, x, y, enemyInfo.sprite);
	this.speed = generateEnemySpeed();
};

Enemy.prototype = Object.create(Being.prototype);

Enemy.prototype.update = function (dt) {
	this.x += this.speed * dt;
	if (this.x > cellInfo.width * 5) {
		this.x = -cellInfo.width;
		this.speed = generateEnemySpeed();
	}
	this.checkCollision();
};

Enemy.prototype.checkCollision = function () {
	if (this.x + enemyInfo.width >= player.x && this.x < player.x + enemyInfo.width && this.y === player.y) {
		this.win();
	}
};

Enemy.prototype.win = function () {
	alert("Bugs win\n(You DIE...)");
	player.resetGame();
};

const Player = function (x, y) {
	Being.call(this, x, y, playerInfo.sprite);
};

Player.prototype = Object.create(Being.prototype);

Player.prototype.update = function () {};

Player.prototype.win = function () {
	setTimeout(() => {
		alert("You win YEAH!");
		this.resetGame();
	}, 100);
};

Player.prototype.resetGame = function () {
	player.x = playerInfo.startPositionX;
	player.y = playerInfo.startPositionY;
};

Player.prototype.updatePosition = function (newX, newY) {
	if (newX >= 0 && newX <= playingAreaInfo.width) {
		this.x = newX;
	}
	if (newY >= 0 && newY <= playingAreaInfo.height) {
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
			newY = this.y - cellInfo.height;
			break;
		case "right":
			newX = this.x + cellInfo.width;
			break;
		case "down":
			newY = this.y + cellInfo.height;
			break;
		case "left":
			newX = this.x - cellInfo.width;
			break;
		default:
			break;
	}
	this.updatePosition(newX, newY);
};

const enemyStartPostionsY = [];
for (let i = 1; i <= 3; i++) {
	enemyStartPostionsY.push(cellInfo.height * i - cellInfo.beingPositionCorrection);
}
enemyStartPostionsY.forEach((posY) => {
	let enemy = new Enemy(-enemyInfo.width, posY);
	allEnemies.push(enemy);
});

const player = new Player(playerInfo.startPositionX, playerInfo.startPositionY);

document.addEventListener("keyup", function (e) {
	var allowedKeys = {
		37: "left",
		38: "up",
		39: "right",
		40: "down",
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
