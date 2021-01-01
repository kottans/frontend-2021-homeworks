import svgs from './svgs.js';

export class Icon {
    constructor(filter){
        this.defineElement(filter);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(filter){
        const heading = document.createElement('span');
        heading.classList.add('icon-item__heading')
        heading.textContent = filter.property;

        this.element = document.createElement('li');
        this.element.classList.add('icon-item', `${filter.category}-icon-item`);
        this.element.innerHTML = svgs[filter.property];
        this.element.append(heading);

        this.element.selected = false;
        this.element.classNames = {
            selectedIcon: 'icon-item--selected',
            activatedIcon: 'icon-item--activated'
        };
    }

    defineElementMethods(){
        // copy methods to avoid methods duplication in different instances
        this.element.select = this.select;
        this.element.unselect = this.unselect;
        this.element.activate = this.activate;
        this.element.deactivate = this.deactivate;
    }

    select(){
        this.classList.add(this.classNames.selectedIcon);
        this.selected = true;
    }

    unselect(){
        this.classList.remove(this.classNames.selectedIcon);
        this.selected = false;
    }

    activate(){
        this.classList.add(this.classNames.activatedIcon);
    }

    deactivate(){
        this.classList.remove(this.classNames.activatedIcon);
    }
}
