import svgs from './svgs.js';

export class Icon {
    constructor(filter){
        this.defineElement(filter);
        this.defineElementProperties();
        this.defineElementMethods();

        return this.element;
    }

    defineElement(filter){
        const heading = document.createElement('span');
        heading.classList.add('icon-item__heading')
        heading.textContent = filter.property;

        this.element = document.createElement('li');
        this.element.classNames = {
            icon: ['icon-item', `${filter.category}-icon-item`],
            selectedIcon: 'icon-item--selected'
        };
        this.element.classList.add(...this.element.classNames.icon);

        this.element.innerHTML = svgs[filter.property];
        this.element.append(heading);
    }

    defineElementProperties(){
        this.element.selected = false;
    }

    defineElementMethods(){
        // copy methods to avoid methods duplication in different instances
        this.element.select = this.select;
        this.element.unselect = this.unselect;
    }

    select(){
        this.classList.add(this.classNames.selectedIcon);
        this.selected = true;
    }

    unselect(){
        this.classList.remove(this.classNames.selectedIcon);
        this.selected = false;
    }
}
