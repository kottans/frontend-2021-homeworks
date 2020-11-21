import {Render} from './Render.js';

export class Controller {
    constructor(root) {
        this.root = root;
        this.renderInstance = new Render( this.root );
    }

    get(controllerName) {
        if (!controllerName) {
            this.renderInstance.render( `<h1>404 Page Not Found</h1>` );
            return false;
        }
        const firstUpperCaseLetter = controllerName[0].toUpperCase();
        const restLowerCaseLetters = controllerName.slice(1).toLowerCase();
        const firstPartControllerName = firstUpperCaseLetter + restLowerCaseLetters;
        import(`./controllers/${firstPartControllerName}Controller.js`)
            .then(controller => {
                const content = new controller.default();
                this.renderInstance.render(content.get());
            })
            .catch(err => {
                console.log('catch');
                console.log(err);
                this.renderInstance.render( `<h1>404 Page Not Found</h1>` );
            });
    }
}

