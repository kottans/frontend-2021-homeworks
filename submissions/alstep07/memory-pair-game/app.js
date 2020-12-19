const main = document.querySelector(".main");
const game = {
	count: 0,
	moves: 0,
	currentPair: [],
	frontImgSrc: "./img/front.png",
	getRandomIds() {
		let ids = [0, 1, 2, 3, 4, 5];
		return [...ids, ...ids].sort(() => 0.5 - Math.random());
	},
	addCount() {
		this.count++;
	},
	resetGame() {
		this.count = 0;
		this.moves = 0;
	},
	addMove() {
		this.moves++;
	},
	winGame() {
		if (this.count === 6) {
			createMenu(`You won in ${this.moves} moves!`);
		}
	},
	startNewGame() {
		main.innerHTML = "";
		this.resetGame();
		const container = document.createDocumentFragment();
		this.getRandomIds().forEach((id) => container.append(createCard(this, id)));
		main.append(container);
	},
};

createMenu("Memory Pairs Game");

function turnCards(arr, card) {
	if (checkTurn(arr, card)) {
		arr.push(card);
		if (arr.length === 2) {
			checkMatch(arr);
			game.addMove();
		}
	} else {
		card.classList.toggle("card-active");
	}
}

function checkMatch(arr) {
	if (arr[0].id === arr[1].id) {
		removePair(arr);
	} else {
		closePair(arr);
	}
}

function checkTurn(arr, card) {
	return arr.indexOf(card) === -1 && arr.length < 2;
}

function closePair(arr) {
	setTimeout(function () {
		arr.forEach((item) => item.classList.toggle("card-active"));
		arr.length = 0;
	}, 500);
}

function removePair(arr) {
	setTimeout(function () {
		arr.forEach((item) => (item.style.visibility = "hidden"));
		arr.length = 0;
	}, 500);
	game.addCount();
	game.winGame();
}

function createMenu(title) {
	main.innerHTML = "";
	const startMenu = document.createElement("div");
	const startHeader = document.createElement("h1");
	const startBtn = document.createElement("button");
	startHeader.textContent = title;
	startBtn.textContent = "New Game";

	startMenu.classList.add("menu");
	startHeader.classList.add("menu__title");
	startBtn.classList.add("menu__btn");

	startMenu.append(startHeader, startBtn);
	main.append(startMenu);
	startBtn.addEventListener("click", function () {
		game.startNewGame();
	});
}

function createCard(game, id) {
	const card = document.createElement("div");
	const cardFlipper = document.createElement("div");
	const front = document.createElement("div");
	const back = document.createElement("div");
	const frontImg = document.createElement("img");
	const backImg = document.createElement("img");

	front.append(frontImg);
	back.append(backImg);
	cardFlipper.append(front, back);
	card.append(cardFlipper);

	frontImg.setAttribute("src", game.frontImgSrc);
	backImg.setAttribute("src", `./img/${id}.png`);
	card.setAttribute("id", id);

	front.classList.add("card__front");
	back.classList.add("card__back");
	frontImg.classList.add("card__img");
	backImg.classList.add("card__img");
	card.classList.add("card");
	cardFlipper.classList.add("card__flipper");

	card.addEventListener("click", function () {
		card.classList.toggle("card-active");
		turnCards(game.currentPair, card);
	});

	return card;
}
