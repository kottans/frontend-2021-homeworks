import {Filters} from "./filters.js";

export class Url {
    constructor(users, node) {
        this.users = users;
        this.node = node;
        this.filter = new Filters(this.users, this.node);
    }

    updUrl(filterName, value) {
        const parsedUrl = new URL(window.location.href);
        parsedUrl.searchParams.set(filterName, value);

        window.history.pushState(filterName,
            null, parsedUrl);
    }

    checkUrl() {
        const parsedUrl = new URL(window.location.href);
        const state = window.history.state;
        const filterByGenderText = this.filter.filterByGenderText;
        if (state === filterByGenderText) {
            this.filter.filterByGender(parsedUrl.searchParams.get(filterByGenderText));
        } else {
            this.updUrl(filterByGenderText, 'all');
            this.filter.activateFilterByGenderIcon('all');
        }
    }

    onPopStepUrl() {
        window.onpopstate = function () {
            checkUrl();
        };
    }
}
