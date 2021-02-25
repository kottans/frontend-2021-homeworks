let quantityOfCardsLeft;
let cardID, cardValue, prevCardId, prevCardValue;
let quantityOfOpenCards = 0;
let preventMoreCardsOpening = false;

document.addEventListener("DOMContentLoaded", () => {
  startNewGame();

  document.querySelector("main").addEventListener("click", (event) => {
    let aEl = event.target.closest(".flip-container");
    if (!aEl || aEl?.id === prevCardId || preventMoreCardsOpening) return;

    if (quantityOfOpenCards < 2) {
      quantityOfOpenCards++;
      cardID = aEl.id;
      cardValue = aEl.getAttribute("value");

      flip(cardID);
    }

    if (quantityOfOpenCards === 1) {
      prevCardId = cardID;
      prevCardValue = cardValue;
      return;
    }

    if (quantityOfOpenCards === 2) {
      preventMoreCardsOpening = true;
      processingTwoOpenCards();
    }
  });
});

const processingTwoOpenCards = () => {
  let timeoutTime = 900;
  setTimeout(() => {
    if (cardValue === prevCardValue && cardID !== prevCardId) {
      hideMatchedCards(cardID, prevCardId);
    } else {
      flipNotMatchedCards(cardID, prevCardId);
    }
    quantityOfOpenCards = 0;
    preventMoreCardsOpening = false;
    prevCardId = null;
    prevValue = null;
    if (quantityOfCardsLeft === 0) {
      finishCurrentGame();
    }
  }, 1000);
};

const startNewGame = () => {
  clearField();
  createField(cards);
  quantityOfCardsLeft = cards.length;
};

const finishCurrentGame = () => {
  alert("You Won!");
  startNewGame();
};

const clearField = () => {
  document.querySelector("main").innerHTML = "";
};

const createField = (arr) => {
  let shuffledArr = shuffle(arr);
  let cardsfield = document.createDocumentFragment();
  shuffledArr.forEach((element, index) => {
    let card = document.createElement("div");
    card.innerHTML = createCard(element, index);
    cardsfield.appendChild(card);
  });
  document.querySelector("main").appendChild(cardsfield);
};

const shuffle = (arr) => {
  return arr.sort(() => 0.5 - Math.random());
};

const createCard = (content, index) => {
  return `<div class="flip-container" value="${content.value}" id="card-${index}">
        <div class="flipper">
            <div class="front"></div>
            <div class="back">
            <img src="${content.src}" alt="${content.alt}">
            </div>
        </div>
    </div>`;
};

const flip = (cardID) => {
  document.querySelector(`#${cardID}`).classList.toggle("flip");
};

const hideMatchedCards = (firstCardID, secondCardID) => {
  document.querySelector(`#${firstCardID}`).classList.add("hidden");
  document.querySelector(`#${secondCardID}`).classList.add("hidden");
  quantityOfCardsLeft -= 2;
};

const flipNotMatchedCards = (firstCardID, secondCardID) => {
  flip(firstCardID);
  flip(secondCardID);
};

const uniqueCards = [
  {
    src: "./img/image1.png",
    alt: "image1",
    value: 1,
  },
  {
    src: "./img/image2.png",
    alt: "image2",
    value: 2,
  },
  {
    src: "./img/image3.png",
    alt: "image3",
    value: 3,
  },
  {
    src: "./img/image4.png",
    alt: "image4",
    value: 4,
  },
  {
    src: "./img/image5.png",
    alt: "image5",
    value: 5,
  },
  {
    src: "./img/image6.png",
    alt: "image6",
    value: 6,
  },
];
const cards = uniqueCards.concat(uniqueCards);
