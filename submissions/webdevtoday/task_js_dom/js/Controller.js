import {Render} from './Render.js';

export class Controller {
    constructor(root) {
        this.root = root;
        this.render = new Render( this.root );
    }

    get(controllerName) {
        if (!controllerName) {
            this.render.render( `<h1>404 Page Not Found</h1>` );
            return false;
        }
        controllerName = controllerName[0].toUpperCase() + controllerName.slice(1).toLowerCase();
        import(`./controllers/${controllerName}Controller.js`)
            .then(controller => {
                console.log('then');
                const content = new controller.default();
                this.render.render(content.get());
            })
            .catch(err => {
                console.log('catch');
                console.log(err);
                this.render.render( `<h1>404 Page Not Found</h1>` );
            });
    }
}