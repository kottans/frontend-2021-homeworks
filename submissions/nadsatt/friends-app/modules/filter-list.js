export class FilterList{
    constructor(filters, category){
        const element = document.createElement('ul');
        element.classNames = {
            filterList: ['filter-list', `${category}-filter-list`],
            openedFilterList: 'filter-list--opened'
        };

        element.classList.add(...element.classNames.filterList);
        element.append(...filters);

        element.open = function(){this.classList.add(this.classNames.openedFilterList)};
        element.close = function(){this.classList.remove(this.classNames.openedFilterList)};

        return element;
    }
}
