const container = document.querySelector(".container"),
	numCards = 9;
let cardsDataInitial = Array(numCards)
	.fill()
	.map((_, i) => ({ path: `assets/p${i + 1}.svg`, name: `p${i + 1}` })),
	checkedCards = [],
	foundMatches = [],
	checkedCardsContainers = [];
const cardsData = cardsDataInitial.concat(cardsDataInitial);
let shuffledCards = shuffleArray(cardsData);

function shuffleArray(o) {
	for (
		let j, x, i = o.length;
		i;
		j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
	);
	return o;
}

document.addEventListener("DOMContentLoaded", () => {
	appendCards(shuffledCards);
});

function appendCards(shuffledCards) {
	const fragment = document.createDocumentFragment();
	shuffledCards.forEach((card, index) => {
		fragment.appendChild(createCard(card.name, card.path, index));
	});
	container.appendChild(fragment);
}

function createCard(cardName, cardImgPath, index) {
	const card = document.createElement("div"),
		cardContainer = document.createElement("div"),
		cardBack = document.createElement("div"),
		cardFront = document.createElement("div"),
		img = document.createElement("img");
	img.src = cardImgPath;
	img.alt = `${cardName} card image`;
	img.classList.add("card__image");
	cardBack.classList.add("card_back");
	cardBack.addEventListener("click", checkCard);
	cardFront.appendChild(img);
	cardFront.classList.add("card_front", "flex-center");
	cardFront.setAttribute("name", cardName);
	cardContainer.classList.add("card__container");
	cardContainer.appendChild(cardBack);
	cardContainer.appendChild(cardFront);
	card.appendChild(cardContainer);
	card.classList.add("card");
	setOpacity(cardContainer, 1, index * 150);
	return card;
}

function checkCard(e) {
	if (checkedCards.length < 2) {
		const cardContainer = e.target.offsetParent;
		cardContainer.classList.add("flip");
		checkedCards.push(e.target.nextSibling.attributes.name.value);
		checkedCardsContainers.push(cardContainer);
		if (checkedCards.length == 2) {
			if (checkedCards[0] === checkedCards[1]) {
				foundMatches = foundMatches.concat(checkedCards);
				checkedCardsContainers.forEach((el) => {
					changeSize(el);
				});
			} else {
				checkedCardsContainers.forEach((el) => {
					flipBack(el);
				});
			}
			setTimeout(() => {
				checkedCardsContainers = [];
				checkedCards = [];
			}, 600);
		}
	}
	if (foundMatches.length === shuffledCards.length) {
		const winContainer = document.querySelector(".win__container");
		if (winContainer !== null) {
			winContainer.style.opacity = "0";
			winContainer.style.display = "flex";
			setOpacity(winContainer, 1);
		} else {
			showWinMessage();
		}
	}
}

function changeSize(card) {
	setTimeout(() => {
		card.style.width = "0";
		card.style.height = "0";
		card.childNodes.forEach(
			(cardInnerStyle) => (cardInnerStyle.style.display = "none")
		);
	}, 500);
}

function setOpacity(property, value, delay = 1000) {
	setTimeout(() => (property.style.opacity = value), delay);
}

function flipBack(card) {
	setTimeout(() => {
		card.classList.remove("flip");
	}, 500);
}

function showWinMessage() {
	const winMessage = document.createElement("div"),
		heading = document.createElement("h1"),
		button = document.createElement("button");
	heading.classList.add("win__heading");
	heading.innerHTML = "Congratulations!<br>You won!";
	button.classList.add("win__button");
	button.innerText = "Restart!";
	button.addEventListener("click", reset);
	winMessage.appendChild(heading);
	winMessage.appendChild(button);
	winMessage.classList.add("win__container", "flex-center");
	setOpacity(winMessage, 1);
	document.body.appendChild(winMessage);
}

function reset() {
	checkedCards = [];
	checkedCardsContainers = [];
	foundMatches = [];
	shuffledCards = shuffleArray(cardsData);
	container.innerHTML = "";
	document.querySelector(".win__container").style.display = "none";
	appendCards(shuffledCards);
}

