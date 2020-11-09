const data = [
    {
        'year': 'y_2019',
        'name': 'Parasite',
        'poster': 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        'director': 'Bong Joon Ho',
        'writers': 'Bong Joon Ho (story by), Bong Joon Ho (screenplay by)',
        'stars': 'Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo'
    },
    {
        'year': 'y_2018',
        'name': 'Green Book',
        'poster': 'https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'A working-class Italian-American bouncer becomes the driver of an African-American classical pianist on a tour of venues through the 1960s American South.',
        'director': 'Peter Farrelly',
        'writers': 'Nick Vallelonga, Brian Hayes Currie (as Brian Currie)',
        'stars': 'Viggo Mortensen, Mahershala Ali, Linda Cardellini '
    },
    {
        'year': 'y_2017',
        'name': 'The Shape of Water',
        'poster': 'https://m.media-amazon.com/images/M/MV5BNGNiNWQ5M2MtNGI0OC00MDA2LWI5NzEtMmZiYjVjMDEyOWYzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.',
        'director': 'Guillermo del Toro',
        'writers': 'Guillermo del Toro (screenplay by), Vanessa Taylor (screenplay by) |',
        'stars': 'Sally Hawkins, Octavia Spencer, Michael Shannon'
    },
    {
        'year': 'y_2016',
        'name': 'Moonlight',
        'poster': 'https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.',
        'director': 'Barry Jenkins',
        'writers': 'Barry Jenkins (screenplay by), Tarell Alvin McCraney (story by)',
        'stars': 'Mahershala Ali, Naomie Harris, Trevante Rhodes '
    },
    {
        'year': 'y_2015',
        'name': 'Spotlight',
        'poster': 'https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.',
        'director': 'Tom McCarthy',
        'writers': 'Josh Singer, Tom McCarthy',
        'stars': 'Mark Ruffalo, Michael Keaton, Rachel McAdams'
    },
    {
        'year': 'y_2014',
        'name': 'Birdman',
        'poster': 'https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.',
        'director': 'Alejandro G. Iñárritu',
        'writers': 'Alejandro G. Iñárritu, Nicolás Giacobone',
        'stars': 'Michael Keaton, Zach Galifianakis, Edward Norton'
    }
];

const initialMovie = data[0];
const navLink = document.querySelectorAll('.sidebar a');
const sidebar = document.querySelector(".sidebar");
const menuChevron = document.querySelector(".menu-chevron");

const toggleSidebar = () => {
    sidebar.classList.toggle('open');
};

/* get a year (last part of url) from href */
const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1);

function generateView(obj) {
    return `<div class="card-poster">
                <img src="${obj.poster}" alt="${obj.name}">
            </div>
            <div class="card-info">
                <h2>${obj.name}</h2>
                <div class="details">
                    <p class="details_description">${obj.description}</p>
                    <div class="details_director">
                        <b>Director:</b>
                        <span class="director">${obj.director}</span>
                    </div>
                    <div class="details_writer">
                        <b>Writers:</b>
                        <span>${obj.writers}</span>
                    </div>
                    <div class="details_stars">
                        <b>Stars:</b>
                        <span>${obj.stars}</span>
                    </div>
                </div>
            </div>`;
}

function renderCard(nodeList) {
    const cardMovie = document.querySelector('.card');
    cardMovie.innerHTML = generateView(nodeList);
}

function updateActiveNav(targetLink) {
    const getSiblings = el => {
        let siblings = [];

        // first child of the parent node
        let sibling = el.parentNode.parentNode.firstChild;

        // collecting siblings
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== el) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };

    const setActive = el => {
        let nodes = getSiblings(el);
        nodes.forEach(sib => sib.classList.remove('active'));
        el.parentNode.classList.add('active')
    };


    setActive(targetLink);
}

function changeMovie(e) {
    e.preventDefault();

    updateActiveNav(this);

    let chosenYear = getLastItem(this.href);
    let chosenMovie;

    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        for (let item in obj) {
            if (obj['year'] === chosenYear) chosenMovie = obj;
        }
    }

    renderCard(chosenMovie);
    toggleSidebar();
}

document.addEventListener("DOMContentLoaded", function () {

    renderCard(initialMovie);

    /* run the function changeMovie on all links inside sidebar */
    [].forEach.call(navLink, function (e) {
        e.addEventListener('click', changeMovie, false)
    });

    menuChevron.addEventListener("click", toggleSidebar);
});
