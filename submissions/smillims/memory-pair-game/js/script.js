'use strict';

const cards = document.querySelector('.cards');

let lockCard = false;
let firstCard = '';
let secondCard = '';

const images = [
	'bentley',
	'amazon',
	'google',
	'intel',
	'nike',
	'telegram'
];

const allImg = [...images, ...images];

const numberOfallImg = allImg.length;
const allPairInGame = 6;
let currentPair = 0;

function sortCard() {
	allImg.sort(function() { 
		return 0.5 - Math.random() 
	});
};

function generateCard() {
	sortCard();

	let divFlipper = '';
	allImg.forEach(item => 
		divFlipper += `<div class="flipper" data-id="${item}">
		<div class="front"><img src="img/logo.png" alt="Logo"></div>
		<div class="back"><img src="img/${item}.png" alt="${item}"></div>
	</div>`
	);
	
	cards.innerHTML = divFlipper;
	
};

function flipCards(e) {
	let targetCard = e.target.closest('.flipper');

	if (!targetCard) return;
	if(lockCard || targetCard === firstCard) {
		return;
	};

	if(!firstCard) {
		firstCard = targetCard;
		firstCard.classList.add('flip');
		return;
	} else {
		secondCard = targetCard;
		secondCard.classList.add('flip');
		checkPair();
	}
};

function checkPair() {
	if(firstCard.dataset.id === secondCard.dataset.id) {
		disablePair();
		checkWin();
	} else {
		frontFlipPair();
	}
}

function disablePair() {
	firstCard.removeEventListener('click', flipCards);
	secondCard.removeEventListener('click', flipCards);
	firstCard.classList.add('opacity');
	secondCard.classList.add('opacity');

	currentPair++;

	resetValue();
};

function frontFlipPair() {
	let waitingTime = 600;
	lockCard = true;

	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetValue();
	}, waitingTime);
};

function resetValue() {
	lockCard = false;
	firstCard = '';
	secondCard = '';
};

function checkWin() {
	if(currentPair === allPairInGame) {
		alert('You win!');
		location.reload();
	};
};

generateCard();
cards.addEventListener('click', flipCards);
