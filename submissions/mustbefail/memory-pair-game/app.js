const CARD_NAMES = ['bear', 'bill', 'blaster', 'diary', 'dragon', 'fighter'];

const WIN_CON_CARDS_NUM = 12;
const NUM_OF_CARDS_TO_CHECK = 2;

const state = {
  flippedCards: {
    flippedCardsCount: null,
    flippedCollection: null,
  },
  hiddenCardsCount: null,
  gameState: null,
};

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

const shuffleCards = (cardNames) => {
  return [...cardNames, ...cardNames].sort(() => 0.5 - Math.random());
};

const makeCardpool = () => {
  const shuffledCards = shuffleCards(CARD_NAMES);

  cardsContainer.innerHTML = shuffledCards.map(cardTemplate).join('');

  state.gameState = 'in progress';
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isCardBlocked = (card) => card.dataset.flip !== 'blocked';

const isFlippedCardsCount = () =>
  state.flippedCards.flippedCardsCount === NUM_OF_CARDS_TO_CHECK;

const hasIdentity = () => {
  const [first, second] = state.flippedCards.flippedCollection.map(
    (el) => el.dataset.cardId
  );
  return first === second;
};

const hasWinCondition = () =>
  document.querySelectorAll('.hidden').length === WIN_CON_CARDS_NUM;


const flipCard = (card) => {
  card.classList.add('flip');
  card.dataset.flip = 'true';
};

const hideCards = () => {
  state.flippedCards.flippedCollection.forEach((card) => {
    card.dataset.flip = 'blocked';
    card.querySelector('.card-back').classList.add('hidden');
  });
};

const unFlip = async () => {
  await sleep(500);
  state.flippedCards.flippedCollection.forEach((el) => {
    el.classList.remove('flip');
    el.dataset.flip = 'false';
  });
  state.flippedCards.flippedCardsCount = 0;
};

const endGame = async () => {
  await sleep(500);
  alert('You win');
  state.gameState = null;
  render(state);
};

const render = (state) => {
  if (!state.gameState) makeCardpool();
};

const handler = ({ target }) => {
  const card = target.closest('.card');
  if(!card) return;


  if (isCardBlocked(card)) {
    flipCard(card);
    const flippedCards = document.querySelectorAll('[data-flip="true"]');
    state.flippedCards.flippedCardsCount = flippedCards.length;
    state.flippedCards.flippedCollection = [...flippedCards];
  }


  if (isFlippedCardsCount()) {
    if (hasIdentity()) hideCards();
    else unFlip();
  }
  if (hasWinCondition()) endGame();
};

cardsContainer.addEventListener('click', handler);

export default () => {
  render(state);
};
