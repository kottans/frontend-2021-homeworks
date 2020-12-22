import svgs from './svgs.js';

class Filter {
    constructor(optionsHTML, category, property, userService){
        this.optionsHTML = optionsHTML;
        this.category = category;
        this.property = property;
        this.name = `${property}-${category}`;
        this.userService = userService;

        this.defineElement();
        this.linkElementWithInstance();

        this.activatedState = 'none';
        this.activatedOptionElement = this.element.querySelector(`[data-state="none"]`);
    }

    defineElement(){
        const innerHTML =
            `<div class="filter-item__options">
                ${this.optionsHTML}
                <span class="filter-item__option" data-state="none">${svgs.none}</span>
             </div>`;

        this.element = document.createElement('li');
        this.element.innerHTML = innerHTML;

        this.element.classList.add('filter-item', `${this.category}-filter-item`);
        this.element.setAttribute('data-current-state', 'none');
        this.element.setAttribute('data-filter-name', this.name);
    }

    linkElementWithInstance(){
        this.element.instance = this;
    }

    filterUsersAccordingToState(){
        if(this.activatedState !== 'none') this[this.activatedState]();
    }

    changeState(activatedOptionElement){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(activatedOptionElement);
        if(this.activatedState !== 'none') this.activateOptionAndIcon();
    }

    deactivateOptionAndIcon(){
        this.activatedOptionElement.classList.remove('filter-item__option--activated');
        this.iconElement.classList.remove('icon-item--activated');
    }

    activateOptionAndIcon(){
        this.activatedOptionElement.classList.add('filter-item__option--activated');
        this.iconElement.classList.add('icon-item--activated');
    }

    updateOptionAndState(activatedOptionElement){
        this.activatedOptionElement = activatedOptionElement;

        this.activatedState = activatedOptionElement.dataset.state;
        this.element.setAttribute('data-current-state', this.activatedState);
    }

    openElement(){
        this.element.classList.add('filter-item--opened');
    }

    closeElement(){
        this.element.classList.remove('filter-item--opened');
    }
}

class SearchFilter extends Filter {
    constructor(...args){
        const optionsHTML = `<input class="filter-item__option" type="text" data-state="search">`;
        super(optionsHTML, 'search', ...args);

        this.input = this.element.querySelector('input');
        this.span = this.element.querySelector('span');
        this.span.addEventListener('click', () => this.input.value = '');
    }

    search(){
        const value = this.input.value.toLowerCase();

        this.userService.users = this.userService.users.filter(user =>
            user[this.property].toLowerCase().includes(value)
        );
    }

    changeState(activatedOptionElement){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(activatedOptionElement);
        if(this.activatedState !== 'none' && this.input.value) this.activateOptionAndIcon();
    }
}

class ToggleFilter extends Filter {
    constructor(firstState, secondState, ...args){
        const optionsHTML =
            `<span class="filter-item__option" data-state="state1">${svgs[firstState]}</span>
             <span class="filter-item__option" data-state="state2">${svgs[secondState]}</span>`;
        const category = 'search';

        super(optionsHTML, category, ...args);

        this.firstState = firstState;
        this.secondState = secondState;
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
    constructor(ascComparator, descComparator, ascSvg, descSvg, ...args){
        const optionsHTML =
            `<span class="filter-item__option" data-state="asc">${ascSvg}</span>
             <span class="filter-item__option" data-state="desc">${descSvg}</span>`;
        const category = 'sort';

        super(optionsHTML, category, ...args);

        this.ascComparator = ascComparator;
        this.descComparator = descComparator;
    }

    resetState(){
        this.changeState(this.element.querySelector(`.filter-item__option[data-state="none"]`));
    }

    asc(){
        this.userService.users.sort(this.ascComparator);
    }

    desc(){
        this.userService.users.sort(this.descComparator);
    }
}

class StringSortFilter extends SortFilter {
    constructor(...args){
        const ascComparator = (a, b) => a[this.property].localeCompare(b[this.property]),
              descComparator = (a, b) => b[this.property].localeCompare(a[this.property]);

        super(ascComparator, descComparator, svgs.ascString, svgs.descString, ...args);
    }
}

class NumberSortFilter extends SortFilter {
    constructor(...args){
        const ascComparator = (a, b) => a[this.property] - b[this.property],
              descComparator = (a, b) => b[this.property] - a[this.property];

        super(ascComparator, descComparator, svgs.ascNumber, svgs.descNumber, ...args);
    }
}

export {
    SearchFilter,
    ToggleFilter,
    NumberSortFilter,
    StringSortFilter
};
