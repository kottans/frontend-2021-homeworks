import {Url} from "./url.js";

export class Filters {
    constructor(users, node) {
        this.users = users;
        this.node = node;
        this.filterByGenderText = 'filterByGender';

        this.activateFilterByGenderIcon = function(filterValue) {
            document.querySelector(`[filter-gender='${filterValue}']`).checked = true;
        }
    }

    getCardsChildNodesArr() {
        const cardsChildNodes = this.node.childNodes;
        return [...cardsChildNodes];
    }

    filterByName({target}) {
        const inputNameValue = target.value.toLowerCase();

        if (inputNameValue.length > 1) {
            this.users.map((elem, index) => {
                const userName = `${elem.name.first} ${elem.name.last}`.toLowerCase();
                const currentCard = document.querySelector("[data-card-number='" + index + "']");
                if (!userName.includes(inputNameValue)) {
                    currentCard.classList.add('hidden-by-name');
                } else {
                    currentCard.classList.remove('hidden-by-name');
                }
            });
        } else {
            const cardsArray = Array.from(this.node.childNodes);
            cardsArray.map(elem => elem.classList.remove('hidden-by-name'));
        }
    }

    filterByGender(filterValue) {
        this.activateFilterByGenderIcon(filterValue);
        if (filterValue === 'all') {
            let cardsChildNodesArr = this.getCardsChildNodesArr();
            cardsChildNodesArr.map(elem => elem.classList.remove('hidden'));
        } else {
            this.users.map((elem, index) => {
                const currentCard = document.querySelector("[data-card-number='" + index + "']");
                if (elem.gender !== filterValue) {
                    currentCard.classList.add('hidden');
                } else {
                    currentCard.classList.remove('hidden');
                }
            });
        }
    }

    clickFilterByGender({target}) {
        if (target.classList.contains('filter-gender')) {
            const filterValue = target.getAttribute('filter-gender');

            new Url().updUrl(this.filterByGenderText, filterValue);

            this.filterByGender(filterValue);
        }
    }

    sortBy({target}) {
        const sortByToggle = target.closest('.sort-by');
        if (sortByToggle.classList.contains('sort-by')) {
            const cardsChildNodesArr = this.getCardsChildNodesArr();
            const sortedByName = sortByToggle.classList.contains('sort-by_name');
            const elemSortByAge = document.querySelector('.sort-by_age');
            const elemSortByName = document.querySelector('.sort-by_name');
            let sortedArr;

            sortedArr = cardsChildNodesArr.sort((a, b) => {
                if (sortedByName) {
                    let first = a.querySelector('.name-first').textContent;
                    let second = b.querySelector('.name-first').textContent;

                    if (sortByToggle.classList.contains('down')) {
                        if (first < second) return -1;
                        else if (first > second) return 1;
                        return 0;
                    } else {
                        if (first > second) return -1;
                        else if (first < second) return 1;
                        return 0;
                    }
                } else {
                    let first = a.querySelector('.age').textContent;
                    let second = b.querySelector('.age').textContent;

                    if (sortByToggle.classList.contains('down')) {
                        return first - second;
                    } else {
                        return second - first;
                    }
                }
            });

            sortedArr.map((elem, index) => elem.style.order = index);

            sortByToggle.classList.toggle('down');
            sortByToggle.classList.add('active');

            if (sortedByName) {
                elemSortByAge.classList.remove('active');
            } else {
                elemSortByName.classList.remove('active');
            }
        }
    }
}
