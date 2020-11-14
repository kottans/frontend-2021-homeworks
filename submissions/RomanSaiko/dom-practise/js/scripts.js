const content = [
    {
        id: '0',
        city: 'Paris',
        country: 'France',
        region: 'Île-de-France',
        population: '2,148,271',
        area: '105.4',
        website: 'https://en.parisinfo.com/'
    },
    {
        id: '1',
        city: 'London',
        country: 'England',
        region: 'London',
        population: '8,961,989',
        area: '1,572',
        website: 'https://www.london.gov.uk/'
    },
    {
        id: '2',
        city: 'Rome',
        country: 'Italy',
        region: 'Lazio',
        population: '2,837,332',
        area: '1,285',
        website: 'https://www.rome.net/'
    },
    {
        id: '3',
        city: 'Amsterdam',
        country: 'Netherlands',
        region: 'North Holland',
        population: '872,680',
        area: '219.32',
        website: 'https://www.amsterdam.nl/en/'
    }
];

let renderPage = () => {
    const iconMenu = document.getElementById('menu-handler');
    const sidebarMenu = document.getElementById('aside-menu');
    const article = document.getElementById('article');
    const navMenu = document.getElementById('nav-list');

    const handleMenuToggle = () => {
        iconMenu.classList.toggle('open');
        if (iconMenu.classList.contains('open')) {
            sidebarMenu.classList.add('open');
        }
        else {
            sidebarMenu.classList.remove('open');
        }
    };

    const changeInfo = (e) => {
        createInfoBlock(e.target.dataset.id);
        article.style.backgroundImage = `url(img/${content[e.target.dataset.id].city.toLowerCase()}.jpg)`
    }

    const createInfoBlock = (id) => {
        const infoBlock = `
        <div class="info-block">
            <h2><strong>City:</strong> ${content[id].city}</h2>
            <p><strong>Country:</strong> ${content[id].country}</p>
            <p><strong>Region:</strong> ${content[id].region}</p>
            <p><strong>Population:</strong> ${content[id].population}</p>
            <p><strong>Area:</strong> ${content[id].area} km<sup>2</sup></p>
            <p><strong>Website:</strong> <a target="_blank" href=${content[id].website}>${content[id].website}</a></p>
        </div>`
        article.innerHTML = infoBlock;
    }

    createInfoBlock(0);

    iconMenu.addEventListener('click', handleMenuToggle);
    navMenu.addEventListener('click', changeInfo);
}

document.addEventListener('DOMContentLoaded', renderPage);
