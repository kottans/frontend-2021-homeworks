const orelSong = new Audio('music/orel.mp3');
const gopgopSong = new Audio('music/gopgop.mp3');
const tanciSong = new Audio('music/tanci.mp3');
const cadilacSong = new Audio('music/cadilac.mp3');
const dimSong = new Audio('music/dim.mp3');

const oneSecond = 1000;
const totalPlayingCards = 10;
const guessed = 'guessed';
const greeting = `Congratulations! Let's play once more!`;

let clickCounter = 0;
let guessedCards = 0;
let playedSongs = [];
let playingCards = [];

const cards = [
    {
        key: 1,
        text: 'orel',
        musicCard: false,
        song: null
    },
    {
        key: 1,
        text: null,
        musicCard: true,
        song: orelSong
    },
    {
        key: 2,
        text: 'gopgop',
        musicCard: false,
        song: null
    },
    {
        key: 2,
        text: null,
        musicCard: true,
        song: gopgopSong
    },
    {
        key: 3,
        text: 'tanci',
        musicCard: false,
        song: null
    },
    {
        key: 3,
        text: null,
        musicCard: true,
        song: tanciSong
    },
    {
        key: 4,
        text: 'cadilac',
        musicCard: false,
        song: null
    },
    {
        key: 4,
        text: null,
        musicCard: true,
        song: cadilacSong
    },
    {
        key: 5,
        text: 'dim',
        musicCard: false,
        song: null
    },
    {
        key: 5,
        text: null,
        musicCard: true,
        song: dimSong
    }
]

const main = document.querySelector('.main');
let mainGridContainer = document.querySelector('.main__grid-container');
const modal = document.querySelector('.modal');


const styleNewCardFlipperFront = (newCardFlipperFront, card, cardNumber) => {
    switch (cardNumber) {
        case 0:
        case 9:
            newCardFlipperFront.classList.add('card__flipper-front', `card--circle-img`);
            newCardFlipperFront.setAttribute('data-key', card.key);
            break;
        case 1:
        case 2:
        case 7:
        case 8:
            newCardFlipperFront.classList.add('card__flipper-front', `card--vertical-line-img`);
            newCardFlipperFront.setAttribute('data-key', card.key);
            break;
        case 3:
            newCardFlipperFront.classList.add('card__flipper-front', `card--left-corner-img`);
            newCardFlipperFront.setAttribute('data-key', card.key);
            break;
        case 6:
            newCardFlipperFront.classList.add('card__flipper-front', `card--right-corner-img`);
            newCardFlipperFront.setAttribute('data-key', card.key);
            break;
        case 4:
        case 5:
            newCardFlipperFront.classList.add('card__flipper-front', `card--horizontal-line-img`);
            newCardFlipperFront.setAttribute('data-key', card.key);
            break;
        default:
            newCardFlipperFront.classList.add('card__flipper-front', `card--clef-img`);
            newCardFlipperFront.setAttribute('data-key', card.key);
    }
}

const createNewCard = (card, cardNumber) => {
    const newCard = document.createElement('div');
    const newCardFlipper = document.createElement('div');
    const newCardFlipperFront = document.createElement('div');
    const newCardFlipperBack = document.createElement('div');
    if (card.musicCard) {
        newCard.classList.add('card', `card--${cardNumber}`, 'musicCard')
        newCardFlipperBack.classList.add(`card--music-img`);
    } else {
        newCard.classList.add('card', `card--${cardNumber}`);
        newCardFlipperBack.classList.add(`card--${card.text}-img`);
    }
    newCardFlipper.classList.add('card__flipper');
    newCardFlipper.setAttribute('ontouchstart', "this.classList.toggle('card__flipper--flip');")
    styleNewCardFlipperFront(newCardFlipperFront, card, cardNumber);
    console.log(newCardFlipperFront);
    newCardFlipperBack.classList.add('card__flipper-back');
    newCard.appendChild(newCardFlipper);
    newCardFlipper.appendChild(newCardFlipperFront);
    newCardFlipper.appendChild(newCardFlipperBack);
    return newCard;
}

const shuffleArr = (arr) => arr.sort(() => 0.5 - Math.random());

const loadCards = (cardsArr) => {
    const shuffledCards = shuffleArr(cardsArr);
    const fragment = document.createDocumentFragment();
    shuffledCards.forEach((card, index) => {
        const newCard = createNewCard(card, index);
        fragment.appendChild(newCard);
    })
    mainGridContainer.appendChild(fragment);
}

const clearMainGridContainer = () => {
    mainGridContainer.innerHTML = '';
    mainGridContainer.removeEventListener('click', clickCardCallback)
}

const resetGame = () => {
    guessedCards = 0;
    clickCounter = 0;
    playedSongs = [];
    playingCards = [];
    clearMainGridContainer();
    initApp();
}

const handlePlayingCards = (cardStatus) => {
    const playingNow = document.querySelectorAll(".playingNow");
    playingNow.forEach((card) => {
        card.classList.remove("playingNow");
        if (cardStatus === guessed) {
            setTimeout(() => {
                card.closest('.card').classList.add('card--background-green');
            }, oneSecond / 3)
        }; 
        setTimeout(() => {
            card.closest('.card__flipper').classList.toggle(cardStatus);
        }, oneSecond)
    });
}

const handleGameOver = (guessedCards) => {
    if (guessedCards === totalPlayingCards) {
        setTimeout(() => {
            alert(greeting);
            resetGame(guessedCards);
        }, oneSecond)
    }
}

const stopPreviousSong = (playedSongs) => {
    const previousSong = playedSongs[playedSongs.length - 1];
    previousSong.pause();
    previousSong.currentTime = 0;
}

const handleMusicCard = (target) => {
    if (target.closest('.card').classList.contains('musicCard')) {
        const targetKeyNumber = target.dataset.key;
        const targetObj = cards.find((card) => card.musicCard && card.key === Number.parseInt(targetKeyNumber, 10));
        if (playedSongs.length) {
            stopPreviousSong(playedSongs);
        }
        playedSongs.push(targetObj.song);
        targetObj.song.play();
    };
}

const clickCardCallback = ({target}) => {
    if (
        target.classList.contains("card__flipper-front") &&
        !target.closest('.card__flipper').classList.contains(guessed) &&
        playingCards.length < 2
      ) {
        target.closest('.card__flipper').classList.toggle("card__flipper--flip");
        target.classList.add("playingNow");
        handleMusicCard(target);

        clickCounter += 1;
        playingCards.push(target.dataset.key);
        if (clickCounter === 2 && playingCards[0] === playingCards[1]) {
          handlePlayingCards(guessed);
          modal.classList.add('modal--visible');
          setTimeout(() => {
              modal.classList.remove('modal--visible');
          }, oneSecond)
          clickCounter = 0;
          playingCards = [];
          guessedCards += 2;
        } else if (clickCounter === 2 && playingCards[0] !== playingCards[1]) {
          handlePlayingCards('card__flipper--flip');
          setTimeout(() => {
              clickCounter = 0;
              playingCards = [];
          }, oneSecond)
        }
      }
      handleGameOver(guessedCards);
}

const initApp = () => {
    loadCards(cards);
    mainGridContainer.addEventListener('click', clickCardCallback);
}

document.addEventListener('DOMContentLoaded', initApp);
