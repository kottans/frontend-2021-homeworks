let initialArray = ["img/cartman.jpg",
    "img/chief.jpg",
    "img/sten.jpg",
    "img/kyle.jpg",
    "img/kenny.jpg"
];
let arrOfUnits = [];
const imgCover = "img/cover.jpg";
const gameField = document.querySelector("#gameField");
let isLocked = false;
let firstCard;
let secondCard;
let isSecondCard = false;
let unopenedCards = 0;

const duplicateElements = function (array, times) {
    const duplicatedArray = [];
    array.forEach( el => {
        for (let i=0; i<times; i++) duplicatedArray.push(el);
    });
    return duplicatedArray;
};

const shuffle = function (arr) {
    const result = [];
    while (arr.length > 0) {
        let random = Math.floor(Math.random() * arr.length);
        let elem = arr.splice(random, 1)[0];
        result.push(elem);
    }
    return result;
};

const turnOverBackTwoCards = function() {
    setTimeout(() => {
        firstCard.classList.remove("rotateCard");
        secondCard.classList.remove("rotateCard");
    }, 600);
};

const hideTwoCards = function() {
    unopenedCards -= 2;
    setTimeout(() => {
        firstCard.querySelector(".back").classList.add("hiddenSide");
        secondCard.querySelector(".back").classList.add("hiddenSide");
        firstCard.classList.add("hiddenFlipper");
        secondCard.classList.add("hiddenFlipper");
    }, 600);
};

const unlockChoice = function() {
    setTimeout(() => {
        isLocked = false;
        isSecondCard = false;
    }, 1000);
};

const turnCard = function({target}) {
    let card = target.closest(".flipper");
    card.classList.toggle("rotateCard");
    return card;
};

const checkWin = function () {
    if (unopenedCards === 0) {
        setTimeout(() => {
            alert("You win!");
            window.location.reload();
        }, 1500);
    };
};

const checkCard = function ({target}) {
    if (!target.closest(".flipper") || isLocked) return;
        if (isSecondCard) {
            isLocked = true;
            secondCard = turnCard({target});
            if (firstCard.id !== secondCard.id) firstCard.dataset.hero === secondCard.dataset.hero ? hideTwoCards() : turnOverBackTwoCards();
            unlockChoice();
            checkWin();
        } else {
            firstCard = turnCard({target});
            isSecondCard = true;
        };
};

const renderCards = function (arr) {
    let htmlFragment = "";
    arr.forEach((el, i) => {
        htmlFragment += `<div id=${i} class="flipper" data-hero=${el.slice(el.lastIndexOf("/") + 1, el.lastIndexOf("."))}>
                                <img src=${imgCover} class="front">
                                <img src=${el} class="back">
                         </div>`;
    });
    gameField.innerHTML = htmlFragment;
};

const init = function () {
    arrOfUnits = shuffle(duplicateElements(initialArray, 4));
    unopenedCards = arrOfUnits.length;
    renderCards(arrOfUnits);
    gameField.addEventListener("click", checkCard);
}

document.addEventListener("DOMContentLoaded", init);
