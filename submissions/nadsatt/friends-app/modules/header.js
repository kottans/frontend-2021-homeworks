import svgs from './../modules/svgs.js';

export class Header {
    constructor(){
        this.defineElement();
        this.insertElement();

        this.defineIconElement();
        this.defineIconElementClickHandler();
    }

    defineElement(){
        const HTML =
            `<h2 class="header__heading">Friends App</h2>
             <span class="header__sound-icon">${svgs.play}</span>
             <span class="header__text">Play audio</span>`;

        this.element = document.createElement('header');
        this.element.classList.add('header');
        this.element.insertAdjacentHTML('afterbegin', HTML);
    }

    insertElement(){
        document.querySelector('.header-wrapper').append(this.element);
    }

    defineIconElement(){
        this.iconElement = this.element.querySelector('.header__sound-icon');

        const sound = new Audio('sounds/audio.mp3');
        sound.loop = true;
        this.iconElement.sound = sound;
    }

    defineIconElementClickHandler(){
        this.iconElement.onclick = this.handleIconElementClick;
    }

    handleIconElementClick({target}){
        if(target.firstElementChild.classList.contains('play')){
            target.textContent = '';
            target.insertAdjacentHTML(`afterbegin`, svgs.pause);
            target.sound.play();
        }
        else if(target.firstElementChild.classList.contains('pause')){
            target.textContent = '';
            target.insertAdjacentHTML(`afterbegin`, svgs.play);
            target.sound.pause();
        }
    }
}
