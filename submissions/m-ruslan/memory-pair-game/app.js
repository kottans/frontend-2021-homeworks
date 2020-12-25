// main logic of game
document.addEventListener("DOMContentLoaded", () => {
  let cardID, cardValue, prevCardId, prevCardValue;
  let qOfOpenCards = 0;

  startNewGame();

  document.querySelector("main").addEventListener("click", (event) => {
    let aEl = event.target.closest(".flip-container");
    if (!aEl) return;
    if (aEl.id === prevCardId) return;

    if (qOfOpenCards < 2) {
      qOfOpenCards++;
      cardID = aEl.id;
      cardValue = aEl.getAttribute("value");

      flip(cardID);

      if (qOfOpenCards === 1) {
        prevCardId = cardID;
        prevCardValue = cardValue;
      } else if (qOfOpenCards === 2) {
        setTimeout(() => {
          if (cardValue === prevCardValue && cardID !== prevCardId) {
            match(cardID, prevCardId);
          } else {
            dontMatch(cardID, prevCardId);
          }

          qOfOpenCards = 0;
          prevCardId = null;
          prevValue = null;

          if (qOfCardsLeft === 0) {
            youWon();
          }
        }, 1000);
      }
    }
  });
});

//main functions
const startNewGame = () => {
  clearField();
  createField(arrOfCards);
  qOfCardsLeft = arrOfCards.length;
};

const youWon = () => {
  alert("You Won!");
  startNewGame();
};

const clearField = () => {
  document.querySelector("main").innerHTML = "";
};

const createField = (arr) => {
  let shuffledArr = shuffle(arr);
  let cardsfield = document.createDocumentFragment();
  for (let i = 0; i < shuffledArr.length; i++) {
    let card = document.createElement("div");
    card.innerHTML = createCard(shuffledArr[i], i);
    cardsfield.appendChild(card);
  }
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
  document.querySelector("#" + cardID).classList.toggle("flip");
};

const match = (card1ID, card2ID) => {
  document.querySelector("#" + card1ID).classList.add("hidden");
  document.querySelector("#" + card2ID).classList.add("hidden");
  qOfCardsLeft -= 2;
};

const dontMatch = (card1ID, card2ID) => {
  flip(card1ID);
  flip(card2ID);
};

//global variables
const arrOfUniqueCards = [
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
const arrOfCards = arrOfUniqueCards.concat(arrOfUniqueCards);
let qOfCardsLeft;
