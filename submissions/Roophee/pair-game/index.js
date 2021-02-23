"use strict";

const heroesArray = [
    {alt: 'luke',
    src: 'img/luke.jpg'},
    {alt: 'vader',
    src: 'img/vader.jpg'},
    {alt: 'solo',
    src: 'img/solo.jpg'},
    {alt: 'ob1',
    src: 'img/ob1.jpg'},
    {alt: 'palpatine',
    src: 'img/palpatine.jpg'},
    {alt: 'leia',
    src: 'img/leia.jpg'},
    {alt: 'r2d2-c3po',
    src: 'img/r2d2-c3po.jpg'},
    {alt: 'chewbacca',
    src: 'img/chewbacca.jpg'},
    {alt: 'bad1',
    src: 'img/bad1.jpg'},
    {alt: 'bad2',
    src: 'img/bad2.jpg'},
    {alt: 'bad3',
    src: 'img/bad3.jpg'},
    {alt: 'bad4',
    src: 'img/bad4.jpg'},
    {alt: 'good1',
    src: 'img/good1.jpg'},
    {alt: 'good3',
    src: 'img/good3.jpg'},
    {alt: 'good4',
    src:'img/good4.jpg'},
    {alt: 'robot1',
    src: 'img/robot1.jpg'},
    {alt: 'yoda',
    src: 'img/yoda.jpg'}];
const prePair = [];
const pairs = [];
const gameBg = document.querySelector('.game');
const cardPlace = document.querySelector('.game__card-place');
const audioItem = document.querySelector('audio');
const audioButton = document.querySelector('.audio__button');
const bodyElem = document.querySelector('body');
const maxQuantityOfPairsOnTheScreen = 6;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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

const animateOnStart = function(){
    gameBg.style.top = `${-gameBg.clientHeight - gameBg.offsetTop}px`;
    cardPlace.style.bottom = `${-document.documentElement.clientHeight * 2}px`;
    setTimeout(function (){
        gameBg.style.top = '0px';
        cardPlace.style.bottom = '0px';
    },500)
}

document.addEventListener('DOMContentLoaded', animateOnStart);

const calculateCardSize = () => {
    let size;

    if (bodyElem.offsetWidth >= bodyElem.offsetHeight) {
        const sizeFromOffsetHeight = Math.floor(bodyElem.offsetHeight*0.2673);
            size = [Math.floor(sizeFromOffsetHeight*0.715), sizeFromOffsetHeight];
    } else {
        const sizeFromOffsetWidth = Math.floor(bodyElem.offsetWidth*0.2025);
        size = [sizeFromOffsetWidth, Math.floor(sizeFromOffsetWidth*1.4)];
    }

    const setImgWidthHeight = function(item) {
        item.style.width = size[0]+'px';
        item.style.height = size[1]+'px';
    }
    return setImgWidthHeight;
}

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
    cardsContainerOnDynamicGeneration.querySelectorAll('.game__card-holder').forEach(cardSizeHandler);
    cardsContainerOnDynamicGeneration.querySelectorAll('.game__card-img').forEach(cardSizeHandler);
    cardsContainerOnDynamicGeneration.querySelectorAll('.game__card-cardback').forEach(cardSizeHandler);
    cardPlace.appendChild(cardsContainerOnDynamicGeneration);
}

addCardsOnPage();

const clearAllOperationObjectsAndCreateNewGame = function() {
    const playAgain = window.confirm('Congratulations. You have matched all pairs and won the game. Want to play again?');
        if (playAgain) {
            cardPlace.innerHTML = "";
            prePair.length = 0;
            pairs.length = 0;
            addCardsOnPage();
        }
}

const checkGameIsOverOrNot = function () {
    if (pairs.length === maxQuantityOfPairsOnTheScreen){
        setTimeout(function () {
                clearAllOperationObjectsAndCreateNewGame();
        }, 2100)
    }
}

let hidePair = function(currentPair){
    const [firstCardNode, secondCardNode] = currentPair;
    if (firstCardNode && secondCardNode){
        firstCardNode.classList.add('hide');
        secondCardNode.classList.add('hide');
        currentPair.splice(0, 2);
    }
}

let clearPair = function(currentPair) {
    const [firstCardNode, secondCardNode] = currentPair;
    firstCardNode.classList.remove('active');
    secondCardNode.classList.remove('active');
    currentPair.splice(0, 2);
}

let checkPairOrNot = function () {
    if (prePair.length === 2){
        let currentPair = prePair.slice();
        prePair.splice(0, 2);
        const [firstCardNode, secondCardNode] = currentPair;
        if (getCardIDFromCardHolder(firstCardNode) === getCardIDFromCardHolder(secondCardNode)) {
            pairs.push('1');
            setTimeout(function (currentPair) {
                hidePair(currentPair);
            }, 500, currentPair);
            checkGameIsOverOrNot();

        } else if (getCardIDFromCardHolder(firstCardNode) !== getCardIDFromCardHolder(secondCardNode)) {
            setTimeout(function (currentPair) {
                clearPair(currentPair);
            }, 800, currentPair);
        }
    }
}

const getCardIDFromCardHolder = (cardHolderElement) => {
    const cardID = cardHolderElement.querySelector('.game__card-img').alt;
    return cardID;
}

let createCardInfoAndAddItInCheckPlace = (cardHolderElement) => {
    prePair.push(cardHolderElement);
}

cardPlace.addEventListener('click', function (e) {
    let cardBack = e.target;
    if (cardBack.classList.contains('game__card-cardback')) {
        let cardHolderElement = cardBack.closest('.game__card-holder');
        if (prePair.length < 2) {
            cardHolderElement.classList.add('active');
            createCardInfoAndAddItInCheckPlace(cardHolderElement);
            checkPairOrNot();
        }
    }
})

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
