const main = document.querySelector(".main");
const CARD_DELAY = 500;
const PAIRS_QUANTITY = 6;
const game = {
	count: 0,
	moves: 0,
	currentPair: [],
	frontImgSrc: "./img/front.png",
	cardIds: [0, 1, 2, 3, 4, 5],
	getRandomIds() {
		return [...this.cardIds, ...this.cardIds].sort(
			() => 0.5 - Math.random()
		);
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
	endGame() {
		if (this.count === PAIRS_QUANTITY) {
			createMenu(`You won in ${this.moves} moves!`);
		}
	},
	startNewGame() {
		main.innerHTML = "";
		this.resetGame();
		const container = document.createDocumentFragment();
		this.getRandomIds().forEach((id) =>
			container.append(createCard(this, id))
		);
		main.append(container);
	},
};

createMenu("Memory Pairs Game");

function turnPair(openedCards, card) {
	if (checkTurn(openedCards, card)) {
		openedCards.push(card);
		if (openedCards.length === 2) {
			checkMatch(openedCards);
			game.addMove();
		}
	} else {
		turnCard(card);
	}
}

function checkTurn(openedCards, card) {
	return !openedCards.includes(card) && openedCards.length < 2;
}

function checkMatch(openedCards) {
	if (openedCards[0].id === openedCards[1].id) {
		removePair(openedCards);
	} else {
		closePair(openedCards);
	}
}

function closePair(openedCards) {
	setTimeout(function () {
		openedCards.forEach((card) => turnCard(card));
		openedCards.length = 0;
	}, CARD_DELAY);
}

function removePair(openedCards) {
	setTimeout(function () {
		openedCards.forEach(card => removeCard(card));
		openedCards.length = 0;
	}, CARD_DELAY);
	game.addCount();
	game.endGame();
}

function turnCard(card) {
	card.classList.toggle("card-active");
}

function removeCard(card) {
	card.style.visibility = "hidden";
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
		turnCard(card);
		turnPair(game.currentPair, card);
	});

	return card;
}
