const cards = [{
    id: 1,
    src: 'img/dog_1.jpg',
    alt: 'dog_small_black_ears'
  },
  {
    id: 2,
    src: 'img/dog_2.jpg',
    alt: 'dog_pointy_white_ears'
  },
  {
    id: 3,
    src: 'img/dog_3.jpg',
    alt: 'dog_big_black_ears'
  },
  {
    id: 4,
    src: 'img/dog_4.jpg',
    alt: 'fighting_dog'
  },
  {
    id: 5,
    src: 'img/dog_5.jpg',
    alt: 'dog_big_black_nose'
  },
  {
    id: 6,
    src: 'img/cat.jpg',
    alt: 'cat'
  }
];

const allCards = [...cards, ...cards];
const shuffledCards = allCards.sort(() => {
  return 0.5 - Math.random()
});
const cardsWrapper = document.getElementById('cards-wrapper');
const DELAY_TIME = 800;
let numberOfMatches = 0;
let numberOfAttempts = 0;
let cardPairsArray = [];

const cardsContainer = document.createDocumentFragment();
shuffledCards.forEach(card => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('flip-card');
  cardDiv.innerHTML = `
        <div class='flip-card-inner'>
            <div class='flip-card-front'>
                <img src='img/front.jpg' id='${card.id}' class='image' alt='${card.alt}' />
            </div>
            <div class='flip-card-back' id='flip-card-back'>
                <img src='${card.src}' class='image' />
            </div>
        </div>
    `;
  cardsContainer.appendChild(cardDiv);
});
cardsWrapper.append(cardsContainer);

cardsWrapper.addEventListener('click', function checkCard({
  target
}) {
  const clickedCard = target.closest('.flip-card');
  if (clickedCard) {
    if (!isCardFlipped(clickedCard)) {
      cardPairsArray.push(target.id);
      [firstCard, secondCard] = cardPairsArray;
    }
    flip(clickedCard);

    if (cardPairsArray.length === 2) {
      pauseEventListener(cardsWrapper, checkCard, DELAY_TIME);
      numberOfAttempts++;
      if (isCardsMatch()) {
        hideMatchedCards();
        numberOfMatches++;
      } else {
        setTimeout(() => flipCardsBack(), DELAY_TIME);
      }
      cleanArr(cardPairsArray);
    }
    if (numberOfMatches === cards.length) {
      setTimeout(() => {
        alert(`Good job! You did it in ${numberOfAttempts} attempts.`);
        reloadGame();
      }, DELAY_TIME);
    }

    document.getElementById('attempts').textContent = numberOfAttempts;
  }
});

const reloadGame = () => document.location.reload();
const flip = card => card.classList.add('flip-card_flipped');
const cleanArr = arr => arr.length = 0;
const isCardFlipped = card => card.classList.contains('flip-card_flipped');
const hideMatchedCards = () => document.querySelectorAll(`[id='${firstCard}']`).forEach(card => card.closest('.flip-card').classList.add('hide'));
const flipCardsBack = () => document.querySelectorAll('.flip-card_flipped').forEach(card => card.closest('.flip-card').classList.remove('flip-card_flipped'));
const isCardsMatch = () => firstCard === secondCard;
const pauseEventListener = (target, func, time) => {
  target.removeEventListener('click', func);
  setTimeout(() => target.addEventListener('click', func), time);
}
