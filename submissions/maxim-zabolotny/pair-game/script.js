const cardsArray = [{
  'name': 'shell',
  'img': 'img/blueshell.png',
},
{
  'name': 'star',
  'img': 'img/star.png',
},
{
  'name': 'bobomb',
  'img': 'img/bobomb.png',
},
{
  'name': 'mario',
  'img': 'img/mario.png',
},
{
  'name': 'luigi',
  'img': 'img/luigi.png',
},
{
  'name': 'peach',
  'img': 'img/peach.png',
},
{
  'name': '1up',
  'img': 'img/1up.png',
},
{
  'name': 'mushroom',
  'img': 'img/mushroom.png',
},
{
  'name': 'thwomp',
  'img': 'img/thwomp.png',
},
{
  'name': 'bulletbill',
  'img': 'img/bulletbill.png',
},
{
  'name': 'coin',
  'img': 'img/coin.png',
},
{
  'name': 'goomba',
  'img': 'img/goomba.png',
},
];

const gameGrid = cardsArray
.concat(cardsArray)
.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(({name, img}) => {

const card = document.createElement('div');
card.classList.add('card');
card.dataset.name = name;

const front = document.createElement('div');
front.classList.add('front');

const back = document.createElement('div');
back.classList.add('back');
back.style.backgroundImage = `url(${img})`;

grid.appendChild(card);
card.appendChild(front);
card.appendChild(back);

});

const match = () => {
const selected = document.querySelectorAll('.selected');
selected.forEach(card => {
  card.classList.add('match');
});
};

const resetGuesses = () => {
firstGuess = '';
secondGuess = '';
count = 0;
previousTarget = null;

let selected = document.querySelectorAll('.selected');
selected.forEach(card => {
  card.classList.remove('selected');
});
if (isFinish().every(el => el == 1)) {
  alert('You Win!!!')
  location.reload()
}
};

grid.addEventListener('click', event => {
const clicked = event.target;
if (
  clicked.nodeName === 'SECTION' ||
  clicked === previousTarget ||
  clicked.closest('.card').classList.contains('selected') ||
  clicked.closest('.card').classList.contains('match')
) return;

if (count > 1) return
count++;
if (count === 1) {
  firstGuess = clicked.closest('.card').dataset.name;
  clicked.closest('.card').classList.add('selected');
}
if (count == 2) {
  secondGuess = clicked.closest('.card').dataset.name;
  clicked.closest('.card').classList.add('selected');
}
if (!firstGuess || !secondGuess) return
if (firstGuess === secondGuess) setTimeout(match, delay);
setTimeout(resetGuesses, delay);
previousTarget = clicked;
});

function isFinish() {
// The array contains the status of each card (guessed or not guessed)
let gameResult = []
let cards = document.querySelectorAll('.card')
cards.forEach(el => gameResult = [...gameResult, el.classList.contains('match')])
return gameResult
}
