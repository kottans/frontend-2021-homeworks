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
    return array.reduce((res, current) => {
        return res.concat(Array(times).fill(current));
    }, []);
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

const checkWin = function () {
    if (unopenedCards === 0) {
        setTimeout(() => {
            alert("You win!");
            window.location.reload();
        }, 1500);
    };
};

const checkCard = function ({target}) {
    if (!target.closest(".flipper")) return;
    if (!isLocked) {
        if (isSecondCard) {
            isLocked = true;
            secondCard = target.closest(".flipper");
            secondCard.classList.toggle("rotateCard");
            if (firstCard.id !== secondCard.id) {
                if (firstCard.dataset.hero === secondCard.dataset.hero) {
                    unopenedCards -= 2;
                    setTimeout(() => {
                        firstCard.querySelector(".back").classList.add("hiddenSide");
                        secondCard.querySelector(".back").classList.add("hiddenSide");
                        firstCard.classList.add("hiddenFlipper");
                        secondCard.classList.add("hiddenFlipper");
                    }, 600);
                } else {
                    setTimeout(() => {
                        firstCard.classList.remove("rotateCard");
                        secondCard.classList.remove("rotateCard");
                    }, 600);
                };
            };
            setTimeout(() => {
                isLocked = false;
                isSecondCard = false;
            }, 1000);
            checkWin();
        } else {
            firstCard = target.closest(".flipper");
            firstCard.classList.toggle("rotateCard");
            isSecondCard = true;
        };
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
