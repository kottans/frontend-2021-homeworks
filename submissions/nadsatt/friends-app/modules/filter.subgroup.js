export class FilterSubgroup {
    constructor(iconList, filterList, category){
        this.element = document.createElement('div');
        this.element.classList.add(`${category}-filter-subgroup`);
        this.element.insertAdjacentHTML('afterbegin', `<h3 class="filter-subgroup__heading">${category}</h3>`);
        this.element.append(iconList.element, filterList.element);
    }
}
