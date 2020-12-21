const images = [
  { src : './img/card_1.svg',
    id : '01'
  },
  { src : './img/card_2.svg',
    id : '02'
  },
  { src : './img/card_3.svg',
      id : '03'
  },
  { src : './img/card_4.svg',
    id : '04'
  },
  { src : './img/card_5.svg',
    id : '05'
  },
  { src : './img/card_6.svg',
    id : '06'
  }
];

let openCard;
const delay = 500;
const maxCard = 6;
const cards = [];
const gameBoard = document.querySelector('.gameboard');
const restartButton = document.querySelector('#restart_game');

const selectImage = (cards, images) => {
  let maxRandom = images.length;
  let random = 0;

  do {
    random = Math.floor(Math.random() * Math.floor(maxRandom));
  } while (cards
              .filter(card => card.dataset.id === images[random].id)
              .length === 2);
  return images[random]
};

const creatCard = ({src, id}) => {
  let card =  document.createElement('div');

  card.classList.add('card');
  card.dataset.id = id;
  card.innerHTML = `<div class="card__front">
                      <img src="./img/face.png" class="card__img--front" >
                    </div>
                    <div class="card__back">
                      <img src="${src}" class="card__img--back">
                    </div>`;
  return card
};

const initGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < maxCard*2; i++) {
    let card = creatCard(selectImage(cards, images));

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
    card.classList.remove('card--open');
    card.open = false;
  };
};

const disappearCard = (card) => {
  setTimeout(() => {
    card.classList.add('card--disappear');
    setTimeout(() => {
      card.classList.add('card--disable')
    }, delay);
  }, delay*2);
};

const eventCard = () => {
  cards.forEach(card => {
    card.addEventListener('click', () => {
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
        setTimeout(() => {
          closedCard(card);
          closedCard(openCard);
          openCard = undefined;
        }, delay);
      };
    });
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
