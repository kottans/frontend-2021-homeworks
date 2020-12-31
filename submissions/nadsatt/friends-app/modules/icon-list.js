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
        this.element.classNames = {
            iconList: ['icon-list', `${category}-icon-list`],
            categoryIcon: `${category}-icon-item`
        };
        this.element.classList.add(...this.element.classNames.iconList);

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
