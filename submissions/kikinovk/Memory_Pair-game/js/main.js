const images = [
  { src : './img/card_1.svg',
    id : '01',
    alt : 'Camel'
  },
  { src : './img/card_2.svg',
    id : '02',
    alt: 'Dog'
  },
  { src : './img/card_3.svg',
      id : '03',
      alt: 'Tasmanian devil'
  },
  { src : './img/card_4.svg',
    id : '04',
    alt: 'Bear'
  },
  { src : './img/card_5.svg',
    id : '05',
    alt: 'Goat'
  },
  { src : './img/card_6.svg',
    id : '06',
    alt: 'Owl'
  }
];

let openCard;
const delay = 500;
const maxCard = 6;
const cards = [];
const gameBoard = document.querySelector('.gameboard');
const restartButton = document.querySelector('#restart_game');

const selectImage = (cards, images) => {
  const maxRandom = images.length;
  let random = 0;

  do {
    random = Math.floor(Math.random() * Math.floor(maxRandom));
  } while (cards
              .filter(card => card.dataset.id === images[random].id)
              .length === 2);
  return images[random]
};

const creatCard = ({src, id, alt}) => {
  const card =  document.createElement('div');

  card.classList.add('card');
  card.dataset.id = id;
  card.innerHTML = `<div class="card__front">
                      <img src="./img/face.png" class="card__img--front" alt="face card">
                    </div>
                    <div class="card__back">
                      <img src="${src}" class="card__img--back" alt="${alt}">
                    </div>`;
  return card
};

const initGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < maxCard*2; i++) {
    const card = creatCard(selectImage(cards, images));

    fragment.appendChild(card);
    cards.push(card);
  };
  gameBoard.appendChild(fragment);
};

const openedCard = (card) => {
  card.classList.add('card--open');
};

const closedCard = (card) => {
  if (card.classList.contains('card--open')) {
    setTimeout(() => {
      card.classList.remove('card--open')
    }, delay);
    card.open = false;
  };
};

const disappearCard = (card) => {
  setTimeout(() => {
    card.classList.add('card--disappear')
    setTimeout(() => {
      card.classList.add('card--disable')
    }, delay);
  },  delay*2);
};

const eventCard = () => {
  gameBoard.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    openedCard(card);
    if (!openCard) {
      openCard = card;
      card.open = true;
    } else if (openCard.dataset.id === card.dataset.id
                && !card.open) {
      disappearCard(card);
      disappearCard(openCard);
      openCard = undefined;
    } else {
        closedCard(card);
        closedCard(openCard);
        openCard = undefined;
    };
  });
};

const restartGame = () => {
  cards.length = 0;
  gameBoard.innerHTML = '';
  initGameBoard();
  eventCard();
};

document.addEventListener('DOMContentLoaded', () => {

  initGameBoard();
  eventCard();

  restartButton.addEventListener('click', () => restartGame() );
})
