export class PageLink {
    constructor(value, className = 'page-link-item'){
        const element = document.createElement('a');
        element.setAttribute('href', '#');
        element.classList.add('page-link');
        element.textContent = value;

        const wrapper = document.createElement('li');
        wrapper.classList.add(className);
        wrapper.append(element);

        return wrapper;
    }
}

export class CornerPageLink extends PageLink {
    constructor(value){
        const classNames = {
            disabledCornerPageLink: 'corner-page-link-item--disabled'
        };

        super(value, 'corner-page-link-item');

        this.enable = function(){
            this.classList.remove(classNames.disabledCornerPageLink);
        };

        this.disable = function(){
            this.classList.add(classNames.disabledCornerPageLink);
        };
    }
}
