import {Cards} from "./cards.js";
import {Url} from "./url.js";
import {Filters} from "./filters.js";

const cardsWrapBlock = document.querySelector('.wrap-cards');

const urlData = 'https://randomuser.me/api/?results=20';
let users;
let filter;


(async () => {
    try {
        let response = await fetch(urlData);
        users = await response.json();
        users = users.results;

        new Cards(users, cardsWrapBlock);
        filter = new Filters(users, cardsWrapBlock);

        const url = new Url(users, cardsWrapBlock);
        url.checkUrl();
    } catch {
        cardsWrapBlock.innerHTML = `<div class="error">Ooops, something went wrong. Try to reload <i class="far fa-smile-beam"></i></div>`;
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    new Url().onPopStepUrl();

    document.querySelector('.filter-name').addEventListener('keyup', (event) => filter.filterByName(event));
    document.querySelector('.sorting-field').addEventListener('click', (event) => filter.sortBy(event));
    document.querySelector('.wrap-filter').addEventListener('click', (event) => filter.clickFilterByGender(event));
});
