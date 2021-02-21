export class LoadingPage {
    constructor(program){
        this.element = document.createElement('div');
        this.element.classList.add('loading-page');
        this.element.innerHTML = `
            <div class="loading-info">Please wait until users will be loaded..</div>
            <div class="loading-roller">
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
                <div class="loading-roller__point"></div>
            </div>`;

        this.program = program;
        this.loadingMessage = 'Please wait until users will be loaded..';
        this.loadingInfo = this.element.querySelector('.loading-info');
        this.loadingRoller = this.element.querySelector('.loading-roller');
        this.reloadButton = document.createElement('button');
        this.reloadButton.classList.add('reload-button');
        this.reloadButton.textContent = 'Try again';
        this.reloadButton.addEventListener('click', () => this.handleReloadButtonClick());
    }

    handleReloadButtonClick(){
        this.displayLoading();
        this.program.getUsers();
    }

    displayLoading(){
        this.reloadButton.remove();
        this.loadingInfo.textContent = this.loadingMessage;
        this.element.append(this.loadingRoller);
    }

    displayLoadingError(errorMessage){
        this.loadingRoller.remove();
        this.loadingInfo.textContent = errorMessage;
        this.element.append(this.reloadButton);
    }

    remove(){
        this.element.remove();
    }
}
