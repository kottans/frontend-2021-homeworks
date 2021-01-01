export class FilterList{
    constructor(filters, category){
        const element = document.createElement('ul');
        element.classList.add('filter-list', `${category}-filter-list`);
        element.openedFilterListClassName = 'filter-list--opened';
        element.filters = filters;
        element.append(...filters);

        element.open = function(){this.classList.add(this.openedFilterListClassName)};
        element.close = function(){this.classList.remove(this.openedFilterListClassName)};

        return element;
    }
}
