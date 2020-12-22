export class FilterList{
    constructor(filters, category){
        this.defineElement(filters, category);
    }

    defineElement(filters, category){
        const filterElements = filters.map(filter => filter.element);
        this.element = document.createElement('ul');
        this.element.classList.add('filter-list', `${category}-filter-list`);
        this.element.append(...filterElements);
    }

    openElement(){
        this.element.classList.add('filter-list--opened');
    }

    closeElement(){
        this.element.classList.remove('filter-list--opened');
    }
}
