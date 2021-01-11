const CARDS_BACK_ARR = [
  "images/bear.png",
  "images/bear.png",
  "images/bell.png",
  "images/bell.png",
  "images/gingerman.png",
  "images/gingerman.png",
  "images/penguin.png",
  "images/penguin.png",
  "images/reindeer.png",
  "images/reindeer.png",
  "images/ribbon.png",
  "images/ribbon.png",
  "images/rudolf.png",
  "images/rudolf.png",
  "images/snowball.png",
  "images/snowball.png"
];
        
const CARDS_LENGTH = 16;
const DELAY1 = 1600;
const DELAY2 = 800;
const DELAY3 = 400;
const FRONT_CARD_PATH = '<img src="images/front_card.png" class="card_front" alt=" "></img>';
let cardsFlipped;
let pairsOpened;
let numOfAttempts;

window.addEventListener("load", createBoard);  

function createBoard() {
  resetVariables();
  shuffle(CARDS_BACK_ARR);
  const CARD_BOARD = document.querySelector(".card_board");
  for (let i = 0; i < CARDS_LENGTH; i++) {
    let cardInner = document.createElement("div");
    cardInner.setAttribute("class", "card_inner");
    cardInner.innerHTML = `${FRONT_CARD_PATH} <img src="${CARDS_BACK_ARR[i]}" class="card_back" alt=" ">`;
    CARD_BOARD.appendChild(cardInner);
  }
};

function resetVariables() {
  cardsFlipped = [];
  pairsOpened = 0;
  numOfAttempts = 0;
};

function shuffle(arr) {
  var currentIndex = arr.length, temporaryValue, randomIndex;
  while (currentIndex!==0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  };
};

setTimeout(() => {
    const CARDS = Array.from(document.querySelectorAll(".card_inner"));
    CARDS.forEach(card => card.addEventListener('click', flipCard));
}, DELAY1);

function flipCard(e) {
  const CARD_INNER = e.target.parentElement;
  CARD_INNER.classList.add('is-flipped');
  cardsFlipped.push(CARD_INNER); 
  if (cardsFlipped.length === 2) {
    isMatch();
  } else {
    cardsFlipped;
  };
};

function isMatch() {
  numOfAttempts++;
  let firstCard = cardsFlipped[0].lastElementChild.getAttribute("src");
  let secondCard = cardsFlipped[1].lastElementChild.getAttribute("src");
  if (firstCard === secondCard && cardsFlipped[0] != cardsFlipped[1]) {
    setTimeout(showImg, DELAY3); 
    pairsOpened++;
  } 
  else {
    setTimeout(removeFlip, DELAY2);
  }
  wonGame();
};

function showImg() {
  cardsFlipped.forEach(card => {
    card.classList.add("is-shown");
    card.classList.remove("is-flipped");
  });
  cardsFlipped = [];
};

function removeFlip() {
  cardsFlipped.forEach(card => {
    card.classList.remove("is-flipped");
  });
  cardsFlipped = [];
};

function wonGame() {
  if (pairsOpened === CARDS_LENGTH / 2) {
    setTimeout(() => {
      askPlayer();
    }, DELAY1);
  } else {
    return;
  }
};

function askPlayer() {
  if (window.confirm(`You've found all the matches and used ${numOfAttempts} attempts.\n Play one more game`)) {
        document.location.reload();
      } else {
        resetVariables();
        window.removeEventListener("load", createBoard);
        mode.removeEventListener("click", changeMode);
      };
};

let mode = document.querySelector(".mode");
mode.addEventListener("click", changeMode);

function changeMode() {
  let bodyBack = document.querySelector(".background");
  bodyBack.classList.toggle("switch");
};
