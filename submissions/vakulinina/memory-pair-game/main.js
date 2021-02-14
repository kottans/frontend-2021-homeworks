const cardBoard = document.querySelector('.card-board');
const newGameButton = document.querySelector('.new-game-btn');
const winPopup = document.querySelector('.win-popup');
const cardIds = [
  { id: 'paw-1', src: 'img/paw-1.png' },
  { id: 'paw-2', src: 'img/paw-2.png' },
  { id: 'paw-3', src: 'img/paw-3.png' },
  { id: 'paw-4', src: 'img/paw-4.png' },
  { id: 'paw-5', src: 'img/paw-5.png' },
  { id: 'paw-6', src: 'img/paw-6.png' },
  { id: 'paw-7', src: 'img/paw-7.png' },
  { id: 'paw-8', src: 'img/paw-8.png' }
];

let firstFlip;
let secondFlip;
let pairsOpen = 0;

const cards = cardIds.flatMap(({ id, src }) => [createCard(id, src), createCard(id, src)]);

function createCard(id, src) {
  const newCard = document.createElement('li');
  newCard.classList.add('card');
  newCard.id = id;
  newCard.innerHTML = `
    <div class="card-front">
      <img src="img/icon-cat.svg" alt="">
    </div>
    <div class="card-back">
      <img src="${src}" alt="">
    </div>
    `;
  return newCard;
}

function renderCards() {
  const fragment = document.createDocumentFragment();
  fragment.append(...shuffleCards(cards));
  cardBoard.append(fragment);
}

function flipCard(card) {
  card.classList.add('flip');
  !firstFlip ? firstFlip = card : secondFlip = card;
  if (firstFlip && secondFlip) setTimeout(checkPair, 600);
}

function checkPair() {
  if (firstFlip.id !== secondFlip.id) {
    firstFlip.classList.remove('flip');
    secondFlip.classList.remove('flip');
  } else {
    pairsOpen++;
    checkWin();
  }
  firstFlip = null;
  secondFlip = null;
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
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
}

renderCards();

cardBoard.addEventListener('click', function (evt) {
  const card = evt.target.closest('.card');
  if (card && !(firstFlip && secondFlip) && !card.classList.contains('flip')) flipCard(card);
})

newGameButton.addEventListener('click', function () {
  winPopup.classList.add('hidden');
  restartGame();
})
