const arrOfUnits = ["img/cartman.jpg",
    "img/chief.jpg",
    "img/sten.jpg",
    "img/kyle.jpg",
    "img/kenny.jpg"
];
const imgCover = `img/cover.jpg`;
const gameField = document.querySelector("#gameField");
let isLocked = false;
let firstCard;
let secondCard;
let isSecondCard = false;
let unopenedCards;

//feed him array & any even number
const duplicateElements = function(array, times) {
    return array.reduce((res, current) => {
        return res.concat(Array(times).fill(current));
    }, []);
};

const shuffle = function(arr) {
    const result = [];
    while (arr.length > 0) {
        let random = Math.floor(Math.random() * arr.length);
        let elem = arr.splice(random, 1)[0];
        result.push(elem);
    }
    return result;
};

const checkCard = function({ target }) {
    if (!isLocked) {
        if (isSecondCard) {
            isLocked = true;
            secondCard = target.closest("div");
            secondCard.classList.toggle("rotateCard");
            //The same card must not be removed
            if (firstCard.id !== secondCard.id) {
                if (firstCard.dataset.hero === secondCard.dataset.hero) {
                    unopenedCards -= 2;
                    setTimeout(() => {
                        firstCard.children[1].classList.add("hiddenSide");
                        secondCard.children[1].classList.add("hiddenSide");
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
            if (unopenedCards === 0) {
                setTimeout(() => {
                    alert("You win!");
                    window.location.reload();
                }, 1500);
            };
        } else {
            firstCard = target.closest("div");
            firstCard.classList.toggle("rotateCard");
            isSecondCard = true;
        };
    };
};

const renderCard = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement("div");
        card.setAttribute("id", i);
        card.classList.add("flipper");
        card.setAttribute("data-hero", arr[i].slice(4, -4));
        card.setAttribute("draggable", false);
        card.addEventListener("mousedown", checkCard);

        let frontSide = document.createElement("img");
        frontSide.setAttribute("src", imgCover);
        frontSide.setAttribute("draggable", false);
        frontSide.classList.add("front");

        let backSide = document.createElement("img");
        backSide.setAttribute("src", arr[i]);
        backSide.setAttribute("draggable", false);
        backSide.classList.add("back");

        card.appendChild(frontSide);
        card.appendChild(backSide);
        gameField.appendChild(card);
    };
};

const init = function() {
    arrOfUnits = shuffle(duplicateElements(arrOfUnits, 4));
    unopenedCards = arrOfUnits.length;
    renderCard(arrOfUnits);
}

document.addEventListener("DOMContentLoaded", init);