import * as searchStateKeeperModule from './search-state-keepers.js';
import * as sortStateKeeperModule from './sort-state-keepers.js';
import { StateKeeperSubGroup } from './state-keeper-subgroup.js';

export class StateKeeperGroup {
    constructor(userService, pageLinkList){
        const sortStateKeeperClasses = Object.values(sortStateKeeperModule);
        const searchStateKeeperClasses = Object.values(searchStateKeeperModule);

        this.userService = userService;
        this.pageLinkList = pageLinkList;

        this.element = document.createElement('div');
        this.element.classList.add('state-keeper-group');
        this.element.addEventListener('click',
            e => this.handleStateKeeperStateSelection(e)
        );
        this.element.addEventListener('input',
            e => this.handleStateKeeperStateSelection(e)
        );

        this.sortStateKeepers = sortStateKeeperClasses.map(
            StateKeeperClass => new StateKeeperClass(userService)
        );
        this.searchStateKeepers = searchStateKeeperClasses.map(
            StateKeeperClass => new StateKeeperClass(userService)
        );
        this.stateKeepers = this.sortStateKeepers
            .concat(this.searchStateKeepers);

        this.sortStateKeeperSubGroup = new StateKeeperSubGroup(
            this.sortStateKeepers
        );
        this.searchStateKeeperSubGroup = new StateKeeperSubGroup(
            this.searchStateKeepers
        );
        this.element.append(
            this.sortStateKeeperSubGroup.element,
            this.searchStateKeeperSubGroup.element
        );
    }

    handleStateKeeperStateSelection({target}){
        if(target.classList.contains('option-group__option')){
            const options = target.closest('.option-group');
            const stateKeeper = this.stateKeepers.find(
                stateKeeper => stateKeeper.options === options
            );

            if(this.isSortStateKeeper(stateKeeper)){
                this.resetSortStateKeepersStates();
            }

            stateKeeper.selectState(target);
            this.userService.resetUsers();
            this.applyStateKeepersStates();
            this.pageLinkList.performPagination();
        }
    }

    isSortStateKeeper(stateKeeper){
        return stateKeeper.category === 'sort';
    }

    resetSortStateKeepersStates(){
        this.sortStateKeepers.forEach(stateKeeper =>
            stateKeeper.resetState());
    }

    applyStateKeepersStates(){
        this.stateKeepers.forEach(stateKeeper =>
            stateKeeper.applyState());
    }
}
