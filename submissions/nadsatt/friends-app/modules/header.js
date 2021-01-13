import svgs from './../modules/svgs.js';

export class Header {
    constructor(){
        this.element = document.createElement('header');
        this.element.innerHTML =
            `<h2 class="header__heading">Friends App</h2>
             <div class="header__sound-button">
                <span class="header__sound-icon">${svgs.play}</span>
                <span class="header__sound-text">play</span>
             </div>`;

        this.soundIcon = this.element.querySelector('.header__sound-icon');
        this.soundText = this.element.querySelector('.header__sound-text');
        this.soundButton = this.element.querySelector('.header__sound-button');
        this.soundButton.addEventListener('click', e => this.handleSoundButtonClick(e));
        this.sound = new Audio('sounds/audio.mp3');
        this.sound.loop = true;
        this.sound.volume = 0.1;
    }

    handleSoundButtonClick(){
        if(this.sound.paused){
            this.soundIcon.innerHTML = svgs.pause;
            this.soundText.textContent = 'pause';
            this.sound.play();
        }
        else {
            this.soundIcon.innerHTML = svgs.play;
            this.soundText.textContent = 'play';
            this.sound.pause();
        }
    };
}
