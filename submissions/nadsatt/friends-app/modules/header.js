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
                <span class="header__text">Play audio</span>
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
        this.soundButton.sound = sound;
    }

    defineSoundButtonClickHandler(){
        this.soundButton.onclick = this.handleSoundButtonClick;
    }

    handleSoundButtonClick({target}){
        const soundIcon = target.querySelector('.header__sound-icon');
        
        if(soundIcon.querySelector('svg').classList.contains('play')){
            soundIcon.textContent = '';
            soundIcon.insertAdjacentHTML(`afterbegin`, svgs.pause);

            target.sound.play();
        }
        else if(soundIcon.querySelector('svg').classList.contains('pause')){
            soundIcon.textContent = '';
            soundIcon.insertAdjacentHTML(`afterbegin`, svgs.play);

            target.sound.pause();
        }
    }
}
