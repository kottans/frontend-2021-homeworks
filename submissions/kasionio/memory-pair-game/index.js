const cards = [
    {
    id: 1,
    src: 'img/1.jpg',
    alt: 'dog_1'
    },
    {
    id: 2,
    src: 'img/2.jpg',
    alt: 'dog_2'
    },
    {
    id: 3,
    src: 'img/3.jpg',
    alt: 'dog_3'
    },
    {
    id: 4,
    src: 'img/4.jpg',
    alt: 'dog_4'
    },
    {
    id: 5,
    src: 'img/5.jpg',
    alt: 'dog_5'
    },
    {
    id: 6,
    src: 'img/6.jpg',
    alt: 'cat'
    }
];

const allCards = [...cards, ...cards];
allCards.sort(() => { return 0.5 - Math.random() });
const cardsWrapper = document.getElementById('cards-wrapper');

const cardsContainer = document.createDocumentFragment();
allCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flip-card';
    cardDiv.innerHTML = `
        <div class='flip-card-inner'>
            <div class='flip-card-front'>
                <img src='img/front.jpg' id='${card.id}' class='images' alt='${card.alt}' />
            </div>
            <div class='flip-card-back' id='flip-card-back'>
                <img src='${card.src}' class='images' />
            </div>
        </div>
    `;
    cardsContainer.appendChild(cardDiv);
});

cardsWrapper.append(cardsContainer);

const DELAY_TIME = 800;
let numberOfMatches = 0;
let numberOfAttempts = 0;
let cardPairsArray = [];
let currentTarget; 

cardsWrapper.addEventListener('click', function checkCard({target}) {
    const clickedCard = target.closest('.flip-card');
    if (clickedCard !== null) {
        if(!isCardFlipped(clickedCard)) {
            cardPairsArray.push(target.id);
        }
        flip(clickedCard); 

        if (cardPairsArray[0] !== cardPairsArray[1] && cardPairsArray.length === 2) {
            pauseEventListener(cardsWrapper, checkCard, DELAY_TIME);
            setTimeout(() => {
                document.querySelectorAll('.flip-card_flipped').forEach(card => card.closest('.flip-card').classList.remove('flip-card_flipped'));
            }, DELAY_TIME);
            numberOfAttempts++;
            cleanArr(cardPairsArray);    
        }

        else if (cardPairsArray[0] === cardPairsArray[1] && cardPairsArray.length === 2) { 
            pauseEventListener(cardsWrapper, checkCard, DELAY_TIME);
            document.querySelectorAll(`[id='${cardPairsArray[0]}']`).forEach(card => card.closest('.flip-card').classList.add('hide'));
            numberOfMatches++;
            numberOfAttempts++;
            cleanArr(cardPairsArray);
        }

        if (numberOfMatches === cards.length){
            setTimeout(() => {
                alert(`Good job! You did it in ${numberOfAttempts} attempts.`); 
                reloadGame();
                }, DELAY_TIME);                  
        }

        document.getElementById('attempts').textContent = numberOfAttempts;
    }
});

function reloadGame() {
    document.location.reload();
}

function flip(card) {
    card.classList.add('flip-card_flipped');
    card.style.transitionDuration = '0.5s';
}

function cleanArr(arr) {
    arr.length = 0;
}

function pauseEventListener(target, func, time) {
    target.removeEventListener('click', func);
    setTimeout(() => {
        target.addEventListener('click', func);
    }, time); 
}

function isCardFlipped(card) {
    return card.classList.contains('flip-card_flipped');
}
