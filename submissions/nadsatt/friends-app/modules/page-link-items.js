export class PageLink {
    constructor(value, className = 'page-link-item'){
        const innerElement = document.createElement('a');
        innerElement.setAttribute('href', '#');
        innerElement.classList.add('page-link');
        innerElement.textContent = value;
        this.element = document.createElement('li');
        this.element.classList.add(className);
        this.element.append(innerElement);

        this.classNames = {
            selectedPageLinkItem: 'page-link-item--selected'
        }
    }

    select(){
        this.element.classList.add(this.classNames.selectedPageLinkItem);
    }
}

export class CornerPageLink extends PageLink {
    constructor(value){
        const cornerPageLinkClassName = 'corner-page-link-item';
        super(value, cornerPageLinkClassName);

        this.classNames = {
            disabledCornerPageLink: 'corner-page-link-item--disabled'
        };
    }

    enable(){
        this.element.classList.remove(this.classNames.disabledCornerPageLink);
    }

    disable(){
        this.element.classList.add(this.classNames.disabledCornerPageLink);
    }
}
