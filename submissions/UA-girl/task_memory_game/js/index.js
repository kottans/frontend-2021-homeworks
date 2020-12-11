const images = [
    {
        name: 'apple-green',
        src: 'img/apple-green.svg'
    },
    {
        name: 'blackberry',
        src: 'img/blackberry.svg'
    },
    {
        name: 'blueberry',
        src: 'img/blueberry.svg'
    },
    {
        name: 'cherry',
        src: 'img/cherry.svg'
    },
    {
        name: 'grape',
        src: 'img/grape.svg'
    },
    {
        name: 'lingonberry',
        src: 'img/lingonberry.svg'
    }
];
const TIME_DELAY = 400;
const container = document.querySelector('.container-game');
let cards = [];
const fragment = document.createDocumentFragment();
let startTime, endTime;


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function createCardItem({name, src}) {
    const cardItem = document.createElement('div');
    cardItem.classList.add('card');
    cardItem.setAttribute('data-name', name);
    const div_front = document.createElement('div');
    div_front.classList.add('front');
    const img = document.createElement('img');
    img.classList.add('card-image');
    img.setAttribute('src', src);
    div_front.appendChild(img);
    const div_back = document.createElement('div');
    div_back.classList.add('back');
    cardItem.appendChild(div_front);
    cardItem.appendChild(div_back);
    return cardItem;
}


function updateGame() {
    shuffleArray(cards);
    cards.forEach(card => fragment.append(card));
    container.appendChild(fragment);
    startTime = new Date();
}


function loadGame() {
    for (let image of images) {
        cards.push(createCardItem(image));
        cards.push(createCardItem(image));
    }
    updateGame();
}


function reloadGame() {
    container.innerHTML = '';
    updateGame();
}


function checkCardsPair(cards) {
    return cards[0].dataset.name === cards[1].dataset.name;
}


function removeCardsFromGame(cards) {
    cards.forEach(card => card.classList.remove('toggled'));
    cards.forEach(card => card.classList.add('hidden'));
    if (checkWinGame()) {
        reloadGame();
    }
}


function checkWinGame() {
    const hiddens = cards.filter(card => card.classList.contains('hidden'));
    if (hiddens.length === 12) {
        endTime = new Date();
        const delta = Math.round((endTime - startTime) / 1000);
        alert(`Cool! You are the best =)
        Your time is ${delta} sec`);
        cards.forEach(card => card.classList.remove('hidden'));
        return true;
    }
    return false;
}


function toggleCard({target}) {
    let card = target.closest('div.card');
    if(!card) {
        return;
    }
    card.classList.toggle('toggled');
    const pair = cards.filter(card => card.classList.contains('toggled'));
    if (pair.length === 2) {
        if (checkCardsPair(pair)) {
            setTimeout(function () {
                removeCardsFromGame(pair)
            }, TIME_DELAY);

        } else {
            setTimeout(() => pair.forEach(card => card.classList.remove('toggled')), TIME_DELAY);
        }
    }
}


container.addEventListener('click', toggleCard);
loadGame();
