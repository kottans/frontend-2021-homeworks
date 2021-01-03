export class FilterList{
    constructor(filters, category){
        this.element = document.createElement('ul');
        this.element.classList.add('filter-list', `${category}-filter-list`);
        this.element.append(...filters.map(filter => filter.element));

        this.filters = filters;
        this.classNames = {
            openedFilterList: 'filter-list--opened'
        };
    }

    open(){
        this.element.classList.add(this.classNames.openedFilterList);
    }

    close(){
        this.element.classList.remove(this.classNames.openedFilterList);
    };
}
