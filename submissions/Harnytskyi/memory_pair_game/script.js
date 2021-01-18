const CARDS = ["Kyiv", "Kharkiv", "Lviv", "Odesa", "Dnipro", "Poltava", "Zhytomyr", "Khmelnytskyi", "Luhansk", "Rivne", "Cherkasy", "Mykolaiv", "Simferopol", "Zaporizhzhia"];
const GRID = document.getElementById("allCards");
const FINISH_MATCH_CARDS = 8;
const DELAY = 800;
let matchCards = 0;
let firstCard;

function choseCards(cardArray) {
    let randomCards = cardArray.sort(() => 0.5 - Math.random());
    randomCards = randomCards.slice(0, 8)
    randomCards = randomCards.concat(randomCards);
    randomCards = randomCards.sort(() => 0.5 - Math.random())
    return randomCards;
}

function displayCard() {
    const ALL_CARDS = document.createDocumentFragment();
    GRID.innerHTML = "";
    let CHOSEN_CARDS = choseCards(CARDS);
    CHOSEN_CARDS.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.label = item;
        const flipper = document.createElement('div');
        flipper.classList.add('card-flipper');
        const cardFront = document.createElement('div')
        cardFront.classList.add('card-front');
        flipper.append(cardFront);
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const cardImg = document.createElement('img');
        cardImg.src = `svg/${item}.svg`;
        cardImg.classList.add('cardImg');
        cardBack.append(cardImg);
        flipper.append(cardBack);
        card.append(flipper);
        ALL_CARDS.append(card);
    });
    GRID.append(ALL_CARDS);
}

function hideCard(card1, card2) {
    setTimeout(() => {
        card1.classList.add('hidden');
        card2.classList.add('hidden');
    }, DELAY);
}
function backFlipCard(card1, card2) {
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
        else if (firstCard.dataset.label == TARGET_CARD.dataset.label) {
            hideCard(firstCard, TARGET_CARD);
            firstCard = null;
            matchCards++;
            checkFinishGame();
        }
        else {
            backFlipCard(firstCard, TARGET_CARD);
            firstCard = null;
        }
    }
}
function checkFinishGame() {
    if (matchCards == FINISH_MATCH_CARDS) {
        setTimeout(() => {
            alert('Finish!');
            matchCards = 0;
            displayCard();
        }, DELAY + 10);
    }
}

displayCard();
GRID.addEventListener('click', checkCouple);
