const cardArray = [
  {
    id: 1,
    name: "Cheerful Santa",
    src: "./assets/cheerful-santa.jpg",
  },
  {
    id: 1,
    name: "Cheerful Santa",
    src: "./assets/cheerful-santa.jpg",
  },
  {
    id: 2,
    name: "Christmas tree",
    src: "./assets/christmas-tree.jpg",
  },
  {
    id: 2,
    name: "Christmas tree",
    src: "./assets/christmas-tree.jpg",
  },
  {
    id: 3,
    name: "Christmas stocking",
    src: "./assets/christmas-stocking.jpg",
  },
  {
    id: 3,
    name: "Christmas stocking",
    src: "./assets/christmas-stocking.jpg",
  },
  {
    id: 4,
    name: "Elf",
    src: "./assets/elf.jpg",
  },
  {
    id: 4,
    name: "Elf",
    src: "./assets/elf.jpg",
  },
  {
    id: 5,
    name: "Snowman",
    src: "./assets/snowman.jpg",
  },
  {
    id: 5,
    name: "Snowman",
    src: "./assets/snowman.jpg",
  },
  {
    id: 6,
    name: "Gift",
    src: "./assets/gift.png",
  },
  {
    id: 6,
    name: "Gift",
    src: "./assets/gift.png",
  },
  {
    id: 7,
    name: "Reindeer",
    src: "./assets/reindeer.jpg",
  },
  {
    id: 7,
    name: "Reindeer",
    src: "./assets/reindeer.jpg",
  },
  {
    id: 8,
    name: "Christmas sleigh",
    src: "./assets/christmas-sleigh.png",
  },
  {
    id: 8,
    name: "Christmas sleigh",
    src: "./assets/christmas-sleigh.png",
  },
];

const main = document.querySelector(".main");

const board = document.createElement("div");
board.classList.add("memory-board");
main.appendChild(board);

const startScreen = document.createElement("div");
startScreen.classList.add("overlay-text", "visible");
startScreen.innerText = "Click to Start";
main.appendChild(startScreen);

const victoryScreen = document.createElement("div");
victoryScreen.classList.add("overlay-text");
victoryScreen.innerText = "Victory";
victoryScreen.setAttribute("id", "victory-text");
main.appendChild(victoryScreen);

const restart = document.createElement("span");
restart.classList.add("overlay-text-small");
restart.innerText = "Click to Restart";
victoryScreen.appendChild(restart);

let backFace;
let backImg;
let frontFace;
let frontImg;
let boardCard;
let cards;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

document.addEventListener("DOMContentLoaded", function () {
  startGame();

  function startGame() {
    createCard(board, cardArray);
    sortCards();
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    overlays.forEach((overlay) => {
      overlay.addEventListener("click", () => {
        overlay.classList.remove("visible");
      });
    });

    cards = Array.from(document.querySelectorAll(".board-card"));
    cards.forEach((card) => card.addEventListener("click", flipCard));
  }

  function createCard(boardCard, cardArray) {
    cardArray.forEach((card) => {
      boardCard = document.createElement("div");
      boardCard.classList.add("board-card");
      boardCard.setAttribute("data-name", card.name);
      boardCard.setAttribute("data-id", card.id);
      board.appendChild(boardCard);
      let backImg = document.createElement("img");
      backImg.classList.add("back-face");
      backImg.setAttribute("src", "./assets/snowflake.jpg");
      boardCard.appendChild(backImg);
      let frontImg = document.createElement("img");
      frontImg.classList.add("front-face");
      frontImg.setAttribute("src", card.src);
      frontImg.setAttribute("data-name", card.name);
      boardCard.appendChild(frontImg);
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
    } else {
      hasFlippedCard = false;
      secondCard = this;

      setTimeout(checkForMatch, 500);
    }
  }

  function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
      disableCards();
      cardsWon += 1;
      setTimeout(checkWon, 700);
    } else {
      unflipCards();
    }
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 700);
  }

  function checkWon() {
    if (cardsWon === cardArray.length / 2) {
      victoryScreen.classList.add("visible");
      
      setTimeout(() => replay(), 1000);
    }
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function replay() {
    board.innerHTML = "";
    startGame();
    cardsWon = 0;
  }
});
