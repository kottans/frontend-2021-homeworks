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

    convertParamsToArray(params) {
        if (params === '') return '';

        let res = params;
        
        if (res.indexOf('?') === 0) res = res.slice(1);

        if (res.indexOf('&')) res = res.split('&');

        return res.reduce((acc, p) => {
            if (p.indexOf('=')) {
                const [k, v] = p.split('=');
                acc[k] = v;
                return acc;
            }
        }, {});
    }

    to(route, params = '') {
        this.controller.get( this.get(route), this.convertParamsToArray(params) );
    }
}

