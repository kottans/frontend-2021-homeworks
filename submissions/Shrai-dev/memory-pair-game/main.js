const CARD_ARRAY = [
  {
    name: "Cheerful Santa",
    src: "./assets/cheerful-santa.jpg",
  },
  {
    name: "Cheerful Santa",
    src: "./assets/cheerful-santa.jpg",
  },
  {
    name: "Christmas tree",
    src: "./assets/christmas-tree.jpg",
  },
  {
    name: "Christmas tree",
    src: "./assets/christmas-tree.jpg",
  },
  {
    name: "Christmas stocking",
    src: "./assets/christmas-stocking.jpg",
  },
  {
    name: "Christmas stocking",
    src: "./assets/christmas-stocking.jpg",
  },
  {
    name: "Elf",
    src: "./assets/elf.jpg",
  },
  {
    name: "Elf",
    src: "./assets/elf.jpg",
  },
  {
    name: "Snowman",
    src: "./assets/snowman.jpg",
  },
  {
    name: "Snowman",
    src: "./assets/snowman.jpg",
  },
  {
    name: "Gift",
    src: "./assets/gift.png",
  },
  {
    name: "Gift",
    src: "./assets/gift.png",
  },
  {
    name: "Reindeer",
    src: "./assets/reindeer.jpg",
  },
  {
    name: "Reindeer",
    src: "./assets/reindeer.jpg",
  },
  {
    name: "Christmas sleigh",
    src: "./assets/christmas-sleigh.png",
  },
  {
    name: "Christmas sleigh",
    src: "./assets/christmas-sleigh.png",
  },
];

const MAIN = document.querySelector(".main");
const BOARD = document.querySelector(".memory-board");

const startScreen = document.createElement("div");
startScreen.classList.add("overlay-text", "visible");
startScreen.innerText = "Click to Start";
startScreen.setAttribute("data-action", "newGame");
MAIN.appendChild(startScreen);

const victoryScreen = document.createElement("div");
victoryScreen.classList.add("overlay-text");
victoryScreen.innerText = "Victory";
victoryScreen.setAttribute("id", "victory-text");
victoryScreen.setAttribute("data-action", "newGame");
MAIN.appendChild(victoryScreen);

const restart = document.createElement("span");
restart.classList.add("overlay-text-small");
restart.innerText = "Click to Restart";
victoryScreen.appendChild(restart);

let backImg;
let frontImg;
let boardCard;
let cards;
let cardsWon = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function startGame() {
  createCard(BOARD, CARD_ARRAY);
  sortCards();

  MAIN.addEventListener('click', ({ target }) => {
    if (target.dataset.action === "newGame") {
      target.classList.remove("visible");
    }
  })
}

function createCard(wrapper, array) {
  array.forEach((card) => {
    container = document.createElement("div");
    container.classList.add("board-card");
    container.setAttribute("data-name", card.name);
    wrapper.appendChild(container);
    const backImg = document.createElement("img");
    backImg.classList.add("back-face");
    backImg.setAttribute("src", "./assets/snowflake.jpg");
    container.appendChild(backImg);
    const frontImg = document.createElement("img");
    frontImg.classList.add("front-face");
    frontImg.setAttribute("src", card.src);
    frontImg.setAttribute("data-name", card.name);

    container.appendChild(frontImg);
  });
}

function sortCards() {
  cards = Array.from(document.querySelectorAll(".board-card"));
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 16);
    card.style.order = randomPosition;
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    disableCards();
    cardsWon += 1;
    setTimeout(checkWon, 1000);
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function checkWon() {
  if (cardsWon === CARD_ARRAY.length / 2) {
    victoryScreen.classList.add("visible");

    setTimeout(() => replay(), 1000);
  }
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function replay() {
  BOARD.innerHTML = "";
  startGame();
  cardsWon = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  startGame();
  let boardCards = cards.forEach((card) => card.addEventListener("click", flipCard));
});
