import { Icon } from './icon-item.js';

export class IconList{
    constructor(filterList, category){
        this.element = document.createElement('ul');
        this.element.classList.add('icon-list', `${category}-icon-list`);
        this.icons = filterList.filters.map(filter => {
            const icon = new Icon(filter);
            icon.filter = filter;
            filter.icon = icon;
            return icon;
        });
        this.element.append(...this.icons.map(icon => icon.element));
        this.element.addEventListener('click', e => this.handleElementClick(e));

        this.filterList = filterList;
        this.filters = filterList.filters;
        this.category = category;
        this.openedFilter = null;
        this.filterListClosingTime = 300;
        this.classNames = {
            categoryIcon: `${category}-icon-item`
        };
    }

    handleElementClick({target}){
        if(target.classList.contains(this.classNames.categoryIcon)){
            const icon = this.icons.find(icon => icon.element === target);
            const filter = icon.filter;

            this.selectIcon(icon);
            this.openFilter(filter);
        }
    }

    selectIcon(icon){
        const iconSelected = icon.selected;

        this.icons.forEach(icon => icon.unselect());
        if(iconSelected) icon.unselect();
        else icon.select();
    }

    openFilter(filter){
        if(!this.openedFilter){
            filter.open();
            this.filterList.open();
            this.openedFilter = filter;
        }
        else if(this.openedFilter === filter){
            this.filterList.close();
            setTimeout(() => {
                filter.close();
            }, this.filterListClosingTime);
            this.openedFilter = null;
        }
        else {
            this.openedFilter.close();
            filter.open();
            this.openedFilter = filter;
        }
    }
}
