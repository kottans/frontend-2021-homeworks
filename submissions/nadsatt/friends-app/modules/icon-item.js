import svgs from './svgs.js';

export class Icon {
    constructor(filter){
        const heading = document.createElement('span');
        heading.classList.add('icon-item__heading')
        heading.textContent = filter.property;
        this.element = document.createElement('li');
        this.element.classList.add('icon-item', `${filter.category}-icon-item`);
        this.element.innerHTML = svgs[filter.property];
        this.element.append(heading);

        this.selected = false;
        this.classNames = {
            selectedIcon: 'icon-item--selected',
            activatedIcon: 'icon-item--activated'
        };
    }

    select(){
        this.element.classList.add(this.classNames.selectedIcon);
        this.selected = true;
    }

    unselect(){
        this.element.classList.remove(this.classNames.selectedIcon);
        this.selected = false;
    }

    activate(){
        this.element.classList.add(this.classNames.activatedIcon);
    }

    deactivate(){
        this.element.classList.remove(this.classNames.activatedIcon);
    }
}
