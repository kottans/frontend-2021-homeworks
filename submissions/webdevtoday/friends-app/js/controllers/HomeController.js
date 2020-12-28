import {RandomUserAPI} from '../components/RandomUserAPI.js';
import {sortUsers} from '../components/sortUsers.js';
import {filterUsers} from '../components/filterUsers.js';

export default class {
    constructor(params, cacheInstance) {
        this.params = params;
        this.cache = cacheInstance;
        this.ruapi = new RandomUserAPI({
            'main_url': 'https://randomuser.me/api/',
            'params': [
                {'key': 'inc', 'value': 'gender,name,location,email,registered,dob,picture,phone'},
                { 'key': 'noinfo', 'value': '' },
                // максимальное значение выборки 5000,
                // но стоит запрашивать информацию постранично
                // при очень большём значении наблюдаються значительные паузы и
                // часто сервер отвечает 503 ошибкой
                // логичней всего было бы производить сортировку на сервере,
                // чтобы изначально получать отсортированные данные
                {'key': 'results', 'value': '100'},
                {'key': 'seed', 'value': 'msfa'},
            ],
        });
    }

    formatDate(date) {
        return date.toLocaleString('en-US', {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        });
    }

    makeCard(user) {
        return `
            <div class="card">
                <div class="card__container">
                    <div class="card__title">
                        <h3 class="text-overflow">${user.name.first} ${user.name.last}</h3>
                    </div>
                    <div class="card__img">
                        <img src="${user.picture.large}" alt="${user.name.first} ${user.name.last}">
                    </div>
                    <div class="card__info">
                        <div class="card__age card__info--field">I have ${user.dob.age} years old.</div>
                        <div class="card__email card__info--field text-overflow" title="${user.email}">${user.email}</div>
                        <div class="card__phone card__info--field">${user.phone}</div>
                        <div class="card__city card__info--field">${user.location.city}</div>
                        <div class="card__registered card__info--field">${this.formatDate(new Date(user.registered.date))}</div>
                        <div class="card__gender card__info--field">${user.gender}</div>
                    </div>
                </div>
            </div>
        `;
    }

    makeCards(users) {
        let cards = '';
        users.forEach(user => {
            cards += this.makeCard(user);
        });
        return `<div class="cards">${cards}</div>`;
    }

    makeRadioButton(name, value, checked = false) {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = name;
        radio.value = value;
        radio.checked = checked;
        return radio;
    }

    makeForm() {
        const form = document.createElement('form');
        form.className = 'aside__form form';
        const radioButtons = ['age,a-z', 'age,z-a', 'name,a-z', 'name,z-a', 'registered,a-z', 'registered,z-a'].map(v => {
            const label = document.createElement('label');
            label.className = 'form__label label';
            label.textContent = v.toUpperCase();
            let checked = false;
            if (location.hash.indexOf(v) !== -1) checked = true;
            label.append(this.makeRadioButton('sort', v, checked));
            return label;
        });
        const textInputs = ['name', 'age', 'email', 'location'].map(v => {
            let textValue = '';
            if (this.params.filters && this.params.filters.indexOf(v) !== -1) {
                textValue = this.params.filters.split(';').reduce((acc, str) => {
                    if (str === "") return acc;
                    const [k, v] = str.split(',');
                    acc[k] = v;
                    return acc;
                }, {})[v];
            }
            return this.makeInput('text', 'filter', `Filter by ${v}`, v, textValue, 'form__input');
        });
        form.append(...radioButtons);
        form.append(...textInputs);
        form.addEventListener('change', this.formChangeListener);
        return form;
    }

    formChangeListener(e) {
        // Работает с хешем адресной строки
        // Нужно придумать, как перенести логику работы с адресной строкой в роутер
        if (e.target.name === 'sort') {
            if (location.hash.indexOf('?') !== -1) {
                if (location.hash.indexOf('sort') !== -1) {
                    let [first, last] = location.hash.split('?');
                    if (last.indexOf('&') !== -1) {
                        let parts = last.split('&');
                        parts.forEach((elem, i) => {
                            if (elem.indexOf('sort') !== -1) {
                                parts[i] = `sort=${e.target.value}`;
                            }
                        });
                        parts = parts.join('&');
                        location.hash = `${first}?${parts}`;
                    } else {
                        location.hash = `${first}?sort=${e.target.value}`;
                    }
                } else {
                    location.hash += `&sort=${e.target.value}`;
                }
            } else {
                location.hash += `?sort=${e.target.value}`;
            }
        }

        else if (e.target.name === 'filter') {
            if (location.hash.indexOf('?') !== -1) {
                if (location.hash.indexOf('filters') > -1) {
                    if (location.hash.indexOf(e.target.dataset.filter) && location.hash.lastIndexOf(e.target.dataset.filter) > location.hash.indexOf('filters')) {
                        let [f, l] = location.hash.split('filters=');
                        let filtersParams = l.split(';');
                        let result = filtersParams.reduce((acc, p) => {
                            if (p.indexOf(e.target.dataset.filter) > -1) {
                                acc.push(`${e.target.dataset.filter},${e.target.value}`);
                                return acc;
                            }
                            if (p !== '') {
                                acc.push(p);
                                return acc;
                            }
                            return acc;
                        }, []);
                        result = result.join(';') + ';';
                        location.hash = [f, result].join('filters=');
                    } else {
                        let str = location.hash.split('filters=');
                        str[1] += `${e.target.dataset.filter},${e.target.value};`;
                        str = str.join('filters=');
                        location.hash = str;
                    }
                } else {
                    location.hash += `&filters=${e.target.dataset.filter},${e.target.value};`;
                }
            } else {
                location.hash += `?filters=${e.target.dataset.filter},${e.target.value};`;
            }
        }

    }

    makeInput(type, name, placeholder, filter, value = '', classNames = '') {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.dataset.filter = filter;
        input.value = value;
        input.className = classNames;
        return input;
    }

    makeAside() {
        const aside = document.createElement('aside');
        aside.className = 'wrapper__aside aside';

        aside.append(this.makeForm());

        aside.insertAdjacentHTML('beforeend', '<a href="#home" class="aside__reset-link">RESET</a>');

        return aside;
    }

    makeOpenCloseAsideButton() {
        const div = document.createDocumentFragment();

        const cbx = document.createElement('input');
        cbx.type = 'checkbox';
        cbx.id = 'cbx';

        const lb = document.createElement('label');
        lb.innerHTML = 'Sort & Filter';
        lb.className = 'cbxLabel';
        lb.setAttribute('for', 'cbx');

        div.append(cbx, lb);
        return div;
    }

    async get() {
        let res = [];
        if (this.cache.check('apireq')) res = this.cache.get('apireq');
        else {
            ({ results: res } = await this.ruapi.getUsersPromise());
            this.cache.set('apireq', res);
        }

        if (this.params.filters) {
            res = filterUsers(this.params.filters, res);
        }

        if (this.params.sort) {
            sortUsers(this.params.sort, res);
        }

        const content = document.createDocumentFragment();

        const main = document.createElement('main');
        main.className = 'wrapper__main main';
        main.innerHTML = `<span>Найдено результатов: ${res.length}</span>`;
        main.innerHTML += this.makeCards(res);

        const aside = this.makeAside();
        content.append( this.makeOpenCloseAsideButton() );
        content.append(main, aside);

        return content;
    }
}
