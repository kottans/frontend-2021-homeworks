export class Route {
    constructor(controller, routes = {}) {
        this.controller = controller;
        this.routes = routes;
    }

    set(route, controller) {
        this.routes[route] = controller;
    }

    get(route) {
        return this.routes[route];
    }

    to(route) {
        this.controller.get( this.get(route) );
    }
}