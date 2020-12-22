export class PageLink {
    constructor(value, className = 'page-link-item'){
        this.element = document.createElement('li');
        this.element.classList.add(className);
        this.element.textContent = value;
        this.element.instance = this;
    }
}

export class CornerPageLink extends PageLink {
    constructor(value){
        super(value, 'corner-page-link-item');
    }

    enable(){
        this.element.classList.remove('corner-page-link-item--disabled');
    }

    disable(){
        this.element.classList.add('corner-page-link-item--disabled');
    }
}
