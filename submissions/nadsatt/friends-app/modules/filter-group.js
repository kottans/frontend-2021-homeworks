import searchFilterClasses from './search-filter-items.js';
import sortFilterClasses from './sort-filter-items.js';

import { FilterSubgroup } from './filter.subgroup.js';
import { FilterList } from './filter-list.js';
import { IconList } from './icon-list.js';

export class FilterGroup {
    constructor(userService, pageLinkList){
        this.userService = userService;
        this.pageLinkList = pageLinkList;

        this.defineFilters();
        this.defineFilterLists();
        this.defineIconLists();

        this.defineElement();
        this.insertElement();
        this.defineElementEventHandlers();
    }

    defineFilters(){
        this.searchFilters = searchFilterClasses.map(filter => new filter(this.userService));
        this.sortFilters = sortFilterClasses.map(filter => new filter(this.userService));
        this.filters = [...this.searchFilters, ...this.sortFilters];
    }

    defineFilterLists(){
        this.sortFilterList = new FilterList(this.sortFilters, 'sort');
        this.searchFilterList = new FilterList(this.searchFilters, 'search');
    }

    defineIconLists(){
        this.sortIconList= new IconList(this.sortFilters, this.sortFilterList, 'sort');
        this.searchIconList = new IconList(this.searchFilters, this.searchFilterList, 'search');
    }

    defineElement(){
        this.element = document.createElement('div');
        this.element.classList.add('filter-group');
        this.element.append(
            new FilterSubgroup(this.sortIconList, this.sortFilterList, 'sort').element,
            new FilterSubgroup(this.searchIconList, this.searchFilterList, 'search').element
        );
    }

    insertElement(){
        document.querySelector('.filter-group-wrapper').append(this.element);
    }

    defineElementEventHandlers(){
        this.element.addEventListener('click', this.performFiltering.bind(this));
        this.element.addEventListener('input', this.performFiltering.bind(this));
    }

    performFiltering({target}){
        if(target.classList.contains('filter-item__option')){
            const filterOptionElement = target;

            if(this.checkIfSortFilterIsSelected(filterOptionElement)) this.resetSortFiltersStates();
            this.changeFilterState(filterOptionElement);
            this.resetFilteredUsers();
            this.filterUsers();
            this.pageLinkList.performPagination();
        }
    }

    checkIfSortFilterIsSelected(filterOptionElement){
        return filterOptionElement.parentElement.parentElement.classList.contains('sort-filter-item')
    }

    resetSortFiltersStates(){
        this.sortFilters.forEach(filter => filter.resetState());
    }

    changeFilterState(filterOptionElement){
        const filterElement = filterOptionElement.parentElement.parentElement;
        filterElement.instance.changeState(filterOptionElement);
    }

    resetFilteredUsers(){
        this.userService.resetUsers();
    }

    filterUsers(){
        this.filters.forEach(filter => filter.filterUsersAccordingToState());
    }
}
