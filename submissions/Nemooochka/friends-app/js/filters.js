import {Url} from "./url.js";

export class Filters {
    constructor(users, node) {
        this.users = users;
        this.node = node;
        this.filterByGenderText = 'filterByGender';
    }

    getCardsChildNodesArr() {
        let cardsChildNodes = this.node.childNodes;
        return [...cardsChildNodes];
    }

    activateFilterByGenderIcon(filterValue) {
        document.querySelector(`[filter-gender='${filterValue}']`).checked = true;
    }

    filterByName({target}) {
        let inputNameValue = target.value.toLowerCase();

        if (inputNameValue.length > 1) {
            this.users.map((elem, index) => {
                let userName = elem.name.first + ' ' + elem.name.last;
                userName = userName.toLowerCase();
                let currentCard = document.querySelector("[card-number='" + index + "']");
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
                let currentCard = document.querySelector("[card-number='" + index + "']");
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
            let filterValue = target.getAttribute('filter-gender');

            new Url().updUrl(this.filterByGenderText, filterValue);

            this.filterByGender(filterValue);
        }
    }

    sortByName({currentTarget}) {
        let cardsChildNodesArr = this.getCardsChildNodesArr();

        let sortedArr = cardsChildNodesArr.sort((a, b) => {
            let first = a.querySelector('.name-first').textContent;
            let second = b.querySelector('.name-first').textContent;

            if (currentTarget.classList.contains('down')) {
                if (first < second) return -1;
                else if (first > second) return 1;
                return 0;
            } else {
                if (first > second) return -1;
                else if (first < second) return 1;
                return 0;
            }
        });

        sortedArr.map((elem, index) => elem.style.order = index);

        currentTarget.classList.toggle('down');
        currentTarget.classList.add('active');
        document.querySelector('.sort-by_age').classList.remove('active');
    }

    sortByAge({currentTarget}) {
        let cardsChildNodesArr = this.getCardsChildNodesArr();

        let sortedArr = cardsChildNodesArr.sort((a, b) => {
            let first = a.querySelector('.age').textContent;
            let second = b.querySelector('.age').textContent;

            if (currentTarget.classList.contains('down')) {
                return first - second;
            } else {
                return second - first;
            }
        });

        sortedArr.map((elem, index) => elem.style.order = index);

        currentTarget.classList.toggle('down');
        currentTarget.classList.add('active');
        document.querySelector('.sort-by_name').classList.remove('active');
    }
}
