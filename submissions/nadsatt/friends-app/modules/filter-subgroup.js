export class FilterSubgroup {
    constructor(iconList, filterList, category){
        const element = document.createElement('div');
        element.classList.add(`${category}-filter-subgroup`);
        element.insertAdjacentHTML('afterbegin', `<h3 class="filter-subgroup__heading">${category}</h3>`);
        element.append(iconList, filterList);

        return element;
    }
}
