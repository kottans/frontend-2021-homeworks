const APP_CONFIG = {
    url: 'https://randomuser.me/api/?results=60',
    filterBy: 'name'
}
const CSS_CLASSES = {
    card: 'card',
    radioButton: 'radio-box',
    navButton: 'nav-button'
}

const DOM_NODES = {
    inputText: document.querySelector('.input-text'),
    radioButtons: document.querySelectorAll('.radio-box'),
    form: document.querySelector('.filters'),
    target: document.querySelector('.frame'),
    btnWrapper: document.querySelector('.btn-wrapper'),
    resetBtn: document.querySelector('.filter .reset_button'),
}
const state = {
    allUsers: [],
    filteredUsers: [],
    sortedUsers: []
}

const SORT = {
    all: () => renderCards(state.sortedUsers = [...state.filteredUsers]),
    female: () => renderCards(state.sortedUsers = state.filteredUsers.filter(user => user.gender.toLowerCase() == 'female')),
    male: () => renderCards(state.sortedUsers = state.filteredUsers.filter(user => user.gender.toLowerCase() == 'male')),
    nameAsc: () => renderCards(state.sortedUsers = state.filteredUsers.sort((a, b) => {
        if (a.name.first.toLowerCase() > b.name.first.toLowerCase()) return 1
        else return -1
    })),
    nameDesc: () => renderCards(state.sortedUsers = state.filteredUsers.sort((a, b) => {
        if (a.name.first.toLowerCase() < b.name.first.toLowerCase()) return 1
        else return -1
    })),
    ageAsc: () => renderCards(state.sortedUsers = state.filteredUsers.sort((a, b) => {
        if (a.age > b.age) return 1
        else return -1
    })),
    ageDesc: () => renderCards(state.sortedUsers = state.filteredUsers.sort((a, b) => {
        if (a.age < b.age) return 1
        else return -1
    })),
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const getCapitalizedName  = ({first, last}) => {
    return `${capitalize(first)} ${capitalize(last)}`
}

const formatDate = (date) => {
    let d = new Date(date)
    return `${d.getFullYear()}/${d.getMonth()}/${d.getUTCDate()}`
}

class Card {
    constructor(props) {
        this.id = props.id
        this.photo = props.photo
        this.name = props.name
        this.age = props.age
        this.date = props.date
        this.email = props.email
        this.location = props.location
        this.password = props.password
        this.gender = props.gender
        this.cell = props.cell
    }

    render() {
        let div = document.createElement('div')
        div.classList.add('card')
        div.id = this.id
        const markup = generateMarkupForCard(
            this.name,
            this.photo,
            this.email,
            this.date,
            this.location,
            this.cell,
            this.password
            )
        div.innerHTML = markup

        const list = Array.from(div.getElementsByTagName("li"));
        div.addEventListener('mouseover', function (e) {
            let li = e.target.closest('li')
            if (!li) return
            list.forEach(item => item.classList.remove('active'));
            li.classList.add('active');
            this.querySelector('.details').querySelector('.user_title').innerHTML = li.getAttribute('data-title');
            this.querySelector('.details').querySelector('.user_value').innerHTML = li.getAttribute('data-value');
        })
        return div
    }
}

const generateMarkupForCard = (name, photo, email, date, location, cell, password) => {
    return `<div class="details">
    <p class="user_title">${getCapitalizedName(name)}</p>
    <div class="user_photo horizontal_center">
        <img src="${photo}" alt="${name}">
    </div>
    <p class="user_value">${email}</p>
</div>
<ul class="values_list horizontal_center">
    <li data-title="Hi, My name is" data-value="${getCapitalizedName(name)}" data-label="name" class=""></li>
    <li data-title="My email address is" data-value="${email}" data-label="email" class="active"></li>
    <li data-title="My birthday is" data-value="${formatDate(date)}" data-label="birthday" class=""></li>
    <li data-title="My address is" data-value="${location}" data-label="location" class=""></li>
    <li data-title="My phone number is" data-value="${cell}" data-label="phone" class=""></li>
    <li data-title="My password is" data-value="${password}" data-label="pass" class=""></li>
</ul>`;
}

const buildCardList = () => {
    fetch(APP_CONFIG.url)
        .then(data => data.json())
        .then(data => state.allUsers = data.results.map(buildCard))
        .then(() => state.sortedUsers = [...state.allUsers])
        .then(() => state.filteredUsers = [...state.allUsers])
        .then(() => renderCards(state.filteredUsers))
        .catch(e => {
            console.log(e)
        })
}

function buildCard(user) {
    return new Card({
        id: user.id,
        photo: user.picture.large,
        name: user.name,
        age: user.age,
        date: user.dob.date,
        email: user.email,
        location: user.location.city,
        password: user.login.password,
        gender: user.gender,
        cell: user.cell
    })
}

const createBtn = (page, type) => `<button class="btn-inline results__btn--${ type }" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                                        <span>Page ${ type === 'prev' ? page - 1 : page + 1 }</span>
                                        <svg class="search__icon">
                                            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                                        </svg>
                                    </button>`;
const renderBtn = (page, sumResults, resPerPage) => {
    const pages = Math.ceil(sumResults / resPerPage);
    let btn;
    if (page === 1 && pages > 1) {
        btn = createBtn(page, 'next');
    } else if (page === pages && pages > 1) {
        btn = createBtn(page, 'prev');
    } else if (page < pages) {
        btn = `${createBtn(page, 'next')} ${createBtn(page, 'prev')}`;
    } else {
        btn = null;
    }
    if (sumResults > 0) {
        if (DOM_NODES.btnWrapper) {
            if (btn) DOM_NODES.btnWrapper.insertAdjacentHTML('beforeend', btn);
        } else {
            const btnWrapper = document.createElement('DIV');
            btnWrapper.className = 'btn-wrapper';
            if (btn) btnWrapper.insertAdjacentHTML('beforeend', btn);
            DOM_NODES.target.appendChild(btnWrapper);
        }
    }
};

const renderCards = (cardsArray, currentPage = 1, resPerPage = 12) => {
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    if (cardsArray && cardsArray.length !== 0) {
        const fragment = document.createDocumentFragment();
        cardsArray.slice(start, end).forEach(item => fragment.appendChild(item.render()));
        DOM_NODES.target.innerHTML = '';
        DOM_NODES.target.appendChild(fragment);
    }
    renderBtn(currentPage, cardsArray.length, resPerPage)
};

const filter = (value) => {
    renderCards(state.filteredUsers = state.allUsers.filter(({
        name
    }) => `${name.first} ${name.last}`.toLowerCase().includes(value.toLowerCase())))
};

const reset = () => {
    state.sortedUsers = [...state.allUsers];
    renderCards(state.filteredUsers = [...state.allUsers]);
};
const resetRadioButtons = () => {
    reset();
    Array.from(DOM_NODES.radioButtons).forEach(button => button.checked = false);
    DOM_NODES.radioButtons[0].checked = true;
};

const sortingCards = (e) => {
    const target = e.target.type;
    if (!state.sortedUsers.length) state.sortedUsers = [...state.filteredUsers];

    if (target == 'radio') SORT[e.target.value]();
};

DOM_NODES.inputText.addEventListener("change", function (e) {
    filter(e.target.value)
});

DOM_NODES.form.addEventListener('click', function (e) {
    let filteredUsers = [...state.filteredUsers];
    sortingCards(e, filteredUsers);
});

DOM_NODES.resetBtn.addEventListener('click', reset);

DOM_NODES.target.addEventListener('click', e => {
    const btn = e.target.closest(`.btn-inline`);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        renderCards(state.sortedUsers, goToPage);
    }
});

buildCardList()
