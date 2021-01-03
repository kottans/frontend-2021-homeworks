import * as searchFiltersModule from './search-filter-items.js';
import * as sortFiltersModule from './sort-filter-items.js';
import { FilterList } from './filter-list.js';
import { IconList } from './icon-list.js';

export class FilterGroup {
    constructor(userService, pageLinkList){
        const categories = ['sort', 'search'];
        const sortFilterClasses = Object.values(sortFiltersModule);
        const searchFilterClasses = Object.values(searchFiltersModule);

        this.element = document.createElement('div');
        this.element.classList.add('filter-group');
        this.element.addEventListener('click', e => this.performFiltering(e));
        this.element.addEventListener('input', e => this.performFiltering(e));

        this.userService = userService;
        this.pageLinkList = pageLinkList;

        this.sortFilters = sortFilterClasses
            .map(FilterClass => new FilterClass(categories[0], userService));
        this.searchFilters = searchFilterClasses
            .map(FilterClass => new FilterClass(categories[1], userService));
        this.filters = this.sortFilters.concat(this.searchFilters);

        this.sortFilterList = new FilterList(this.sortFilters, categories[0]);
        this.searchFilterList = new FilterList(this.searchFilters, categories[1]);

        this.sortIconList = new IconList(this.sortFilterList, categories[0]);
        this.searchIconList = new IconList(this.searchFilterList, categories[1]);

        const filterSubGroups = categories.map(category => {
            const filterSubGroup = document.createElement('div');
            filterSubGroup.classList.add(`${category}-filter-subgroup`);
            filterSubGroup.innerHTML = `<h3 class="filter-subgroup__heading">${category}</h3>`;

            filterSubGroup.append(this[`${category}IconList`].element,
                                  this[`${category}FilterList`].element);
            return filterSubGroup;
        });

        this.element.append(...filterSubGroups);
    }

    performFiltering({target}){
        if(target.classList.contains('filter-item__option')){
            const filterElement = target.closest('.filter-item');
            const filter = this.filters.find(filter => filter.element === filterElement);

            if(this.isSortFilterSelected(filter)) this.resetSortFiltersStates();
            this.setFilterState(target, filter);
            this.userService.resetUsers();
            this.filterUsers();
            this.pageLinkList.performPagination();
        }
    }

    isSortFilterSelected(filter){
        return filter.category === 'sort';
    }

    resetSortFiltersStates(){
        this.sortFilters.forEach(filter => filter.resetState());
    }

    setFilterState(filterOptionElement, filter){
        filter.setState(filterOptionElement);
    }

    filterUsers(){
        this.filters.forEach(filter => filter.applyAccordingToState());
    }
}
