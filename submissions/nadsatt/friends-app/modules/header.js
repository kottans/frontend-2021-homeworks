import svgs from './../modules/svgs.js';

export class Header {
    constructor(){
        this.defineElement();
        this.defineElementMethods();

        return this.element;
    }

    defineElement(){
        this.element = document.createElement('header');
        this.element.innerHTML =
            `<h2 class="header__heading">Friends App</h2>
             <div class="header__sound-button">
                <span class="header__sound-icon">${svgs.play}</span>
                <span class="header__sound-text">play</span>
             </div>`;
             
        this.element.soundIcon = this.element.querySelector('.header__sound-icon');
        this.element.soundText = this.element.querySelector('.header__sound-text');
        this.element.soundButton = this.element.querySelector('.header__sound-button');

        this.element.sound = new Audio('sounds/audio.mp3');
        this.element.sound.loop = true;
        this.element.sound.volume = 0.1;
    }

    defineElementMethods(){
        this.element.soundButton.addEventListener('click', (function(){
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
        }).bind(this.element));
    }
}
