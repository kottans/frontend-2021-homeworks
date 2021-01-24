'use strict';

const allCards = document.querySelectorAll('.flipper');

const cardPosition = 12;
const allPairCards = 6;
let currentPair = 0;
let hasFlippedCard = false;
let lockCard = false;
let firstCard = '';
let secondCard = '';

function flipCards() {
	if(lockCard){
		return;
	};
	if (this === firstCard){
		return;
	};

	this.classList.add('flip');

	if(!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	} else {
		secondCard = this;
		checkPair();
	}
};

function checkPair() {
	if(firstCard.dataset.id === secondCard.dataset.id){
		disablePair();
		checkWin();
	} else {
		frontFlipPair();
	}
};

function disablePair() {
	firstCard.classList.add('opacity');
	firstCard.removeEventListener('click', flipCards);
	secondCard.classList.add('opacity');
	secondCard.removeEventListener('click', flipCards);

	currentPair++;

	resetValue();
};

function frontFlipPair() {
	lockCard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		
		resetValue();
	}, 700);
};

function resetValue() {
	hasFlippedCard = false;
	lockCard = false
	firstCard = '';
	secondCard = '';
};

function checkWin() {
	if(currentPair === allPairCards) {
		alert('You win!');
		location.reload();
	};
};

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}; 

(function shuffleCards() {
	allCards.forEach(function(card) {
		 let random = getRandomInt(cardPosition);
		 card.style.order = random;
	})
})();

allCards.forEach(item => item.addEventListener('click', flipCards));
