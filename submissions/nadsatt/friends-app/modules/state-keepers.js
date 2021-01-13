import svgs from './svgs.js';

export class StateKeeper {
    constructor({optionsHTML, propertyToApplyStateBy, category, userService}){
        this.element = document.createElement('div');
        this.element.classList.add(
            'state-keeper', `${category}-state-keeper`
        );
        this.element.innerHTML =
            `${svgs[propertyToApplyStateBy]}
             <span class="state-keeper__name">
                ${propertyToApplyStateBy}
             </span>`;

        this.options = document.createElement('div');
        this.options.innerHTML =
            `${optionsHTML}
             <span class="option-group__option" data-state="none">
                ${svgs.none}
             </span>`;
        this.options.classList.add('option-group');

        this.propertyToApplyStateBy = propertyToApplyStateBy;
        this.category = category;
        this.userService = userService;
        this.defaultState = 'none';
        this.defaultOption = this.options.querySelector(
            `[data-state="${this.defaultState}"]`
        );
        this.state = this.defaultState;
        this.selectedOption = this.defaultOption;
        this.classNames = {
            opened: 'state-keeper--opened',
            selected: 'state-keeper--selected',
            selectedOption: 'option-group__option--selected'
        };
    }

    styleAsOpened(){
        this.element.classList.add(this.classNames.opened);
    }

    styleAsClosed(){
        this.element.classList.remove(this.classNames.opened);
    }

    selectState(option){
        this.styleAsNonSelected();
        this.updateOptionAndState(option);
        if(this.state !== this.defaultState) this.styleAsSelected();
    }

    styleAsNonSelected(){
        this.element.classList.remove(this.classNames.selected);
        this.selectedOption.classList.remove(this.classNames.selectedOption);
    }

    styleAsSelected(){
        this.element.classList.add(this.classNames.selected);
        this.selectedOption.classList.add(this.classNames.selectedOption);
    }

    updateOptionAndState(option){
        this.selectedOption = option;
        this.state = option.dataset.state;
    }

    applyState(){}
}

class SearchStateKeeper extends StateKeeper {
    constructor(args){
        const optionsHTML =
            `<input class="option-group__option search-option" type="text" data-state="search">`;
        super({optionsHTML, ...args});

        this.input = this.options.querySelector('input');
    }

    selectState(option){
        this.styleAsNonSelected();
        this.updateOptionAndState(option);

        if(this.state === this.defaultState){
            this.input.value = ''
        }
        else if(this.input.value){
            this.styleAsSelected();
        }
    }

    applyState(){
        if(this.state !== this.defaultState){
            this.applySearch(this.input.value);
        }
    }

    applySearch(value){
        let users = this.userService.users;
        users = users.filter(
            user => user[this.propertyToApplyStateBy].toLowerCase()
            .includes(value.toLowerCase())
        );
        this.userService.users = users;
    }
}

export class FilterStateKeeper extends StateKeeper {
    constructor({firstState, secondState, ...args}){
        const optionsHTML =
            `<span class="option-group__option" data-state="${firstState}">
                ${svgs[`${firstState}`]}
             </span>
             <span class="option-group__option" data-state="${secondState}">
                ${svgs[`${secondState}`]}
             </span>`;
        super({optionsHTML, ...args});
    }

    applyState(){
        if(this.state !== this.defaultState){
            this.applyFilter(this.state);
        }
    }

    applyFilter(value){
        let users = this.userService.users;
        users = this.userService.users.filter(
            user => user[this.propertyToApplyStateBy] === value
        );
        this.userService.users = users;
    }
}


class SortStateKeeper extends StateKeeper {
    constructor({ascSvg, descSvg, ascComparator, descComparator, ...args}){
        const optionsHTML =
            `<span class="option-group__option" data-state="asc">${ascSvg}</span>
             <span class="option-group__option" data-state="desc">${descSvg}</span>`;
        super({optionsHTML, ...args});

        this.ascComparator = ascComparator;
        this.descComparator = descComparator;
    }

    resetState(){
        this.selectState(this.defaultOption);
    }

    applyState(){
        if(this.state === 'asc'){
            this.applySort(this.ascComparator);
        }
        else if(this.state === 'desc'){
            this.applySort(this.descComparator);
        }
    }

    applySort(comparator){
        let users = this.userService.users;
        users.sort(comparator);
        this.userService.users = users;
    }
}

class StringSortStateKeeper extends SortStateKeeper {
    constructor(args){
        const ascComparator = (a, b) => a[this.propertyToApplyStateBy]
            .localeCompare(b[this.propertyToApplyStateBy]);

        const descComparator = (a, b) => b[this.propertyToApplyStateBy]
            .localeCompare(a[this.propertyToApplyStateBy]);

        super({ascSvg: svgs.ascString, descSvg: svgs.descString,
               ascComparator, descComparator, ...args});
    }
}

class NumberSortStateKeeper extends SortStateKeeper {
    constructor(args){
        const ascComparator = (a, b) =>
            a[this.propertyToApplyStateBy] - b[this.propertyToApplyStateBy];

        const descComparator = (a, b) =>
            b[this.propertyToApplyStateBy] - a[this.propertyToApplyStateBy];

        super({ascSvg: svgs.ascNumber, descSvg: svgs.descNumber,
               ascComparator, descComparator, ...args});
    }
}

export {
    SearchStateKeeper,
    StringSortStateKeeper,
    NumberSortStateKeeper
};
