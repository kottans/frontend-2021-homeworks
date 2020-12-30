import searchFilterClasses from './search-filter-items.js';
import sortFilterClasses from './sort-filter-items.js';

import { FilterSubgroup } from './filter-subgroup.js';
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

        this.element.userService = userService;
        this.element.pageLinkList = pageLinkList;

        this.element.sortFilters = sortFilterClasses.map(Filter => new Filter(userService));
        this.element.searchFilters = searchFilterClasses.map(Filter => new Filter(userService));
        this.element.filters = [...this.element.sortFilters, ...this.element.searchFilters];

        this.element.sortFilterList = new FilterList(this.element.sortFilters, 'sort');
        this.element.searchFilterList = new FilterList(this.element.searchFilters, 'search');

        this.element.sortIconList= new IconList(this.element.sortFilters, this.element.sortFilterList, 'sort');
        this.element.searchIconList = new IconList(this.element.searchFilters, this.element.searchFilterList, 'search');

        this.element.append(
            new FilterSubgroup(this.element.sortIconList, this.element.sortFilterList, 'sort'),
            new FilterSubgroup(this.element.searchIconList, this.element.searchFilterList, 'search')
        );
    }

    defineElementMethods(){
        this.element.performFiltering = function({target}){
            if(target.classList.contains('filter-item__option')){
                const filter = target.closest('.filter-item');

                if(this.isSortFilterSelected(filter)) this.resetSortFiltersStates();
                this.changeFilterState(target, filter);
                this.userService.resetUsers();
                this.filterUsers();
                this.pageLinkList.performPagination();
            }
        };

        this.element.addEventListener('click', this.element.performFiltering);
        this.element.addEventListener('input', this.element.performFiltering);

        this.element.isSortFilterSelected = function(filter){
            return filter.classList.contains('sort-filter-item')
        };

        this.element.resetSortFiltersStates = function(){
            this.sortFilters.forEach(filter => filter.resetState());
        };

        this.element.changeFilterState = function(filterOption, filter){
            filter.changeState(filterOption);
        };

        this.element.filterUsers = function(){
            this.filters.forEach(filter => filter.filterUsersAccordingToState());
        };
    }
}
