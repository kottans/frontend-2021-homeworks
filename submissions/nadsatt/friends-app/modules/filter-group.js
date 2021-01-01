import * as searchFilterClasses from './search-filter-items.js';
import * as sortFilterClasses from './sort-filter-items.js';
import { FilterList } from './filter-list.js';
import { IconList } from './icon-list.js';

export class FilterGroup {
    constructor(userService, pageLinkList){
        this.defineElement(userService, pageLinkList);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(userService, pageLinkList){
        this.element = document.createElement('div');
        this.element.classList.add('filter-group');

        const categories = ['sort', 'search'];
        this.element.userService = userService;
        this.element.pageLinkList = pageLinkList;

        this.sortFilterClasses = Object.values(sortFilterClasses);
        this.searchFilterClasses = Object.values(searchFilterClasses);

        [this.element[`${categories[0]}Filters`],
         this.element[`${categories[1]}Filters`]] = categories.map(category =>
            this[`${category}FilterClasses`]
                .map(FilterClass => new FilterClass(category, userService))
        );

        this.element.filters = [...this.element.sortFilters,
                                ...this.element.searchFilters];

        [this.element[`${categories[0]}FilterList`],
         this.element[`${categories[1]}FilterList`]] = categories.map(category =>
            new FilterList(this.element[`${category}Filters`], category)
        );

        [this.element[`${categories[0]}IconList`],
         this.element[`${categories[1]}IconList`]] = categories.map(category =>
            new IconList(this.element[`${category}FilterList`], category)
        );

        this.element.append(...categories.map(category => {
            const filterSubGroup = document.createElement('div');
            filterSubGroup.classList.add(`${category}-filter-subgroup`);
            filterSubGroup.innerHTML = `<h3 class="filter-subgroup__heading">${categories[0]}</h3>`;

            filterSubGroup.append(this.element[`${category}IconList`],
                                  this.element[`${category}FilterList`]);
            return filterSubGroup;
        }));
    }

    defineElementMethods(){
        this.element.performFiltering = function({target}){
            if(target.classList.contains('filter-item__option')){
                const filter = target.closest('.filter-item');

                if(this.isSortFilterSelected(filter)) this.resetSortFiltersStates();
                this.setFilterState(target, filter);
                this.userService.resetUsers();
                this.filterUsers();
                this.pageLinkList.performPagination();
            }
        };

        this.element.addEventListener('click', this.element.performFiltering);
        this.element.addEventListener('input', this.element.performFiltering);

        this.element.isSortFilterSelected = function(filter){
            return filter.classList.contains('sort-filter-item');
        };

        this.element.resetSortFiltersStates = function(){
            this.sortFilters.forEach(filter => filter.resetState());
        };

        this.element.setFilterState = function(filterOption, filter){
            filter.setState(filterOption);
        };

        this.element.filterUsers = function(){
            this.filters.forEach(filter => filter.applyAccordingToState());
        };
    }
}
