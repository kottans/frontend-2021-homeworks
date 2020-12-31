import { UserNameSearchFilter,
         UserEmailSearchFilter,
         UserLocationSearchFilter,
         UserGenderToggleFilter } from './search-filter-items.js';

import { UserNameSortFilter,
         UserAgeSortFilter,
         UserLocationSortFilter,
         UserRegistrationSortFilter } from './sort-filter-items.js';

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
        this.element.classNames = {
            filterGroup: 'filter-group',
            filter: 'filter-item',
            sortFilter: 'sort-filter-item',
            option: 'filter-item__option'
        };
        this.element.classList.add(this.element.classNames.filterGroup);

        this.element.filterCategories = ['sort', 'search'];
        this.element.userService = userService;
        this.element.pageLinkList = pageLinkList;

        const searchFilterClasses = [UserNameSearchFilter, UserEmailSearchFilter,
                                     UserLocationSearchFilter, UserGenderToggleFilter];

        const sortFilterClasses = [UserNameSortFilter, UserAgeSortFilter,
                                   UserLocationSortFilter, UserRegistrationSortFilter];

        this.element.sortFilters = sortFilterClasses.map(Filter => new Filter(this.element.filterCategories[0], userService));
        this.element.searchFilters = searchFilterClasses.map(Filter => new Filter(this.element.filterCategories[1], userService));
        this.element.filters = [...this.element.sortFilters, ...this.element.searchFilters];

        this.element.sortFilterList = new FilterList(this.element.sortFilters, this.element.filterCategories[0]);
        this.element.searchFilterList = new FilterList(this.element.searchFilters, this.element.filterCategories[1]);

        this.element.sortIconList = new IconList(this.element.sortFilters, this.element.sortFilterList, this.element.filterCategories[0]);
        this.element.searchIconList = new IconList(this.element.searchFilters, this.element.searchFilterList, this.element.filterCategories[1]);

        this.element.append(
            new FilterSubgroup(this.element.sortIconList, this.element.sortFilterList, this.element.filterCategories[0]),
            new FilterSubgroup(this.element.searchIconList, this.element.searchFilterList, this.element.filterCategories[1])
        );
    }

    defineElementMethods(){
        this.element.performFiltering = function({target}){
            if(target.classList.contains(this.classNames.option)){
                const filter = target.closest(`.${this.classNames.filter}`);

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
            return filter.classList.contains(this.classNames.sortFilter);
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
