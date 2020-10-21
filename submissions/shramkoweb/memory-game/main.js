const HIDE_TIMEOUT = 500;
const RESET_TIMEOUT = 700;
const SHOW_ALL_CARDS_TIMEOUT = 1000;
const CARDS_COUNT_PER_FLIP = 2;

const contentElement = document.querySelector('.content');
const cellElements = contentElement.querySelectorAll('.cell');
const resultElement = document.querySelector('.result');

const state = {
    isBoardBlocked: false,
    firstCard: null,
    secondCard: null,
    cardsLeft: cellElements.length,
};

const resetBoardState = () => {
    state.secondCard = null;
    state.firstCard = null;
    state.isBoardBlocked = false;
}

const hideAllCards = () => {
    state.isBoardBlocked = false;
    cellElements.forEach(card => {
        card.classList.remove('opened');
    })
};

const getFlexOrder = (cardsCount) => String(Math.floor(Math.random() * cardsCount));

const temporaryShowAllCards = () => {
    state.isBoardBlocked = true;
    cellElements.forEach(card => {
        card.classList.add('opened');
    })

    setTimeout(hideAllCards, SHOW_ALL_CARDS_TIMEOUT);
};

const flipCard = (card) => {
    const isClickOnEqualCard = card === state.firstCard;

    if (
        state.isBoardBlocked ||
        isClickOnEqualCard
    ) {
        return;
    }
    card.classList.add('flip', 'opened');

    if (!state.firstCard) {
        state.firstCard = card;
    } else {
        state.secondCard = card;
        checkIsCardsMatch();
    }
};

const hideMatchCards = () => {
    setTimeout(() => {
        state.firstCard.classList.add('closed');
        state.secondCard.classList.add('closed');
        state.cardsLeft -= CARDS_COUNT_PER_FLIP;
        if (state.cardsLeft <= 0) {
            resultElement.textContent = 'You win!'
        }
        resetBoardState();
    }, HIDE_TIMEOUT);
};

const blockBoard = () => {
    state.isBoardBlocked = true;

    setTimeout(() => {
        state.firstCard.classList.remove('opened', 'flip');
        state.secondCard.classList.remove('opened', 'flip');

        resetBoardState();
    }, RESET_TIMEOUT);
}

const checkIsCardsMatch = () => {
    if (state.firstCard.innerText === state.secondCard.innerText) {
        return hideMatchCards();
    }

    blockBoard();
}

contentElement.addEventListener('click', function ({ target }) {
    // get parent if click on cell__symbol
    const targetCell = target.closest('.cell');
    if (state.firstCard && state.secondCard) {
        return;
    }

    console.log(state)
    flipCard(targetCell);
});

const init = () => {
    cellElements.forEach(item => {
        item.style.order = getFlexOrder(state.cardsLeft);
    });

    temporaryShowAllCards();
};

window.requestAnimationFrame(init);
