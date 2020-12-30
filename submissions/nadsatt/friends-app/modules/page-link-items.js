export class PageLink {
    constructor(value, className = 'page-link-item'){
        const element = document.createElement('li');
        element.classList.add(className);
        element.textContent = value;

        return element;
    }
}

export class CornerPageLink extends PageLink {
    constructor(value){
        super(value, 'corner-page-link-item');

        this.enable = function(){
            this.classList.remove('corner-page-link-item--disabled');
        };

        this.disable = function(){
            this.classList.add('corner-page-link-item--disabled');
        };
    }
}
