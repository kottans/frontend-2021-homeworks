export class StateKeeperSubGroup{
    constructor(stateKeepers){
        const category = stateKeepers[0].category;
        const stateKeeperList = document.createElement('ul');
        const stateKeeperItems = stateKeepers.map(stateKeeper => {
            const stateKeeperItem = document.createElement('li');
            stateKeeperItem.classList.add('state-keeper-item');
            stateKeeperItem.append(stateKeeper.element);

            return stateKeeperItem;
        });

        stateKeeperList.append(...stateKeeperItems);
        stateKeeperList.classList.add(
            `state-keeper-list`, `${category}-state-keeper-list`
        );
        stateKeeperList.addEventListener('click',
            e => this.handleStateKeeperOpening(e)
        );

        this.element = document.createElement('div');
        this.element.classList.add('state-keeper-subgroup');
        this.element.insertAdjacentHTML(
            'afterbegin', `<h3 class="subgroup-heading">${category}</h3>`
        );
        this.optionsWrapper = document.createElement('div');
        this.optionsWrapper.classList.add(
            `options-wrapper`, `${category}-options-wrapper`
        );
        this.element.append(stateKeeperList, this.optionsWrapper);

        this.stateKeepers = stateKeepers;
        this.category = category;
        this.openedStateKeeper = null;
        this.optionsWrapperClosingTime = 300;
        this.openedOptionsWrapperClass = 'options-wrapper--opened';
    }

    handleStateKeeperOpening({target}){
        if(target.classList.contains(`${this.category}-state-keeper`)){
            const stateKeeper = this.stateKeepers.find(stateKeeper =>
                stateKeeper.element === target);

            if(!this.openedStateKeeper){
                stateKeeper.styleAsOpened();
                this.openOptions(stateKeeper);
            }
            else if(stateKeeper === this.openedStateKeeper){
                stateKeeper.styleAsClosed();
                this.closeOptions();
            }
            else {
                this.stateKeepers.forEach(
                    stateKeeper => stateKeeper.styleAsClosed()
                );
                stateKeeper.styleAsOpened();
                this.changeOptions(stateKeeper);
            }
        }
    }

    openOptions(stateKeeper){
        this.optionsWrapper.classList.add(this.openedOptionsWrapperClass);
        this.optionsWrapper.append(stateKeeper.options);
        this.openedStateKeeper = stateKeeper;
    }

    closeOptions(){
        this.optionsWrapper.classList.remove(this.openedOptionsWrapperClass);
        setTimeout(
            () => this.optionsWrapper.textContent = '',
            this.optionsWrapperClosingTime
        );
        this.openedStateKeeper = null;
    }

    changeOptions(stateKeeper){
        this.optionsWrapper.replaceChild(
            stateKeeper.options,
            this.openedStateKeeper.options
        );
        this.openedStateKeeper = stateKeeper;
    }
}
