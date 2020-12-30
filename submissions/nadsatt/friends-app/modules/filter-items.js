import svgs from './svgs.js';

class Filter {
    constructor(optionsHTML, category, property, userService){
        this.defineElement(optionsHTML);
        this.defineElementProperties(category, property, userService);
        this.defineElementMethods();
    }

    defineElement(optionsHTML){
        this.element = document.createElement('li');
        this.element.innerHTML =
            `<div class="filter-item__options">
                ${optionsHTML}
                <span class="filter-item__option" data-state="none">${svgs.none}</span>
            </div>`;
    }

    defineElementProperties(category, property, userService){
        this.element.category = category;
        this.element.property = property;
        this.element.name = `${property}-${category}`;
        this.element.userService = userService;

        this.element.defaultState = 'none';
        this.element.state = this.element.defaultState;
        this.element.defaultOption = this.element.querySelector(`[data-state="none"]`);
        this.element.activatedOption = this.element.defaultOption;

        this.element.classList.add('filter-item', `${this.element.category}-filter-item`);
    }

    defineElementMethods(){
        // copy methods to avoid methods duplication in different instances
        this.element.filterUsersAccordingToState = this.filterUsersAccordingToState;
        this.element.changeState = this.changeState;
        this.element.deactivateOptionAndIcon = this.deactivateOptionAndIcon;
        this.element.activateOptionAndIcon = this.activateOptionAndIcon;
        this.element.updateOptionAndState = this.updateOptionAndState;
        this.element.open = this.open;
        this.element.close = this.close;
    }

    filterUsersAccordingToState(){
        if(this.state !== this.defaultState) this[this.state]();
    }

    changeState(activatedOption){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(activatedOption);
        if(this.state !== this.defaultState) this.activateOptionAndIcon();
    }

    deactivateOptionAndIcon(){
        this.activatedOption.classList.remove('filter-item__option--activated');
        this.icon.classList.remove('icon-item--activated');
    }

    activateOptionAndIcon(){
        this.activatedOption.classList.add('filter-item__option--activated');
        this.icon.classList.add('icon-item--activated');
    }

    updateOptionAndState(activatedOption){
        this.activatedOption = activatedOption;
        this.state = activatedOption.dataset.state;
    }

    open(){
        this.classList.add('filter-item--opened');
    }

    close(){
        this.classList.remove('filter-item--opened');
    }
}

class SearchFilter extends Filter {
    constructor(...args){
        const optionsHTML = `<input class="filter-item__option" type="text" data-state="search">`;
        const category = 'search';
        super(optionsHTML, category, ...args);

        this.element.input = this.element.querySelector('input');

        this.element.search = this.search;
        this.element.changeState = this.changeState;
        this.element.resetInput = this.resetInput;
    }

    search(){
        const value = this.input.value.toLowerCase();

        this.userService.users = this.userService.users.filter(user =>
            user[this.property].toLowerCase().includes(value)
        );
    }

    changeState(activatedOption){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(activatedOption);

        if(this.state === this.defaultState) this.resetInput();
        else if(this.input.value) this.activateOptionAndIcon();
    }

    resetInput(){
        this.input.value = ''
    }
}

class ToggleFilter extends Filter {
    constructor(firstState, secondState, ...args){
        const optionsHTML =
            `<span class="filter-item__option" data-state="state1">${svgs[firstState]}</span>
             <span class="filter-item__option" data-state="state2">${svgs[secondState]}</span>`;
        const category = 'search';
        super(optionsHTML, category, ...args);

        this.element.firstState = firstState;
        this.element.secondState = secondState;

        this.element.state1 = this.state1;
        this.element.state2 = this.state2;
    }

    state1(){
        this.userService.users = this.userService.users.filter(user =>
            user[this.property] === this.firstState
        );
    }

    state2(){
        this.userService.users = this.userService.users.filter(user =>
            user[this.property] === this.secondState
        );
    }
}

class SortFilter extends Filter {
    constructor(ascSvg, descSvg, ...args){
        const optionsHTML =
            `<span class="filter-item__option" data-state="asc">${ascSvg}</span>
             <span class="filter-item__option" data-state="desc">${descSvg}</span>`;
        const category = 'sort';
        super(optionsHTML, category, ...args);

        this.element.resetState = this.resetState;
        this.element.asc = this.asc;
        this.element.desc = this.desc;
    }

    resetState(){
        this.changeState(this.defaultOption);
    }

    asc(){
        this.userService.users.sort(this.ascComparator.bind(this));
    };

    desc(){
        this.userService.users.sort(this.descComparator.bind(this));
    }
}

class StringSortFilter extends SortFilter {
    constructor(...args){
        super(svgs.ascString, svgs.descString, ...args);

        this.element.ascComparator = function(a, b){
            return a[this.property].localeCompare(b[this.property]);
        };

        this.element.descComparator = function(a, b){
            return b[this.property].localeCompare(a[this.property]);
        };
    }
}

class NumberSortFilter extends SortFilter {
    constructor(...args){
        super(svgs.ascNumber, svgs.descNumber, ...args);

        this.element.ascComparator = function(a, b){
            return a[this.property] - b[this.property];
        };

        this.element.descComparator = function(a, b){
            return b[this.property] - a[this.property];
        };
    }
}

export {
    SearchFilter,
    ToggleFilter,
    NumberSortFilter,
    StringSortFilter
};
