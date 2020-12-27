const PAIR = 2;
const CARDS_AMOUNT = 20;
const TIMEOUT_1000 = 1000;
const TIMEOUT_1500 = 1500;
const WIN_CONFIRMATION = "Congratulations, you won!\nRestart the game";

let lockBoard = false;
let hasFlipped = false;
let firstCard, secondCard;
let openCards = 0;

function launchApp() {
    const gameBoard = document.querySelector(".memory-game");
    let cards = "";
    createImgArray().forEach(img => cards += createCard(img));
    gameBoard.innerHTML = cards;
    gameBoard.addEventListener("click", flipCard);
}

function createImgArray() {
    const imgArray = [];
    for (let i = 1; i < 11; i++) {
        imgArray.push("kitty-" + i);
    }
    imgArray.push(...imgArray);

    //shuffle an array with images
    return imgArray.map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

function createCard(image) {
    return `<div class="memory-card" data-image="${image}">
                <img class="front" src="./img/${image}.png"/>
                <img class="back" src="./img/back.png" />
            </div>`;
}

function flipCard(event) {
    const card = event.target.closest(".memory-card");
    if (lockBoard || card === firstCard) return;

    card.classList.toggle('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = card;
        return;
    }
    secondCard = card;

    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image
    if (isMatch) {
        disableCards();
        checkWin();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    openCards += PAIR;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, TIMEOUT_1000)
}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkWin() {
    if (openCards === CARDS_AMOUNT) {
        setTimeout(() => window.requestAnimationFrame(() => {
            if (confirm(WIN_CONFIRMATION)) {
                location.reload();
            }
        }), TIMEOUT_1500);
    }
}

//start the game
launchApp();
