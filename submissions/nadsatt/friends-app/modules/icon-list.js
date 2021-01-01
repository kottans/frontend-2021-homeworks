import { Icon } from './icon-item.js';

export class IconList{
    constructor(...args){
        this.defineElement(...args);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(filterList, category){
        this.element = document.createElement('ul');
        this.element.classList.add('icon-list', `${category}-icon-list`);

        this.element.icons = filterList.filters.map(filter => {
            const icon = new Icon(filter);
            icon.filter = filter;
            filter.icon = icon;
            return icon;
        });
        this.element.append(...this.element.icons);

        this.element.filterList = filterList;
        this.element.filters = filterList.filters;
        this.element.category = category;
        this.element.openedFilter = null;
        this.element.filterListClosingTime = 300;
        this.element.classNames = {
            categoryIcon: `${category}-icon-item`
        };
    }

    defineElementMethods(){
        this.element.addEventListener('click', function({target}){
            if(target.classList.contains(this.classNames.categoryIcon)){
                this.selectIcon(target);
                this.openFilter(target.filter);
            }
        });

        this.element.selectIcon = function(icon){
            const iconSelected = icon.selected;

            this.icons.forEach(icon => icon.unselect());

            if(iconSelected) icon.unselect();
            else icon.select();
        }

        this.element.openFilter = function(filter){
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
}
