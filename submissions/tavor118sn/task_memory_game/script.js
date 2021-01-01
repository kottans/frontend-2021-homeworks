// General stuff

const GAME_BOARD = document.getElementById('gameBoard');
let openedCards = [];
let pairsFound = 0;

const CARDS = [
  '8-Bit',
  'Brok',
  'Colt',
  'Shelly',
];

const pairsNumber = CARDS.length;


const shuffleArray = (array) => array.sort(function () {
  return 0.5 - Math.random()
});


// Generate gameboard

const createCard = (elem, index) => {

  const flipCard = document.createElement('div');
  flipCard.classList.add('flip-card');
  flipCard.dataset.cardValue = elem;

  const flipInner = document.createElement('div');
  flipInner.classList.add('flip-card-inner');

  flipInner.innerHTML = `
    <div class="front">
      <img class="front-img" src="./img/brawl-stars-main-icon.png" alt="Brawl Icon">
    </div>
      <div class="back">
      <img class="front-img" src="./img/${elem}.png" alt="${elem}">
    </div>`;
  flipCard.appendChild(flipInner);

  return flipCard;

};


const initGame = () => {
  GAME_BOARD.innerHTML = '';
  pairsFound = 0;
  let fragment = document.createDocumentFragment();

  let allCards = shuffleArray([...CARDS, ...CARDS]);
  allCards.forEach((elem, index) => {
    fragment.appendChild(createCard(elem, index));
  });
  GAME_BOARD.appendChild(fragment);
};


// Game logic

const checkPair = () => {
  if (openedCards[0].dataset.cardValue === openedCards[1].dataset.cardValue) {
    for (const card of openedCards) {
      card.classList.add('paired');
    }
    pairsFound++;
    checkIfUserWin();
  } else {
    for (const card of openedCards) {
      setTimeout(() => {
          card.classList.remove('opened');
        }, 500
      );
    }
  }
  openedCards = [];
};


const checkIfUserWin = () => {
  if (pairsFound === pairsNumber) {
    setTimeout(() => {
        alert('Congratulations! You Win!');
        initGame();
      }, 500
    );
  }
};


const handleCardChoice = (flipCard) => {

  if (
    flipCard.classList.contains('paired') || flipCard.classList.contains('opened')
  ) return;

  if (openedCards.length < 2) {
    flipCard.classList.toggle('opened');
    openedCards.push(flipCard);
  }

  if (openedCards.length === 2) {
    checkPair()
  }

};


// init game

initGame();


GAME_BOARD.addEventListener('click', (event) => {

  let flipCard = event.target.closest('.flip-card');
  if (!flipCard) return;

  handleCardChoice(flipCard);

});


