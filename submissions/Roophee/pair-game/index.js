"use strict";

const heroesArray = ['luke', 'vader', 'solo', 'ob1', 'palpatine', 'leia', 'r2d2-c3po', 'chewbacca', 'bad1', 'bad2', 'bad3', 'bad4', 'good1', 'good3', 'good4', 'robot1', 'yoda'];
const indexInUse = [];
const imagesCountForTwo = {};
const prePair = [];
const pairs = [];
const gameBg = document.querySelector('.game');
const cardPlace = document.querySelector('.game__card-place');
const audioItem = document.querySelector('audio');
const audioButton = document.querySelector('.audio__button');
const bodyElem = document.querySelector('body');
const quantityOfUniqueCards = 17;
const quantityOfCardsOnTheScreen = 12;
const maxQuantityOfPairsOnTheScreen = 6;


// TAKE RANDOM CARDS FROM POOL OF CARDS
const cardsForPlay = function () {
    while (true) {
        let randomIndex = Math.floor(Math.random() * quantityOfUniqueCards);
        if (indexInUse.length === maxQuantityOfPairsOnTheScreen) {
            break
        } else if (indexInUse.indexOf(randomIndex) < 0) {
            indexInUse.push(randomIndex);
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

// TAKE RANDOM IMAGE FROM POOL OF IMAGES FOR THIS GAME
const getRandomImage = function () {
    while (true) {
        let randomIndex = Math.floor(Math.random() * maxQuantityOfPairsOnTheScreen);
        if (imageCounter(randomIndex) >= -1) {
            return randomIndex;
        }
    }
}

//MAKE ANIMATION ON PAGE DOWNLOAD
const animateOnStart = function(){
    gameBg.style.top = `${-gameBg.clientHeight - gameBg.offsetTop}px`;
    cardPlace.style.bottom = `${-document.documentElement.clientHeight * 2}px`;
    setTimeout(function (){
        gameBg.style.top = '0px';
        cardPlace.style.bottom = '0px';
    },500)
}

document.addEventListener('DOMContentLoaded', animateOnStart);

//CALCULATE CARD SIZE FROM BODY SIZE AND RETURN HANDLER
const calculateCardSize = () => {
    let size;

    if (bodyElem.offsetWidth >= bodyElem.offsetHeight) {
        const sizeFromOffsetHeight = bodyElem.offsetHeight*0.2673;
            size = [sizeFromOffsetHeight*0.715, sizeFromOffsetHeight];
    } else {
        const sizeFromOffsetWidth = bodyElem.offsetWidth*0.2025;
        size = [sizeFromOffsetWidth, sizeFromOffsetWidth*1.4];
    }

    const setImgWidthHeight = function(item) {
        item.style.width = size[0]+'px';
        item.style.height = size[1]+'px';
    }
    return setImgWidthHeight;
}

// ADD CARDS ON DOCUMENT
const addCardsOnPage = function () {
    const cardsContainerOnDynamicGeneration = document.createDocumentFragment();
    const cardSizeHandler = calculateCardSize();
    for (let i = 0; i < quantityOfCardsOnTheScreen; i++) {
        const cardNameInsertOnDynamicGeneration = heroesArray[indexInUse[getRandomImage()]],
            cardItem = document.createElement('div');
        cardItem.classList.add('game__card-holder');
        cardItem.innerHTML = `<div class="game__card-item">
                            <div class="game__card-front">
                                <img src="img/${cardNameInsertOnDynamicGeneration}.jpg" alt="${cardNameInsertOnDynamicGeneration}"  class="game__card-img">
                            </div>
                            <div class="game__card-back">
                                <img src="img/cardback.jpg" alt="cardback" class="game__card-cardback">
                            </div>
                        </div>`;
        cardsContainerOnDynamicGeneration.appendChild(cardItem);
    }
    [].forEach.call(cardsContainerOnDynamicGeneration.querySelectorAll('.game__card-holder'), cardSizeHandler);
    [].forEach.call(cardsContainerOnDynamicGeneration.querySelectorAll('.game__card-img'), cardSizeHandler);
    [].forEach.call(cardsContainerOnDynamicGeneration.querySelectorAll('.game__card-cardback'), cardSizeHandler);
    cardPlace.appendChild(cardsContainerOnDynamicGeneration);
}

addCardsOnPage();

//  CLEAR ARRAYS AND OBJECTS, PICK NEW CARDS FOR THE GAME
const clearAllOperationObjectsAndCreateNewGame = function() {
    if (pairs.length === maxQuantityOfPairsOnTheScreen) {
        const playAgain = window.confirm('Congratulations. You have matched all pairs and won the game. Want to play again?');
                if (playAgain) {
                    cardPlace.innerHTML = "";
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
}

// CHECK PLAYER COLLECTED ALL PAIRS OR NOT
const checkGameIsOverOrNot = function () {
    setTimeout(function () {
            clearAllOperationObjectsAndCreateNewGame();
    }, 2100)
}

// ADD HIDE CLASS ON CARD-HOLDER ITEM IF TWO CARD ARE PAIR
let hidePair = function(){
    if (prePair[0] && prePair[1]){
    prePair[0][1].classList.add('hide');
    prePair[1][1].classList.add('hide');
    prePair.splice(0, 2);
    }
}

// REMOVE ACTIVE CLASS FROM CARD-HOLDER ITEM IF TWO CARD ARE NOT A PAIR
let clearPair = function() {
    prePair[0][1].classList.remove('active');
    prePair[1][1].classList.remove('active');
    prePair.splice(0, 2);
}

// CHECK IS TWO CARDS A PAIR OR NOT
let checkPairOrNot = function () {
    if (prePair.length === 2 && prePair[0][0] === prePair[1][0]) {
        pairs.push('1');
        setTimeout(function () {
            hidePair();
        }, 500);
        checkGameIsOverOrNot();

    } else if (prePair.length === 2 && prePair[0][0] !== prePair[1][0]) {
        setTimeout(function () {
            clearPair();
        }, 800);
}}

// GET PICTURE NAME FROM ALT AND PARENT ELEMENT
let createCardInfoAndAddItInCheckPlace = (cardBack, cardHolderElement) => {
    let cardName = cardBack.closest('.game__card-holder').querySelector('.game__card-img').alt;
    prePair.push([cardName, cardHolderElement]);
}

//  CLICK ON CARD EVENT
cardPlace.addEventListener('click', function (e) {
    let cardBack = e.target;
    if (cardBack.classList.contains('game__card-cardback')) {
        let cardHolderElement = cardBack.closest('.game__card-holder');
        if (prePair.length < 2) {
            cardHolderElement.classList.add('active');
            createCardInfoAndAddItInCheckPlace(cardBack,cardHolderElement);
        checkPairOrNot();
        }
    }
})

// MUTE AUDIO
audioButton.addEventListener('click', function (e) {
        audioItem.volume = 0.4;
        if (!audioItem.paused) {
            e.target.classList.remove('pause');
            audioItem.pause();
        } else {
            e.target.classList.add('pause');
            audioItem.play();
        }
})
