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
        const classNames = {
            cornerPageLink: 'corner-page-link-item',
            disabledCornerPageLink:  'corner-page-link-item--disabled'
        };

        super(value, classNames.cornerPageLink);

        this.enable = function(){
            this.classList.remove(classNames.disabledCornerPageLink);
        };

        this.disable = function(){
            this.classList.add(classNames.disabledCornerPageLink);
        };
    }
}
