const files = [
  'image1.png',
  'image2.png',
  'image3.png',
  'image4.png',
  'image5.png',
  'image6.png',
  'image7.png',
  'image8.png',
];

const cardsShuffler = function() { return 0.5 - Math.random() };

const imageNames = [...files,...files].sort(cardsShuffler);
const infoDiv = document.querySelector('.info');
const gameBoard = document.querySelector(".gameboard");
const controlDiv = document.querySelector('.control');

let numberOfFails = 0; 

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

const initBoard = function () {

  gameBoard.innerHTML = '';

  imageNames.forEach((image)=>{
    
    const fragment = document.createDocumentFragment();

    const flipContainer = document.createElement('div');
    flipContainer.classList.add('flip-container')
    flipContainer.id = image;

    const flipper = document.createElement('div');
    flipper.classList.add('flipper');

    const front = document.createElement('div'); 
    front.classList.add('front'); 
    
    const frontImage = document.createElement('img'); 
    frontImage.classList.add('card');
    frontImage.src = 'img/empty.png'; 
    frontImage.alt = 'Back';

    front.appendChild(frontImage);

    const back = document.createElement('div'); 
    back.classList.add('back');

    const backImage = document.createElement('img'); 
    backImage.classList.add('card');
    backImage.src = `img/${image}`; 
    backImage.alt = 'Image';
    
    back.appendChild(backImage);
    flipper.appendChild(front);
    flipper.appendChild(back);
    flipContainer.appendChild(flipper);
    fragment.appendChild(flipContainer);

    gameBoard.appendChild(fragment);
  });

}

const spreadCards = function () {
  
  const backImages = gameBoard.querySelectorAll('.back > img');

  imageNames.sort(cardsShuffler);

  backImages.forEach((image,i) => {
    image.src = `img/${imageNames[i]}`;
    image.parentNode.parentNode.parentNode.id = imageNames[i];
  });
};

const getOpenedCards = function() {
  return gameBoard.querySelectorAll('.opened:not(.guessed)');
}

const getGuessedCards = function() {
  return gameBoard.querySelectorAll('.guessed');
}

const showInfo = (text) => {
  infoDiv.innerHTML = text;
}

const cardClickListener = function(e) { 

  if (getOpenedCards().length == 16) return;
  const flipper = e.target.parentNode.parentNode.parentNode;
  controlDiv.classList.add('hide');
  
  if (!e.target.matches('.card')
      || flipper.matches('.guessed')) {
    return;
  } 
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

const startButtonListener = function() {
  
  controlDiv.classList.add('hide');
  numberOfFails = 0;
  
  if (document.querySelector('.preview-option').checked) {
    spreadCards();
    if (getOpenedCards().length == 0) {
      openAllCards();
    };
    showInfo('Remember cards! Time left: 10');
    for (let i=10; i>=1; i--) {
      setTimeout(()=>{
        showInfo(`Remember cards! Time left: ${(10-i)}`);
      },i*1000);
    };
    setTimeout(()=>{
      closeAllCards();
      showInfo(`And now try to guess!`);
    },10000);
  } else {
    showInfo(`Try to guess!`);
    if (getOpenedCards().length == 16) {
      closeAllCards();
      setTimeout(()=>{
        spreadCards();
      },100*imageNames.length);  
    } else {
      spreadCards();
    };
  };
};

document.addEventListener('DOMContentLoaded', ()=>{  

  showInfo('Welcome to Memory Pairs Game');

  initBoard();
  
  gameBoard.addEventListener('click',cardClickListener);
  document.querySelector('.start-btn').addEventListener('click', startButtonListener);
});

