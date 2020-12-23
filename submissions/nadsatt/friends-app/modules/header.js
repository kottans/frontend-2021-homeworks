import svgs from './../modules/svgs.js';

export class Header {
    constructor(){
        this.defineElement();
        this.insertElement();

        this.defineSoundButton();
        this.defineSoundButtonClickHandler();
    }

    defineElement(){
        const HTML =
            `<h2 class="header__heading">Friends App</h2>
             <div class="header__sound-button">
                <span class="header__sound-icon">${svgs.play}</span>
                <span class="header__text">play</span>
             </div>`;

        this.element = document.createElement('header');
        this.element.classList.add('header');
        this.element.insertAdjacentHTML('afterbegin', HTML);
    }

    insertElement(){
        document.querySelector('.header-wrapper').append(this.element);
    }

    defineSoundButton(){
        this.soundButton = this.element.querySelector('.header__sound-button');

        const sound = new Audio('sounds/audio.mp3');
        sound.loop = true;
        sound.volume = 0.1;
        this.soundButton.sound = sound;
    }

    defineSoundButtonClickHandler(){
        this.soundButton.onclick = this.handleSoundButtonClick;
    }

    handleSoundButtonClick({target}){
        const soundIcon = target.querySelector('.header__sound-icon');
        const soundText = target.querySelector('.header__text');

        if(soundIcon.querySelector('svg').classList.contains('play')){
            soundIcon.textContent = '';
            soundText.textContent = 'pause';
            soundIcon.insertAdjacentHTML(`afterbegin`, svgs.pause);

            target.sound.play();
        }
        else if(soundIcon.querySelector('svg').classList.contains('pause')){
            soundIcon.textContent = '';
            soundText.textContent = 'play';
            soundIcon.insertAdjacentHTML(`afterbegin`, svgs.play);

            target.sound.pause();
        }
    }
}
