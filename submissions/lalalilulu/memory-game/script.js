//start the game
(function launchApp() {
    const gameBoard = document.querySelector(".memory-game");
    const fragment = document.createElement("div");
    createImgArray().map(img => createCard(img)).forEach(card => fragment.appendChild(card));
    gameBoard.innerHTML = fragment.innerHTML;
})();

function createImgArray() {
    const imgArray = [];
    for (let i = 1; i < 11; i++) {
        imgArray.push("kitty-" + i);
    }
    imgArray.push(...imgArray);
    return imgArray;
}

function createCard(image) {
    const divCard = createElementWithClass("div", "memory-card");
    divCard.dataset.image = image;
    const imgFrontCard = createElementWithClass("img", "front");
    imgFrontCard.setAttribute("src", "img/" + image + ".png");
    const imgBackCard = createElementWithClass("img", "back");
    imgBackCard.setAttribute("src", "img/back.png");
    divCard.append(imgFrontCard, imgBackCard);
    divCard.style.order = Math.floor(Math.random() * 100);
    return divCard;
}

function createElementWithClass(tagName, cssClass) {
    const element = document.createElement(tagName);
    element.classList.add(cssClass);
    return element;
}

const cards = document.querySelectorAll(".memory-card");
cards.forEach(card => card.addEventListener("click", flipCard));

let lockBoard = false;
let hasFlipped = false;
let firstCard, secondCard;
let openCards = 0;

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlipped) {
        hasFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image
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
    openCards += 2;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000)
}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkWin() {
    console.log(openCards);
    if (openCards === 20) {
        setTimeout(() => window.requestAnimationFrame(() => {
            if (confirm('Congratulations, you won!\nRestart the game')) {
                location.reload();
            }
        }), 1500);
    }
}



