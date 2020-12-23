"use strict";

const heousArray = ['luke', 'vader', 'solo', 'ob1', 'palpatine', 'leia', 'r2d2-c3po', 'chewbacca', 'bad1', 'bad2', 'bad3', 'bad4', 'good1', 'good3', 'good4', 'robot1', 'yoda'],
    indexInUse = [],
    imagesCountForTwo = {},
    prePair = [],
    pairs = [],
    gameBg = document.querySelector('.game'),
    cardPlace = document.querySelector('.game__card-place'),
    audioItem = document.querySelector("audio")

// TAKE RANDOM CARDS FROM POOL OF CARDS

const cardsForPlay = function () {
    while (true) {
        let randomIndex = Math.floor(Math.random() * 17);
        if (indexInUse.length === 6) {
            break
        } else {
            if (indexInUse.indexOf(randomIndex) < 0) {
                indexInUse.push(randomIndex);
            }
        }
    }
}

cardsForPlay();

//COUNT HOW MANY SAME IMAGES ADD IN GAME

const imageCounter = function (indx) {
    if (imagesCountForTwo.hasOwnProperty(indx) && imagesCountForTwo[indx] >= 2) {
        return -2;
    } else if (imagesCountForTwo.hasOwnProperty(indx) && imagesCountForTwo[indx] < 2) {
        imagesCountForTwo[indx] += 1;
        return indx;
    } else if (!imageCounter.hasOwnProperty(indx)) {
        imagesCountForTwo[indx] = 1;
        return indx;
    }
}

// TAKE RANDOM IMAGE FROM POR OF IMAGES FOR THIS GAME

const getRandomImage = function () {
    while (true) {
        let randomIndex = Math.floor(Math.random() * 6);
        if (imageCounter(randomIndex) >= -1) {
            return randomIndex;
        }
    }
}

//MAKE ANIMATION ON PAGE DOWNLOAD

gameBg.style.top = `${-gameBg.clientHeight - gameBg.offsetTop}px`;
document.addEventListener('DOMContentLoaded', function (e) {
    setTimeout(function () {
        gameBg.style.top = '0px';
    }, 500)
})

cardPlace.style.bottom = `${-document.documentElement.clientHeight * 2}px`;
document.addEventListener('DOMContentLoaded', function (e) {
    setTimeout(function () {
        cardPlace.style.bottom = '0px';
    }, 500)
})

// ADD CARDS ON DOCUMENT

let addCardsOnPage = function () {
    for (let i = 0; i < 12; i++) {
        let cardItem = document.createElement('div');
        cardItem.classList.add('game__card-holder');
        cardItem.value = i
        cardItem.innerHTML = `<div class="game__card" >
                                <div class=" cards__front">
                                    <img src="img/${heousArray[indexInUse[getRandomImage()]]}.jpg" alt="" value="${i}" class="card__front">
                                </div>
                                <div class="cards__back">
                                    <img src="img/cardback.jpg" alt="cardback" class="card__back">
                                </div>
                            </div>`;
        cardPlace.appendChild(cardItem);
    }
}

addCardsOnPage();

// CHEK PLAYER COLLECTED ALL PAIRS OR NOT

const gameIsOver = function () {
    setTimeout(function () {
        if (pairs.length === 6) {
            let playAgain = window.confirm("Congratulations. You have matched all pairs and won the game. Want to play again?");
            if (playAgain) {
                document.querySelector('.game__card-place').innerHTML="";
                for (const prop of Object.keys(imagesCountForTwo)) {
                    delete imagesCountForTwo[prop];
                };
                indexInUse.length = 0;
                prePair.length = 0;
                pairs.length = 0;
                cardsForPlay();
                addCardsOnPage();
            }
        }
    }, 2000)
}

// CHECK IS TWO CARDS PAIR OR NOT
let pairOrNot = function () {
    if (prePair.length === 2 && prePair[0][0] == prePair[1][0] && prePair[0][2] !== prePair[1][2]) {
        pairs.push('1');
        setTimeout(function () {
            prePair[0][1].classList.add('hide');
            prePair[1][1].classList.add('hide');
            prePair.splice(0, 2);
        }, 800);
        gameIsOver();

    } else if (prePair.length === 2 && prePair[0][0] == prePair[1][0] && prePair[0][2] == prePair[1][2]) {
        setTimeout(function () {
            prePair[0][1].classList.remove('active');
            prePair[1][1].classList.remove('active');
            prePair.splice(0, 2);
        }, 800);

    } else if (prePair.length === 2 && prePair[0][0] !== prePair[1][0]) {
        setTimeout(function () {
            prePair[0][1].classList.remove('active');
            prePair[1][1].classList.remove('active');
            prePair.splice(0, 2);
        }, 800);

    } else if (prePair.length < 2) {
    }
}

//  CLICK ON CARD EVENT

document.addEventListener('click', function (e) {
    if (e.target.parentElement.parentElement.className === "game__card") {
        let parent = e.target.parentElement.parentElement.parentElement;
        if(prePair.length<2) {
        parent.classList.add("active");
        let cardNameHolder = e.target.parentElement.parentElement.parentElement.querySelector(".card__front").src.split("/");
        let cardName = cardNameHolder[cardNameHolder.length - 1].split(".")[0];
        prePair.push([cardName, parent, parent.value]);
        pairOrNot();
        }
    }
})


// MUTE AUDIO

document.addEventListener('click', function(e) {
    if(e.target.classList.contains("audio__play")) {
        audioItem.volume = 0.4;
        if(!audioItem.paused){
            e.target.classList.remove('audio__pause');
            audioItem.pause();
        } else {
            e.target.classList.add('audio__pause');
            audioItem.play();
        }
    }
})
