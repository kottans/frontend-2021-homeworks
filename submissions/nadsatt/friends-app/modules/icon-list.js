import { Icon } from './icon-item.js';

export class IconList{
    constructor(filters, filterList, category){
        this.filters = filters;
        this.filterList = filterList;
        this.category = category;
        this.openedFilter = null;
        this.filterListClosingTime = 300;

        this.defineIcons();
        this.defineElement();
        this.defineElementClickHandler();
    }

    defineIcons(){
        this.icons = this.filters.map(filter => {
            const icon = new Icon(filter);
            filter.iconElement = icon.element;
            return icon;
        });
    }

    defineElement(){
        const iconElements = this.icons.map(icon => icon.element);
        this.element = document.createElement('ul');
        this.element.classList.add('icon-list', `${this.category}-icon-list`);
        this.element.append(...iconElements);
    }

    defineElementClickHandler(){
        this.element.addEventListener('click', this.handleElementClick.bind(this));
    }

    handleElementClick({target}){
        if(target.classList.contains(`${this.category}-icon-item`)){
            const iconElement = target;
            const filter = iconElement.instance.filter;

            this.selectIcon(iconElement);
            this.openFilter(filter);
        }
    }

    selectIcon(iconElement){
        const iconIsSelected = iconElement.instance.isSelected;

        this.icons.forEach(icon => icon.unselect());
        iconIsSelected ? iconElement.instance.unselect() : iconElement.instance.select();
    }

    openFilter(filter){
        if(!this.openedFilter){
            filter.openElement();
            this.filterList.openElement();

            this.openedFilter = filter;
        }
        else if(this.openedFilter === filter){
            this.filterList.closeElement();
            setTimeout(() => {
                filter.closeElement();
            }, this.filterListClosingTime);

            this.openedFilter = null;
        }
        else {
            this.openedFilter.closeElement();
            filter.openElement();

            this.openedFilter = filter;
        }
    }
}
