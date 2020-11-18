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

let places = document.getElementById('main');
let navItems = document.getElementById('nav__wrapper');
let img = document.createElement('img');
let nav = document.getElementById("navigation");
let burger = document.getElementById("hamburger");

img.src = mexPlaces[0].img_url;
places.appendChild(img);

mexPlaces.forEach(function (element, index) {
    const but = document.createElement('button');
    but.classList.add("btn");
    but.id = mexPlaces[index].id;
    but.innerHTML = mexPlaces[index].name;
    navItems.appendChild(but);
    const buter = document.getElementById(mexPlaces[index].id);
    buter.addEventListener('click', event => {
        places.removeChild(places.lastChild);
        img.src = mexPlaces[index].img_url;
        places.appendChild(img);
    });
});

function myFunction(x) {
    if (x.matches) { // If media query matches
        nav.style.display = 'none';
    } else {
        nav.style.display = "block";
    }
}

let x = window.matchMedia("(max-width: 700px)");
myFunction(x);
x.addListener(myFunction);// Call listener function at run time

function buttonFunction() {
    if (nav.style.display === "none") {
        nav.style.display = "block";
        burger.style.background = "url(./img/x.png) no-repeat center";
    } else {
        nav.style.display = "none";
        burger.style.background = "url(./img/menu.png)";
    }
}
