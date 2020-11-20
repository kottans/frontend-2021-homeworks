import {Controller} from './Controller.js';
import {Route} from './Route.js';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    const navRoutes = document.querySelector('[data-type="routes"]');
    const mainContent = document.querySelector('main');

    const controller = new Controller(mainContent);
    const route = new Route(controller, {
        'home': 'Home',
        'about': 'About',
    });

    function updatestate (state) {
        if (!state) return;
        if (state.page === '') route.to('home');
        route.to(state.page.slice(1))
    };

    window.addEventListener('hashchange', () => {
        const state = {
            page: location.hash
        };
        history.pushState(state, '', state.page);
        updatestate(state);
    });
    
    window.addEventListener('popstate', (e) => {
        updatestate(e.state);
    });

    updatestate({page: location.hash});
});