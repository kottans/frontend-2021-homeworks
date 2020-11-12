const cardNames = [
  'bear',
  'bill',
  'blaster',
  'diary',
  'dragon',
  'fighter',
];

const state = {
  flippedCards: {
    flippedCardsCount: null,
    flippedCollection: null,
  },
  hiddenCardsCount: null,
  gameState: null
};

const makeCardpool = () => {
  const shuffleCards = (cardNames) => {
    return [...cardNames, ...cardNames]
      .sort(() => (0.5 - Math.random()));
  };
  const shuffledCards = shuffleCards(cardNames);
  const cardsContainer = document.querySelector('.cards-container');

  const cardTemplate = (cardName) => `
    <div class="card" data-card-id="${cardName}" data-flip="false">
    <div class="card-back">
      <img src="./resources/gf-pics/${cardName}.png" alt="flag" class="card-img" />
    </div>
    <div class="card-front">
    </div>
    </div>
  `;

  cardsContainer.innerHTML = shuffledCards.map(cardTemplate).join('');

  state.gameState = 'in progress';
  
  const cards = document.querySelectorAll('.card');
  cards.forEach((el) => el.addEventListener('click', handler));
};

// const sleep = (ms, fn) => setTimeout(fn, ms);

const updateCardsState = () => {
  const flippedCards = document.querySelectorAll('[data-flip="true"]');
  state.flippedCards.flippedCardsCount = flippedCards.length;
  state.flippedCards.flippedCollection = [...flippedCards];
};

const checkFlippedCardsCount = () => state.flippedCards.flippedCardsCount === 2;

const checkIdentity = () => {
  const [first, second] = state.flippedCards.flippedCollection.map(el => el.dataset.cardId);
  return first === second;
};

const CheckWinCondition = () => document.querySelectorAll('.hidden').length === 12;

const flipCard = (card) => {
  card.classList.add('flip');
  card.dataset.flip = 'true';
  updateCardsState();
};

const hideCards = () => {
  state.flippedCards.flippedCollection.forEach(card => {
    card.dataset.flip = 'false';
    card.classList.add('hidden');
    card.removeEventListener('click', handler);
  });
  updateCardsState();
};

const unFlip = () => {
  state.flippedCards.flippedCollection.forEach((el) => {
    el.classList.remove('flip');
    el.dataset.flip = 'false';
  });
  updateCardsState();
};

const endGame = () => {
  alert('You win');
  state.gameState = null;
  render();
};

const render = () => {
  if(!state.gameState) makeCardpool();
  if(state.gameState === 'end') setTimeout(endGame, 500);
};

const handler = ({ target }) => {
  const card = target.closest('.card');
  
  if (!checkFlippedCardsCount()) {
    flipCard(card);
  }
  
  if (checkFlippedCardsCount()) {
    if (checkIdentity()) {
      hideCards();
    }
    else {
      setTimeout(unFlip, 500);
    }
  }
  
  if (CheckWinCondition()) state.gameState = 'end';
  
  render();
};


export default () => {
  render();
};
