import svgs from './svgs.js';

class Filter {
    constructor(optionsHTML, property, category, userService){
        this.element = document.createElement('li');
        this.element.innerHTML =
            `<div class="filter-item__options">
                ${optionsHTML}
                <span class="filter-item__option" data-state="none">${svgs.none}</span>
            </div>`;
        this.element.classList.add('filter-item', `${category}-filter-item`);

        this.property = property;
        this.category = category;
        this.name = `${property}-${category}`;
        this.userService = userService;
        this.defaultState = 'none';
        this.defaultOptionElement = this.element.querySelector(`[data-state="${this.defaultState}"]`);
        this.settedState = this.defaultState;
        this.activatedOptionElement = this.defaultOptionElement;
        this.classNames = {
            openedFilterElement: 'filter-item--opened',
            activatedOptionElement: 'filter-item__option--activated'
        };
    }

    open(){
        this.element.classList.add(this.classNames.openedFilterElement);
    }

    close(){
        this.element.classList.remove(this.classNames.openedFilterElement);
    }

    setState(optionElement){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(optionElement);
        if(this.settedState !== this.defaultState) this.activateOptionAndIcon();
    }

    applyAccordingToState(){
        if(this.settedState !== this.defaultState){
            this[`applyAccordingTo${this.getCapitalizedState(this.settedState)}State`]();
        }
    }

    deactivateOptionAndIcon(){
        this.activatedOptionElement.classList.remove(this.classNames.activatedOptionElement);
        this.icon.deactivate();
    }

    activateOptionAndIcon(){
        this.activatedOptionElement.classList.add(this.classNames.activatedOptionElement);
        this.icon.activate();
    }

    updateOptionAndState(optionElement){
        this.activatedOptionElement = optionElement;
        this.settedState = optionElement.dataset.state;
    }

    getCapitalizedState(state){
        return state[0].toUpperCase() + state.slice(1);
    }
}

class SearchFilter extends Filter {
    constructor(...args){
        const optionsHTML =
            `<input class="filter-item__option" type="text" data-state="search">`;
        super(optionsHTML, ...args);

        this.input = this.element.querySelector('input');
    }

    setState(optionElement){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(optionElement);

        if(this.settedState === this.defaultState) this.input.value = ''
        else if(this.input.value) this.activateOptionAndIcon();
    }

    applyAccordingToSearchState(){
        const value = this.input.value.toLowerCase();

        this.userService.users = this.userService.users.filter(user =>
            user[this.property].toLowerCase().includes(value)
        );
    }
}

class ToggleFilter extends Filter {
    constructor(firstState, secondState, ...args){
        const optionsHTML =
            `<span class="filter-item__option" data-state="${firstState}">${svgs[firstState]}</span>
             <span class="filter-item__option" data-state="${secondState}">${svgs[secondState]}</span>`;
        super(optionsHTML, ...args);

        this.firstState = firstState;
        this.secondState = secondState;
        this[`applyAccordingTo${this.getCapitalizedState(firstState)}State`] = this.applyAccordingToFirstState;
        this[`applyAccordingTo${this.getCapitalizedState(secondState)}State`] = this.applyAccordingToSecondState;
    }

    applyAccordingToFirstState(){
        this.userService.users = this.userService.users.filter(user =>
            user[this.property] === this.firstState
        );
    }

    applyAccordingToSecondState(){
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
        super(optionsHTML, ...args);
    }

    resetState(){
        this.setState(this.defaultOptionElement);
    }

    applyAccordingToAscState(){
        this.userService.users.sort(this.ascComparator.bind(this));
    };

    applyAccordingToDescState(){
        this.userService.users.sort(this.descComparator.bind(this));
    }
}

class StringSortFilter extends SortFilter {
    constructor(...args){
        super(svgs.ascString, svgs.descString, ...args);

        this.ascComparator = function(a, b){
            return a[this.property].localeCompare(b[this.property]);
        };

        this.descComparator = function(a, b){
            return b[this.property].localeCompare(a[this.property]);
        };
    }
}

class NumberSortFilter extends SortFilter {
    constructor(...args){
        super(svgs.ascNumber, svgs.descNumber, ...args);

        this.ascComparator = function(a, b){
            return a[this.property] - b[this.property];
        };

        this.descComparator = function(a, b){
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
