const cardBoard = document.querySelector('.card-board');
const newGameButton = document.querySelector('.new-game-btn');
const winPopup = document.querySelector('.win-popup');
const cardIds = [
  'paw-1',
  'paw-2',
  'paw-3',
  'paw-4',
  'paw-5',
  'paw-6',
  'paw-7',
  'paw-8'
];

let firstFlip;
let secondFlip;
let pairsOpen = 0;

const cards = cardIds.flatMap(id => [createCard(id), createCard(id)]);

function createCard(id) {
  let newCard = document.createElement('li');
  newCard.classList.add('card');
  newCard.id = id;
  newCard.innerHTML = `
    <div class="card-front">
      <img src="img/icon-cat.svg" alt="">
    </div>
    <div class="card-back">
      <img src="img/${id}.png" alt="">
    </div>
    `;
  return newCard;
}

function renderCards() {
  let fragment = document.createDocumentFragment();
  fragment.append(...shuffleCards(cards));
  cardBoard.append(fragment);
}

function flipCard(card) {
  card.classList.add('flip');
  !firstFlip ? firstFlip = card : secondFlip = card;
  if (firstFlip && secondFlip) checkPair();
}

function checkPair() {
  if (firstFlip.id !== secondFlip.id) {
    setTimeout(function () {
      firstFlip.classList.remove('flip');
      secondFlip.classList.remove('flip');
      firstFlip = null;
      secondFlip = null;
    }, 600)
  } else {
    firstFlip = null;
    secondFlip = null;
    pairsOpen++;
    checkWin();
  }
}

function checkWin() {
  if (pairsOpen === cardIds.length) {
    setTimeout(function () {
      winPopup.classList.remove('hidden');
    }, 200)
  }
}

function restartGame() {
  pairsOpen = 0;
  cards.forEach(card => card.classList.remove('flip'));
  renderCards();
}

function shuffleCards(cards) {
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
}

renderCards();

cardBoard.addEventListener('click', function (evt) {
  let card = evt.target.closest('.card');
  if (!card.classList.contains('flip')) flipCard(card);
})

newGameButton.addEventListener('click', function () {
  winPopup.classList.add('hidden');
  restartGame();
})
