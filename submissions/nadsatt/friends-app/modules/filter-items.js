import svgs from './svgs.js';

class Filter {
    constructor(...args){
        this.defineElement(...args);
        this.defineElementMethods();
    }

    defineElement(optionsHTML, property, category, userService){
        this.element = document.createElement('li');
        this.element.innerHTML =
            `<div class="filter-item__options">
                ${optionsHTML}
                <span class="filter-item__option" data-state="none">${svgs.none}</span>
            </div>`;
        this.element.classList.add('filter-item', `${category}-filter-item`);

        this.element.classNames = {
            openedFilter: 'filter-item--opened',
            activatedOption: 'filter-item__option--activated'
        };

        this.element.property = property;
        this.element.category = category;
        this.element.name = `${property}-${category}`;
        this.element.userService = userService;

        this.element.defaultState = 'none';
        this.element.defaultOption = this.element.querySelector(`[data-state="${this.element.defaultState}"]`);
        this.element.settedState = this.element.defaultState;
        this.element.activatedOption = this.element.defaultOption;
    }

    defineElementMethods(){
        // copy methods to avoid methods duplication in different instances
        this.element.open = this.open;
        this.element.close = this.close;
        this.element.setState = this.setState;
        this.element.applyAccordingToState = this.applyAccordingToState;
        this.element.deactivateOptionAndIcon = this.deactivateOptionAndIcon;
        this.element.activateOptionAndIcon = this.activateOptionAndIcon;
        this.element.updateOptionAndState = this.updateOptionAndState;
        this.element.getCapitalizedState = this.getCapitalizedState;
    }

    open(){
        this.classList.add(this.classNames.openedFilter);
    }

    close(){
        this.classList.remove(this.classNames.openedFilter);
    }

    setState(option){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(option);
        if(this.settedState !== this.defaultState) this.activateOptionAndIcon();
    }

    applyAccordingToState(){
        if(this.settedState !== this.defaultState){
            this[`applyAccordingTo${this.getCapitalizedState(this.settedState)}State`]();
        }
    }

    deactivateOptionAndIcon(){
        this.activatedOption.classList.remove(this.classNames.activatedOption);
        this.icon.deactivate();
    }

    activateOptionAndIcon(){
        this.activatedOption.classList.add(this.classNames.activatedOption);
        this.icon.activate();
    }

    updateOptionAndState(option){
        this.activatedOption = option;
        this.settedState = option.dataset.state;
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

        this.element.input = this.element.querySelector('input');
        this.element.setState = this.setState;
        this.element.applyAccordingToSearchState = this.applyAccordingToSearchState;
    }

    setState(option){
        this.deactivateOptionAndIcon();
        this.updateOptionAndState(option);

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

        this.element.firstState = firstState;
        this.element.secondState = secondState;
        this.element[`applyAccordingTo${this.getCapitalizedState(firstState)}State`] = this.applyAccordingToFirstState;
        this.element[`applyAccordingTo${this.getCapitalizedState(secondState)}State`] = this.applyAccordingToSecondState;
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

        this.element.resetState = this.resetState;
        this.element.applyAccordingToAscState = this.applyAccordingToAscState;
        this.element.applyAccordingToDescState = this.applyAccordingToDescState;
    }

    resetState(){
        this.setState(this.defaultOption);
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
