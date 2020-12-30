export class FilterList{
    constructor(filters, category){
        const element = document.createElement('ul');
        element.classList.add('filter-list', `${category}-filter-list`);
        element.append(...filters);

        element.open = function(){this.classList.add('filter-list--opened')};
        element.close = function(){this.classList.remove('filter-list--opened')};

        return element;
    }
}
