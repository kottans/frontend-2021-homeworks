"use strict";

const heroesArray = [
    {alt:'luke',
    src:'img/luke.jpg'},
    {alt:'vader',
    src:'img/vader.jpg'},
    {alt:'solo',
    src:'img/solo.jpg'},
    {alt:'ob1',
    src:'img/ob1.jpg'},
    {alt:'palpatine',
    src:'img/palpatine.jpg'},
    {alt:'leia',
    src:'img/leia.jpg'},
    {alt:'r2d2-c3po',
    src:'img/r2d2-c3po.jpg'},
    {alt:'chewbacca',
    src:'img/chewbacca.jpg'},
    {alt:'bad1',
    src:'img/bad1.jpg'},
    {alt:'bad2',
    src:'img/bad2.jpg'},
    {alt:'bad3',
    src:'img/bad3.jpg'},
    {alt:'bad4',
    src:'img/bad4.jpg'},
    {alt:'good1',
    src:'img/good1.jpg'},
    {alt:'good3',
    src:'img/good3.jpg'},
    {alt:'good4',
    src:'img/good4.jpg'},
    {alt:'robot1',
    src:'img/robot1.jpg'},
    {alt:'yoda',
    src:'img/yoda.jpg'}];
const prePair = [];
const pairs = [];
const gameBg = document.querySelector('.game');
const cardPlace = document.querySelector('.game__card-place');
const audioItem = document.querySelector('audio');
const audioButton = document.querySelector('.audio__button');
const bodyElem = document.querySelector('body');
const maxQuantityOfPairsOnTheScreen = 6;

// SHUFFLE CARDS IN CARDS_FOR_PLAY_ARRAY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// TAKE RANDOM CARDS FROM POOL OF CARDS
const cardsForPlay = function (heroesArray) {
    const heroesArrCopy = heroesArray.slice();
    let heroesInUse = [];
    let k = 0;
    while(k < 7) {
        let randomIndex = Math.floor(Math.random() * heroesArrCopy.length);
        if (heroesInUse.length === maxQuantityOfPairsOnTheScreen) {
            heroesInUse=[...heroesInUse,...heroesInUse];
            shuffleArray(heroesInUse);
            return heroesInUse;
        } else if (heroesInUse.length < maxQuantityOfPairsOnTheScreen) {
            heroesInUse.push(heroesArrCopy[randomIndex]);
            heroesArrCopy.splice(randomIndex,1);
            k++
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
    const heroesCardForPlay = cardsForPlay(heroesArray);
    const cardsContainerOnDynamicGeneration = document.createDocumentFragment();
    const cardSizeHandler = calculateCardSize();
    for (let i = 0; i < heroesCardForPlay.length; i++) {
            const cardItem = document.createElement('div');
            cardItem.classList.add('game__card-holder');
            cardItem.innerHTML = `<div class="game__card-item">
                                <div class="game__card-front">
                                    <img src="${heroesCardForPlay[i].src}" alt="${heroesCardForPlay[i].alt}"  class="game__card-img">
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

//  CLEAR OPERATION OBJECTS, PICK NEW CARDS FOR THE GAME
const clearAllOperationObjectsAndCreateNewGame = function() {
    const playAgain = window.confirm('Congratulations. You have matched all pairs and won the game. Want to play again?');
        if (playAgain) {
            cardPlace.innerHTML = "";
            prePair.length = 0;
            pairs.length = 0;
            addCardsOnPage();
        }
}

// CHECK PLAYER COLLECTED ALL PAIRS OR NOT
const checkGameIsOverOrNot = function () {
    if (pairs.length === maxQuantityOfPairsOnTheScreen){
        setTimeout(function () {
                clearAllOperationObjectsAndCreateNewGame();
        }, 2100)
    }
}

// ADD HIDE CLASS ON CARD-HOLDER ITEM IF TWO CARD ARE PAIR
let hidePair = function(currentPair){
    if (currentPair[0] && currentPair[1]){
        currentPair[0][1].classList.add('hide');
        currentPair[1][1].classList.add('hide');
        currentPair.splice(0, 2);
    }
}

// REMOVE ACTIVE CLASS FROM CARD-HOLDER ITEM IF TWO CARD ARE NOT A PAIR
let clearPair = function(currentPair) {
    currentPair[0][1].classList.remove('active');
    currentPair[1][1].classList.remove('active');
    currentPair.splice(0, 2);
}

// CHECK IS TWO CARDS A PAIR OR NOT
let checkPairOrNot = function () {
    if (prePair.length === 2){
        let currentPair = prePair.slice();
        prePair.splice(0, 2);
        if (currentPair[0][0] === currentPair[1][0]) {
            pairs.push('1');
            setTimeout(function (currentPair) {
                hidePair(currentPair);
            }, 500, currentPair);
            checkGameIsOverOrNot();

        } else if ( currentPair[0][0] !== currentPair[1][0]) {
            setTimeout(function (currentPair) {
                clearPair(currentPair);
            }, 800, currentPair);
        }
    }
}

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
            checkPairOrNot()
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
