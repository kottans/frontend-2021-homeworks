import { getUsers } from './components/RandomUserAPI.js';
import { normalizeUsers } from './components/normalizeUsers.js';
import { makeCard } from './components/makeCard.js';
import { oops } from './components/oops.js';
import { makeForm } from './components/makeForm.js';
import { sortAndFiltersFunctions } from './components/sortAndFiltersFunctions.js';

let users = [];
const sortAndFiltersState = {
    // filters:
    age: null,
    name: null,
    gender: null,

    // sorts:
    sort: null,
};
const sidebar__container = document.getElementsByClassName('sidebar__container')[0];
const cards = document.getElementsByClassName('cards')[0];

function addListenerToResetButton() {
    document.querySelector('[type=reset]').addEventListener('click', () => {
        sortAndFiltersState.age = null;
        sortAndFiltersState.name = null;
        sortAndFiltersState.gender = null;
        sortAndFiltersState.sort = null;
        cards.innerHTML = '';
        cards.append( ...users.map(makeCard) );
    })
}

function addListenerToForm() {
    const form = document.forms.sortingAndFiltering;

    form.addEventListener('input', ({target}) => {
        if (sortAndFiltersState.hasOwnProperty(target.name)) {
            sortAndFiltersState[target.name] = target.value;
        }

        let copyUsers = [...users];

        for (let key in sortAndFiltersState) {
            if (sortAndFiltersState[key] === null) continue;

            if (key === 'sort') {
                copyUsers.sort(sortAndFiltersFunctions(sortAndFiltersState[key]));
            } else {
                copyUsers = copyUsers.filter(sortAndFiltersFunctions(key)(sortAndFiltersState[key]));
            }
        }

        cards.innerHTML = '';
        cards.append( ...copyUsers.map(makeCard) );

    });
}

function disableProloader() {
    document.getElementsByClassName('preloader')[0].style.display = 'none';
}
function unlockBody() {
    document.body.classList.remove('lock');
}

document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        getUsers()
            .then(res => res.json())
            .then(({results}) => {
                users = results.map(normalizeUsers);
                cards.append(...users.map(makeCard));
                sidebar__container.append(makeForm());
                addListenerToForm();
                addListenerToResetButton();
                disableProloader();
                unlockBody();
            })
            .catch(err => {
                cards.append(oops());
                disableProloader();
                console.log(err);
            });
    })();
});
