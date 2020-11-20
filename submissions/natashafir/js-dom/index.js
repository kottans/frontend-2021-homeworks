const mexPlaces = [
    {
        id: 0,
        name: 'Ciudad de México',
        img_url: './img/cdmx.jpeg'
    },
    {
        id: 1,
        name: 'Guadalajara',
        img_url: './img/gdl.jpg'
    },
    {
        id: 2,
        name: 'Cancún',
        img_url: './img/cancun.jpg'
    },
    {
        id: 3,
        name: 'Tulum',
        img_url: './img/tulum.jpg'
    },
    {
        id: 4,
        name: 'Los Colorados',
        img_url: './img/colorados.jpg'
    },
    {
        id: 5,
        name: 'Puebla',
        img_url: './img/puebla.jpg'
    },
    {
        id: 6,
        name: 'La Playa del Amor',
        img_url: './img/amor.jpg'
    },
    {
        id: 7,
        name: 'Cenote Suytun',
        img_url: './img/suytun.jpg'
    },
    {
        id: 8,
        name: 'Tolantongo',
        img_url: './img/tolantongo.jpg'
    },
    {
        id: 9,
        name: 'Oaxaca',
        img_url: './img/oaxaca.jpg'
    },
    {
        id: 10,
        name: 'La Paz',
        img_url: './img/la-paz.jpg'
    },
    {
        id: 11,
        name: 'Playa Mujeres',
        img_url: './img/mujeres.jpg'
    }

];

const places = document.getElementById('main');
const navItems = document.getElementById('nav__wrapper');
const img = document.createElement('img');
const nav = document.getElementById("navigation");
const burger = document.getElementById("hamburger");
const showSideMenu = ({target}) => {
    target.classList.toggle('hamburger--open');
    nav.classList.toggle('navigation--open');
};
const changeImg = (event) => {
    let target = event.target;
    img.src = mexPlaces[target.id].img_url;
};

document.addEventListener("DOMContentLoaded", () => {

    img.src = mexPlaces[0].img_url;
    places.appendChild(img);

    mexPlaces.forEach(function (element, index) {
        const placeBtn = document.createElement('button');
        placeBtn.classList.add("btn");
        placeBtn.id = mexPlaces[index].id;
        placeBtn.innerHTML = mexPlaces[index].name;
        navItems.appendChild(placeBtn);
    });
    burger.addEventListener('click', showSideMenu);
    nav.addEventListener('click', changeImg);
});
