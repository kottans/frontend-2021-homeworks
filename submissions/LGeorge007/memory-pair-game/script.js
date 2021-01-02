const allCards = document.querySelectorAll(".flipper");
const arrOfCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
let unopenedCards = arrOfCards.length;
let firstCard;
let secondCard;
let clikCounter = 0;

const checkCard = function (event) {
    const checkMatch = function () {
        if (clikCounter == 0) {
            firstCard = event.path[1];
            clikCounter++;
        } else if (clikCounter == 1) {
            secondCard = event.path[1];
            //The same card must not be removed
            if (firstCard.style.order != secondCard.style.order) {
                if (firstCard.dataset.hero == secondCard.dataset.hero) {
                    firstCard.children[1].classList.add("hiddenSide");
                    secondCard.children[1].classList.add("hiddenSide");
                    firstCard.classList.add("hiddenFlipper");
                    secondCard.classList.add("hiddenFlipper");
                    unopenedCards -= 2;
                } else {
                    firstCard.classList.remove("rotateCard");
                    secondCard.classList.remove("rotateCard");
                };
                clikCounter--;
                if (unopenedCards == 0) {
                    setTimeout(() => {
                        alert("You win!");
                        window.location.reload();
                    }, 1500);
                };
            };
        };
    };
    event.path[1].classList.toggle("rotateCard");
    setTimeout(checkMatch, 600);
}

const shuffle = function (arr) {
    const result = [];
    const getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    while (arr.length > 0) {
        let random = getRandomInt(0, arr.length - 1);
        let elem = arr.splice(random, 1)[0];
        result.push(elem);
    }
    return result;
}

const setOrder = function (order) {
    for (let i = 0; i < allCards.length; i++) {
        allCards[i].style.order = order[i];
    }
}

const onStart = function () {
    setOrder(shuffle(arrOfCards));
    allCards.forEach(card => card.addEventListener('click', checkCard));
}

document.addEventListener("DOMContentLoaded", onStart);
