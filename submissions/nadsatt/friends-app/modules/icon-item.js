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
        this.element.classList.add('icon-item', `${filter.category}-icon-item`);
        this.element.setAttribute('data-filter-name', filter.name);
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
        this.classList.add('icon-item--selected');
        this.selected = true;
    }

    unselect(){
        this.classList.remove('icon-item--selected');
        this.selected = false;
    }
}
