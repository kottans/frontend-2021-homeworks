export class LoadingPage {
    constructor(program){
        this.defineElement();
        this.defineElementProperties(program);
        this.defineElementMethods();

        return this.element;
    }

    defineElement(){
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
    }

    defineElementProperties(program){
        this.element.program = program;
        this.element.loadingMessage = 'Please wait until users will be loaded..';

        this.element.loadingInfo = this.element.querySelector('.loading-info');
        this.element.loadingRoller = this.element.querySelector('.loading-roller');

        this.element.reloadButton = document.createElement('button');
        this.element.reloadButton.classList.add('reload-button');
        this.element.reloadButton.textContent = 'Try again';
    }

    defineElementMethods(){
        this.element.reloadButton.addEventListener('click', (function(){
            this.displayLoading();
            this.program.getUsers();
        }).bind(this.element));

        this.element.displayLoading = function(){
            this.reloadButton.remove();

            this.loadingInfo.textContent = this.loadingMessage;
            this.append(this.loadingRoller);
        };

        this.element.displayLoadingError = function(errorMessage){
            this.loadingRoller.remove();

            this.loadingInfo.textContent = errorMessage;
            this.append(this.reloadButton);
        };

        this.element.remove = function(){
            document.body.removeChild(this);
        };
    }
}
