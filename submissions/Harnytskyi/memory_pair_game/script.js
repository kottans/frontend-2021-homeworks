const CITIES = ["Kyiv", "Kharkiv", "Lviv", "Odesa", "Dnipro", "Poltava", "Zhytomyr", "Khmelnytskyi", "Luhansk", "Rivne", "Cherkasy", "Mykolaiv", "Simferopol", "Zaporizhzhia"];
const GRID = document.getElementById("allCards");
const quantityCardPairs = 8;
const DELAY = 800;
let matchedCards = 0;
let firstCard;

function chooseCardsRandomly(cards) {
    let randomCards = cards.sort(() => 0.5 - Math.random());
    randomCards = randomCards.slice(0, quantityCardPairs)
    randomCards = randomCards.concat(randomCards);
    randomCards = randomCards.sort(() => 0.5 - Math.random())
    return randomCards;
}

function displayCards() {
    GRID.innerHTML = "";
    let CHOSEN_CARDS = chooseCardsRandomly(CITIES);
    CHOSEN_CARDS.forEach(item => {
        GRID.innerHTML +=   `<div class="card" data-label="${item}">
                                <div class="card-flipper">
                                    <div class="card-front"></div>
                                    <div class="card-back">  
                                        <img src="svg/${item}.svg" class="cardImg">
                                    </div>
                                </div>
                            </div>`;
    });
}

function hideCards(card1, card2) {
    setTimeout(() => {
        card1.classList.add('hidden');
        card2.classList.add('hidden');
    }, DELAY);
}
function backFlipCards(card1, card2) {
    setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }, DELAY);
}
function checkCouple({ target }) {
    const TARGET_CARD = target.closest('.card');
    if (TARGET_CARD && !TARGET_CARD.classList.contains('flipped')) {
        TARGET_CARD.classList.add('flipped');
        if (!firstCard)
            firstCard = TARGET_CARD;
        else if (firstCard.dataset.label === TARGET_CARD.dataset.label) {
            hideCards(firstCard, TARGET_CARD);
            firstCard = null;
            matchedCards++;
            checkFinishGame();
        }
        else {
            backFlipCards(firstCard, TARGET_CARD);
            firstCard = null;
        }
    }
}
function checkFinishGame() {
    if (matchedCards == quantityCardPairs) {
        setTimeout(() => {
            alert('Finish!');
            matchedCards = 0;
            displayCards();
        }, DELAY + 10);
    }
}

displayCards();
GRID.addEventListener('click', checkCouple);
