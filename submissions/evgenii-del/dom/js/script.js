const cats = [
    {
        name: 'Пуфик',
        icon: 'fas fa-cat',
        url: 'https://images.pexels.com/photos/5200916/pexels-photo-5200916.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Люся',
        icon: 'fas fa-paw',
        url: 'https://images.pexels.com/photos/1366996/pexels-photo-1366996.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Трейси',
        icon: 'fas fa-fish',
        url: 'https://images.pexels.com/photos/1457595/pexels-photo-1457595.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Люк',
        icon: 'fas fa-heart',
        url: 'https://images.pexels.com/photos/2870353/pexels-photo-2870353.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Спарк',
        icon: 'fas fa-sun',
        url: 'https://images.pexels.com/photos/979247/pexels-photo-979247.jpeg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    }
]

const main = document.querySelector('.js-main');
const menu = document.querySelector('.js-menu');

const renderCats = (position) => {
    let cat = cats[position];
    main.innerHTML = `
        <img id="img" src=${cat.url} alt=${cat.name}>`;
}

const renderItem = (cat, index) => {
    let block = document.createElement('li');
    block.innerHTML = `
        <a href="#" data-id="${index}">
            <span class="icon">
                <i class="${cat.icon}"></i>
            </span>
            <p class="text">${cat.name}</p>
        </a>
    `;
    menu.appendChild(block);
}

const removeActive = () => {
    document.querySelectorAll('li').forEach((li) => {
        li.querySelector('a').className = "";
    })
}

window.onload = () => {
    cats.forEach((item, index) => {
        renderItem(item, index);
    })

    document.querySelectorAll('li').forEach((li) => {
        li.addEventListener('click', ({target}) => {
            removeActive();
            target.className = 'active';
            renderCats(target.getAttribute("data-id"));
        });
    })

    renderCats(0);
    document.querySelector('a').className = 'active';
};
