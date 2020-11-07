const images = [
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png',
  'image7.png',
  'image8.png',
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png',
  'image7.png',
  'image8.png',
];

let numberOfFails = 0; 

const cardsShuffler = function() { return 0.5 - Math.random() };

const gameBoard = document.querySelector(".gameboard");

const openAllCards = function() {
  const cards = gameBoard.querySelectorAll('.flip-container');
  cards.forEach((c,i)=>{
    setTimeout(() => {
      c.classList.remove('guessed');
      c.classList.add('opened');      
    }, 100*i);
  })
};

const closeAllCards = function() {
  const cards = gameBoard.querySelectorAll('.flip-container');
  cards.forEach((c,i)=>{
    setTimeout(() => {
      c.classList.remove('guessed');
      c.classList.remove('opened');     
    }, 100*i);
  })
};

const spreadCards = function () {
  images.sort(cardsShuffler);
  gameBoard.innerHTML = '';
  images.forEach((name,i)=>{
    gameBoard.innerHTML += `<div class="flip-container" id="img/${name}">
      <div class="flipper">
        <div class="front">
          <img class="card" src="img/empty.png" alt="Back">
        </div>
        <div class="back">
          <img class="card" src="img/${name}" alt="${name}">
        </div>
      </div>
    </div>`;
  });
};

const getOpenedCards = function() {
  return gameBoard.querySelectorAll('.opened:not(.guessed)');
}

const getGuessedCards = function() {
  return gameBoard.querySelectorAll('.guessed');
}

const showInfo = (text) => {
  document.querySelector('.info').innerHTML = text;
}

const cardClickListener = function(e) { 
  const flipper = e.target.parentNode.parentNode.parentNode;
  if (!e.target.matches('.card')
      || flipper.matches('.guessed')) {
    return;
  }
  const cardImages = flipper.querySelectorAll('.card');
  
  if (getOpenedCards().length < 2) {
    if (!flipper.matches('.opened')) {
      flipper.classList.toggle('opened');
    };
  };

  const openedCards = getOpenedCards();
  
  if (openedCards.length == 2) {
    if (openedCards[0].id == openedCards[1].id) {
      setTimeout(()=>openedCards.forEach(c=>{
        c.classList.add('guessed');
      }),500);
      setTimeout(() => {
        if(getGuessedCards().length==16) {
          showInfo(`You won! Number of fails: ${numberOfFails}`);
          openAllCards();
          document.querySelector('.control').classList.remove('hide');
        };
      }, 700);
    } else {
      numberOfFails++;
      setTimeout(()=>openedCards.forEach(c=>c.classList.remove('opened')),500);
    };
  };
  if (numberOfFails>0) {
    showInfo(`Number of fails: ${numberOfFails}`);
  };
};

const startButtonListener = ()=> {
  document.querySelector('.control').classList.add('hide');
  showInfo(`Try to guess!`);
  numberOfFails = 0;
  spreadCards();
  if(document.querySelector('.preview-option').checked){
    openAllCards();
    showInfo('Remember these cards!');
    setTimeout(()=>{
      closeAllCards();
      showInfo(`And now try to guess!`);
    },10000);
  };
};

document.addEventListener('DOMContentLoaded', (event)=>{  

  showInfo('Welcome to Memory Pairs Game');

  spreadCards();
  openAllCards();

  gameBoard.addEventListener('click',cardClickListener);
  document.querySelector('.start-btn').addEventListener('click', startButtonListener);
});

