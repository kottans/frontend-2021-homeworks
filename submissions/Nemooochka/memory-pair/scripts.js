const cards = [
    {
        id: 0,
        image: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg'
    },
    {
        id: 1,
        image: 'https://m.media-amazon.com/images/M/MV5BMTE0YWFmOTMtYTU2ZS00ZTIxLWE3OTEtYTNiYzBkZjViZThiXkEyXkFqcGdeQXVyODMzMzQ4OTI@._V1_UX182_CR0,0,182,268_AL_.jpg'
    },
    {
        id: 2,
        image: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg'
    },
    {
        id: 3,
        image: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg'
    },
    {
        id: 4,
        image: 'https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
    }
];

const cardsWrapBlock = document.querySelector('.member-pairs');
const pairArray = cards.concat(cards);
const oneMoreGame = `<div class="congratulations">
                        <p>Wow! You are really good at it. Congratulations! :)</p>
                        <button class="btn btn-new_game">One more time?</button>
                     </div>`;
const timerActiveTime = 500;
const timerResetTime = 3000;
let showedCard = 0;
let timerMouseOver;
let timerReset;
let prevCard;
let prevCardId;
let prevCardIndex;
let currentCard;
let currentCardId;
let currentCardIndex;
let foundPairs = 0;

function Shuffle(o) {
    for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
    return o;
}

function generateCard({id, image}) {
    return `<div class="flipper" data-pair="${id}" >
                <div class="front"></div>
                <div class="back">
                    <img src="${image}" alt="">
                </div>
            </div>`;
}

function renderCards(arrayCards) {
    const cards = document.createDocumentFragment();
    cardsWrapBlock.innerHTML = '';

    arrayCards.map((elem) => {
        const card = document.createElement('div');
        card.classList.add('flip-container');
        card.innerHTML = generateCard(elem);
        cards.appendChild(card);
    });

    cardsWrapBlock.appendChild(cards);
}

function cardActive({target}) {
    // setTimeout for Call Stack, execute after all previous code is done
    setTimeout(function () {
        if (target.classList.contains("front")) {
            // clear timer for resetting all hovered cards when user move to new card
            clearTimeout(timerReset);

            // show hovering of card smoothly
            timerMouseOver = setTimeout(function () {
                showedCard++;

                // when 2 cards are shown and you move to the third, hide previous two
                if (showedCard > 2) {
                    showedCard = 1;
                    prevCard = prevCardId = undefined;
                    resetActiveCards();
                }

                currentCard = target.closest('.flipper');
                currentCard.classList.add('active');
                currentCardId = currentCard.getAttribute('data-pair');
                currentCardIndex = currentCard.getAttribute('data-card');

                if (currentCardId === prevCardId) {
                    foundPairs++;
                    // hide pairs smoothly
                    setTimeout(function () {
                        currentCard.closest('.flip-container').classList.add('opacity-zero');
                        prevCard.closest('.flip-container').classList.add('opacity-zero');
                    }, timerActiveTime);

                    // when all pair are founded
                    if (foundPairs === cards.length) {
                        foundPairs = 0;
                        setTimeout(function () {
                            cardsWrapBlock.innerHTML = oneMoreGame;
                            const newGameBtn = cardsWrapBlock.querySelector('.btn-new_game');
                            newGameBtn.addEventListener("click", () => {
                                renderCards(Shuffle(pairArray));
                            });
                        }, timerActiveTime);
                    }
                } else {
                    prevCard = currentCard;
                    prevCardId = currentCardId;
                    prevCardIndex = currentCardIndex;
                }
            }, timerActiveTime);

            // reset hovered cards after 3 seconds if user doesn't move to another card.
            timerReset = setTimeout(function () {
                showedCard = 0;
                prevCard = prevCardId = prevCardIndex = currentCard = currentCardId = currentCardIndex = undefined;
                resetActiveCards();
            }, timerResetTime);
        }
    }, 0);
}

function resetActiveCards() {
    const activeCards = cardsWrapBlock.querySelectorAll('.active');
    activeCards.forEach(elem => elem.classList.remove('active'));
}

document.addEventListener("DOMContentLoaded", function () {

    renderCards(Shuffle(pairArray));

    cardsWrapBlock.addEventListener("mouseover", cardActive);
    cardsWrapBlock.addEventListener("mouseout", () => clearTimeout(timerMouseOver));
});
