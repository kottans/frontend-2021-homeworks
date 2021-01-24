const images = [
  'images/Alfa-romeo.jpeg',
  'images/Ford.jpeg',
  'images/Mazda.jpeg',
  'images/Nissan.jpeg',
  'images/Peugeot.jpeg',
];

const cardDeck = [...images, ...images];
const duration = 600;
let winCount = 0;
let firstOpenCard = null;
let isBlock = false;
const pointsWon = images.length;
const gameBoard = document.querySelector('.cards');

function sortList() {
  cardDeck.sort(function () {
    return 0.5 - Math.random();
  });
}

const putImgsInCards = function () {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(gameBoard);
  cardDeck.forEach(function (value) {
    template = `
        <div class="card">
            <img class='front front-images' src='images/cardClosed.png' alt='front-card'>
            <img class='back back__image' src='${value}' alt='back-card'>
        </div>         
      `;
    gameBoard.insertAdjacentHTML('beforeEnd', template);
  });
  document.querySelector('main').appendChild(fragment);
};

function flipBackCards() {
  gameBoard.querySelectorAll('.card--show').forEach(function (value) {
    value.classList.remove('card--show');
  });
}

function checkCards(card) {
  if (firstOpenCard === null) {
    firstOpenCard = card;

    return;
  }

  isBlock = true;

  if (
    firstOpenCard.lastElementChild.getAttribute('src') ===
      card.lastElementChild.getAttribute('src') &&
    firstOpenCard !== card
  ) {
    setTimeout(function () {
      winCount++;
      firstOpenCard.classList.add('card--hidden');
      card.classList.add('card--hidden');
      firstOpenCard = null;
      checkWin();
      isBlock = false;
    }, duration);
  } else {
    setTimeout(function () {
      firstOpenCard = null;
      flipBackCards();
      isBlock = false;
    }, duration);
  }
}

function showCard({ target }) {
  if (!isBlock) {
    const parentCard = target.closest('.card');
    parentCard.classList.add('card--show');
    checkCards(parentCard);
  }
}

function checkWin() {
  if (winCount === pointsWon) {
    setTimeout(function () {
      alert('You are the winner!');
    }, duration);
  }
}

function InitGame() {
  sortList();
  putImgsInCards();
  gameBoard.addEventListener('click', showCard);
}

InitGame();
