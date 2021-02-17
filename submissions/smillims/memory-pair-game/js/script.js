'use strict';

const cards = document.querySelector('.cards');

let lockCard = false;
let firstCard = '';
let secondCard = '';

const SRC_FRONT = 'img/logo.png';

const titleImages = [
	{	
		id: 'bentley',
		srcFront: SRC_FRONT,
		srcBack: 'img/bentley.png',
		alt: 'bentley',
	},
	{
		id: 'amazon',
		srcFront: SRC_FRONT,
		srcBack:'img/amazon.png',
		alt: 'amazon',	
	},
	{
		id: 'google',
		srcFront: SRC_FRONT,
		srcBack:'img/google.png',
		alt: 'google',
	},
	{
		id: 'intel',
		srcFront: SRC_FRONT,
		srcBack:'img/intel.png',
		alt: 'intel',
	},
	{
		id: 'nike',
		srcFront: SRC_FRONT,
		srcBack:'img/nike.png',
		alt: 'nike',
	},
	{
		id: 'telegram',
		srcFront: SRC_FRONT,
		srcBack:'img/telegram.png',
		alt: 'telegram',
	},
];

const allImages = [...titleImages, ...titleImages];

const allPairsInGame = 6;
let currentPair = 0;

function sortCards() {
	allImages.sort(function() { 
		return 0.5 - Math.random() 
	});
};

function generateCard() {
	sortCards();

	let divFlipper = '';
	allImages.forEach(item => 
		divFlipper += `<div class="flipper" data-id="${item.id}">
		<div class="front"><img src="${item.srcFront}" alt="Logo"></div>
		<div class="back"><img src="${item.srcBack}" alt="${item.alt}"></div>
	</div>`
	);
	
	cards.innerHTML = divFlipper;
	
};

function flipCards(e) {
	const targetCard = e.target.closest('.flipper');

	if(lockCard || !targetCard || targetCard === firstCard) return;

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
		currentPair++;
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

	resetValue();
};

function frontFlipPair() {
	const waitingTime = 600;
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
	if(currentPair === allPairsInGame) {
		alert('You win!');
		location.reload();
	};
};

generateCard();
cards.addEventListener('click', flipCards);
