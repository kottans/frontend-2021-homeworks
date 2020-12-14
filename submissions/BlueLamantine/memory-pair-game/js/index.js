'use strict';

class General {
  constructor(startBtn) {
    this.startButton = document.querySelector(startBtn);
    this.cardAreas = document.querySelectorAll('.block');
    this.gameTheme = new Audio('./audio/game_theme.mp3');
  }

  playAudio() {
    this.gameTheme.loop = true;
    this.gameTheme.volume = 0.2;
    this.gameTheme.muted = false;
    this.gameTheme.play();

    document.querySelector('#musicControl').addEventListener('click', e => {
      e.preventDefault();
      if (this.gameTheme.muted) {
        this.gameTheme.muted = false;
        e.target.classList.replace('fa-volume-off', 'fa-volume-up');
      } else {
        this.gameTheme.muted = true;
        e.target.classList.replace('fa-volume-up', 'fa-volume-off');
      }
    });
  }
  setGameGonfig() {
    this.startButton.addEventListener('click', e => {
      e.preventDefault();
      this.startButton.classList.add('hidden');
      document
        .querySelector('#modal')
        .classList.replace('popup-active', 'popup');
      document
        .querySelector('#map')
        .classList.replace('map-preload', 'map-load');
      this.cardAreas.forEach(block => {
        block.classList.replace('block-preload', 'block-load');
      });
      new Render(this.cardAreas).renderCards();
      new Game().startGame();
      this.playAudio();
    });
  }
}

class Render {
  constructor(areas) {
    this.cardsArray = [
      {
        name: 'pawtter',
        path: 'img/cats/pawtter.png',
      },
      {
        name: 'hairmeowne',
        path: 'img/cats/hairmeowne.png',
      },
      {
        name: 'ron',
        path: 'img/cats/ron.png',
      },
      {
        name: 'lord',
        path: 'img/cats/lord.png',
      },
      {
        name: 'sevepuss',
        path: 'img/cats/sevepuss.png',
      },
      {
        name: 'dumpurrdore',
        path: 'img/cats/dumpurrdore.png',
      },
    ];
    this.areas = areas;
    this.pawsInBlock = 10;
    this.cardsInBlock = 3;
  }

  shuffleCards() {
    const shuffleArray = this.cardsArray.concat(this.cardsArray).sort(() => {
      return 0.5 - Math.random();
    });
    const cardsBack = document.querySelectorAll('.back');
    shuffleArray.forEach((data, cardIndex) => {
      cardsBack[cardIndex].innerHTML = `
      <img name="${data.name}" src="${data.path}" alt="cat" class="card-img">
      `;
    });
  }

  getPawPrints() {
    let template = ``;
    for (let i = 0; i < this.pawsInBlock; i++) {
      template += `<i class="fa fa-paw paw"></i>`;
    }
    return template;
  }

  renderBlock() {
    let template = ``;
    for (let i = 0; i < this.cardsInBlock; i++) {
      template += `
      <div class="wrap">
        <div class="paws">
          ${this.getPawPrints()}
        </div>
        <div class="card">
          <div class="face front"></div>
          <div class="face back"></div>
        </div>
      </div>`;
    }
    return template;
  }

  renderCards() {
    this.areas.forEach(block => {
      block.innerHTML = this.renderBlock();
    });
    this.shuffleCards();
  }
}

class Game {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.openCardsCount = 0;
    this.movesCount = 0;
    this.maxOpenCards = 2;
    this.animationDelay = {
      flip: 300,
      disappear: 520,
    };
    this.cardsNum = 12;
    this.currentTime = '';
  }

  getDisappear(card) {
    card.closest('.wrap').classList.add('hidden');
  }

  getFlip(card) {
    card.closest('.card').querySelector('.front').classList.toggle('open');
    card.closest('.card').querySelector('.back').classList.toggle('open');
  }

  gameOver () {
    document.querySelector('#timer').classList.add('hidden');
    document.querySelector('#moves-counter').classList.add('hidden');
    const gameOver = document.createElement('div');
    gameOver.classList.add('game-over-text');
    gameOver.innerHTML =
      `Congratulations!!! You broke the spell! ` +
      `With ${this.movesCount} moves and your time is ${this.currentTime}.`;
    document.querySelector('#map').appendChild(gameOver);
  }

  getMatching() {
    let openedCards = Array.from(document.querySelectorAll('.front.open'));
    let openedCardsNames = openedCards.map(card =>
      card.nextElementSibling.firstElementChild.getAttribute('name')
    );
    if (openedCardsNames.every((name, i, arr) => name === arr[0])) {
      openedCards.forEach(card => {
        setTimeout(this.getFlip, this.animationDelay.flip, card);
        setTimeout(this.getDisappear, this.animationDelay.disappear, card);
        this.cardsNum = --this.cardsNum;
        if (this.cardsNum == 0) {
          this.gameOver();
        }
      });
    }
  }

  closeCards() {
    let cardsForClose = Array.from(document.querySelectorAll('.front.open'));
    cardsForClose.forEach(card => {
      setTimeout(this.getFlip, this.animationDelay.flip, card);
    });
  }

  timerControl() {
    let timer = 0;
    let hour = 0;
    let minute = 0;
    let second = 0;
    window.setInterval(() => {
      ++timer;
      hour = Math.floor(timer / 3600);
      minute = Math.floor((timer - hour * 3600) / 60);
      second = timer - hour * 3600 - minute * 60;
      if (hour < 10) hour = '0' + hour;
      if (minute < 10) minute = '0' + minute;
      if (second < 10) second = '0' + second;
      this.currentTime = `${hour} : ${minute} : ${second}`;
      document.querySelector('#timer').innerHTML = this.currentTime;
    }, 1000);
  }

  startGame() {
    this.timerControl();

    this.cards.forEach(e => {
      e.addEventListener('click', e => {
        e.preventDefault();

        this.movesCount++;
        const currentCard = e.target;
        this.openCardsCount++;

        if (this.openCardsCount <= this.maxOpenCards) {
          this.getFlip(currentCard);

          if (this.openCardsCount == this.maxOpenCards) {
            this.getMatching();
          }
        } else {
          this.closeCards();
          this.getFlip(currentCard);
          this.openCardsCount = 1;
        }
        document.querySelector('#counter').innerText = this.movesCount;
      });
    });
  }
}

new General('#start-game-btn').setGameGonfig();
