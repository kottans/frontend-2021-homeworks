const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let cardCounter = 0;
const gameResetDelay = 1500;
const flipCardDelay = 1500;
const cardsPairsToWin = 8;
const cardNumberArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function  flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}


function checkForMatch() {
  const isMatch = firstCard.dataset.img === secondCard.dataset.img;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  cardCounter += 1;
  resetBoard();
  if (cardCounter === cardsPairsToWin) {
    setTimeout(() => {
      restartGame();
      alert('Win!');
    }, gameResetDelay);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, flipCardDelay);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function arrayRandomSort(array) {
  array.sort((a, b) => 0.5 - Math.random());
}

function shuffle() {
  let index = 0;
  arrayRandomSort(cardNumberArray);
  cards.forEach(card => {
    card.dataset.img = `img${cardNumberArray[index]}`;
    card.querySelector('.front-img').src = `img/img${cardNumberArray[index]}.png`;
    index += 1;
  });
};

function restartGame() {
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
};


restartGame();
