const cats = [
    {
        name: 'Пуфик',
        icon: 'img/cat-solid.svg',
        url: 'https://images.pexels.com/photos/5200916/pexels-photo-5200916.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Люся',
        icon: 'img/fish-solid.svg',
        url: 'https://images.pexels.com/photos/1366996/pexels-photo-1366996.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Трейси',
        icon: 'img/heart-solid.svg',
        url: 'https://images.pexels.com/photos/1457595/pexels-photo-1457595.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Люк',
        icon: 'img/paw-solid.svg',
        url: 'https://images.pexels.com/photos/2870353/pexels-photo-2870353.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Спарк',
        icon: 'img/sun-solid.svg',
        url: 'https://images.pexels.com/photos/979247/pexels-photo-979247.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    }
]

const main = document.querySelector('.js-main');
const menu = document.querySelector('.js-menu');

const renderCats = (position) => {
    const cat = cats[position];
    main.innerHTML = `<img id="img" src=${cat.url} alt=${cat.name}>`;
}

const renderItem = () => {
    let fragment = document.createDocumentFragment();

    cats.forEach((cat, index) => {
        const block = document.createElement('li');
        block.innerHTML = `
        <a href="#" class="navbar__item" data-id="${index}">
            <span class="icon">
            <img src="${cat.icon}" alt="${cat.name}">
            </span>
            <p class="text">${cat.name}</p>
        </a>
        `;
        fragment.appendChild(block);
    })

    menu.appendChild(fragment);
}

const removeActive = () => {
    const activeElement = document.querySelector('a.active');
    activeElement.classList.remove('active');
}

window.onload = () => {
    renderItem();

    document.querySelector('.navbar__items').addEventListener('click', (event) => {
        const target = event.target;
        if (event.target.tagName === 'A') {
            removeActive();
            const data_id = target.getAttribute("data-id");
            target.classList.add('active');
            renderCats(data_id);
        }
    })

    renderCats(0);
    document.querySelector('.navbar__item').className = 'navbar__item active';
};
