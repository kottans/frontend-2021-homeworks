import { Icon } from './icon-item.js';

export class IconList{
    constructor(filters, filterList, category){
        this.defineElement(filters, category);
        this.defineElementProperties(filters, filterList, category);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(filters, category){
        this.element = document.createElement('ul');
        this.element.classList.add('icon-list', `${category}-icon-list`);

        this.element.icons = filters.map(filter => {
            const icon = new Icon(filter);
            icon.filter = filter;
            filter.icon = icon;
            return icon;
        });

        this.element.append(...this.element.icons);
    }

    defineElementProperties(filters, filterList, category){
        this.element.filters = filters;
        this.element.filterList = filterList;
        this.element.category = category;
        this.element.openedFilter = null;
        this.element.filterListClosingTime = 300;
    }

    defineElementMethods(){
        this.element.addEventListener('click', function({target}){
            if(target.classList.contains(`${this.category}-icon-item`)){
                this.selectIcon(target);
                this.openFilter(target.filter);
            }
        });

        this.element.selectIcon = function(icon){
            const iconSelected = icon.selected;

            this.icons.forEach(icon => icon.unselect());
            iconSelected ? icon.unselect() : icon.select();
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

window.IconList = IconList;
