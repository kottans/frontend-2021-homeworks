import svgs from './svgs.js';

export class Icon {
    constructor(filter){
        this.filter = filter;
        this.isSelected = false;

        this.defineElement();
        this.linkElementWithInstance();
   }

    defineElement(){
        const heading = document.createElement('span');
        heading.classList.add('icon-item__heading')
        heading.textContent = this.filter.property;

        this.element = document.createElement('li');
        this.element.classList.add('icon-item', `${this.filter.category}-icon-item`);
        this.element.setAttribute('data-filter-name', this.filter.name);
        this.element.innerHTML = svgs[this.filter.property];
        this.element.append(heading);
    }

    linkElementWithInstance(){
        this.element.instance = this;
    }

    select(){
        this.element.classList.add('icon-item--selected');
        this.isSelected = true;
    }

    unselect(){
        this.element.classList.remove('icon-item--selected');
        this.isSelected = false;
    }
}
