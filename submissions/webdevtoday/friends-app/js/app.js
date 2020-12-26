import {Controller} from './Controller.js';
import { Route } from './Route.js';
import Cache from './components/Cache.js';

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    const mainContent = document.querySelector('.wrapper');

    const cache = new Cache();
    const controller = new Controller(mainContent, cache);
    const route = new Route(controller, {
        'home': 'Home',
    });

    function updatestate(state) {
        if (!state) return;
        history.pushState(state, '', state.page);
        if (state.page === '') {
            location.hash = '#home';
            route.to('home', state.params);
            return true;
        }
        location.hash = state.page;
        route.to(state.hash.slice(1), state.params);
        return true;
    };

    function makeStateFromHash(urlhash) {
        if (urlhash.indexOf('?')) {
            const [hash, params] = urlhash.split('?');
            return {page: urlhash, hash: hash, params: params}
        }
        return { page: urlhash, hash: urlhash, params: '' };
    }

    window.addEventListener('popstate', () => {
        const state = makeStateFromHash(location.hash);
        history.pushState(state, '', state.page);
        updatestate(state);
    });

    updatestate(makeStateFromHash(location.hash));
});
