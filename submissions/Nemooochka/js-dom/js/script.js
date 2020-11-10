const moviesData = [
    {
        'year': '2019',
        'name': 'Parasite',
        'poster': 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        'director': 'Bong Joon Ho',
        'writers': 'Bong Joon Ho (story by), Bong Joon Ho (screenplay by)',
        'stars': 'Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo'
    },
    {
        'year': '2018',
        'name': 'Green Book',
        'poster': 'https://m.media-amazon.com/images/M/MV5BYzIzYmJlYTYtNGNiYy00N2EwLTk4ZjItMGYyZTJiOTVkM2RlXkEyXkFqcGdeQXVyODY1NDk1NjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'A working-class Italian-American bouncer becomes the driver of an African-American classical pianist on a tour of venues through the 1960s American South.',
        'director': 'Peter Farrelly',
        'writers': 'Nick Vallelonga, Brian Hayes Currie (as Brian Currie)',
        'stars': 'Viggo Mortensen, Mahershala Ali, Linda Cardellini '
    },
    {
        'year': '2017',
        'name': 'The Shape of Water',
        'poster': 'https://m.media-amazon.com/images/M/MV5BNGNiNWQ5M2MtNGI0OC00MDA2LWI5NzEtMmZiYjVjMDEyOWYzXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.',
        'director': 'Guillermo del Toro',
        'writers': 'Guillermo del Toro (screenplay by), Vanessa Taylor (screenplay by) |',
        'stars': 'Sally Hawkins, Octavia Spencer, Michael Shannon'
    },
    {
        'year': '2016',
        'name': 'Moonlight',
        'poster': 'https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.',
        'director': 'Barry Jenkins',
        'writers': 'Barry Jenkins (screenplay by), Tarell Alvin McCraney (story by)',
        'stars': 'Mahershala Ali, Naomie Harris, Trevante Rhodes '
    },
    {
        'year': '2015',
        'name': 'Spotlight',
        'poster': 'https://m.media-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.',
        'director': 'Tom McCarthy',
        'writers': 'Josh Singer, Tom McCarthy',
        'stars': 'Mark Ruffalo, Michael Keaton, Rachel McAdams'
    },
    {
        'year': '2014',
        'name': 'Birdman',
        'poster': 'https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_UX182_CR0,0,182,268_AL_.jpg',
        'description': 'A washed-up superhero actor attempts to revive his fading career by writing, directing, and starring in a Broadway production.',
        'director': 'Alejandro G. Iñárritu',
        'writers': 'Alejandro G. Iñárritu, Nicolás Giacobone',
        'stars': 'Michael Keaton, Zach Galifianakis, Edward Norton'
    }
];

const initialMovie = moviesData[0];
const sidebar = document.querySelector(".sidebar");
const sidebarNav = document.querySelector(".sidebar-nav");
const menuChevron = document.querySelector(".menu-chevron");

const toggleSidebar = () => {
    sidebar.classList.toggle('open');
};

function generateView({poster, name, description, director, writers, stars}) {
    return `<div class="card-poster">
                <img src="${poster}" alt="${name}">
            </div>
            <div class="card-info">
                <h2>${name}</h2>
                <div class="details">
                    <p class="details_description">${description}</p>
                    <div class="details_director">
                        <b>Director:</b>
                        <span class="director">${director}</span>
                    </div>
                    <div class="details_writer">
                        <b>Writers:</b>
                        <span>${writers}</span>
                    </div>
                    <div class="details_stars">
                        <b>Stars:</b>
                        <span>${stars}</span>
                    </div>
                </div>
            </div>`;
}

function renderCard(nodeList) {
    const cardMovie = document.querySelector('.card');
    cardMovie.innerHTML = generateView(nodeList);
}

function updateActiveNav(targetLink) {
    const activeElement = document.querySelector('.sidebar-nav_link.active');
    if (activeElement) {
        activeElement.classList.remove('active');
    }
    targetLink.closest('.sidebar-nav_link').classList.add('active');
}

function changeMovie(e) {

    let clickedElem = e.target;

    if(clickedElem.tagName === 'A') {
        e.preventDefault();

        updateActiveNav(clickedElem);

        let chosenYear = clickedElem.dataset.year;

        let chosenMovie = moviesData.find(movie => {
            for (let item in movie) {
                if (movie['year'] === chosenYear) return true;
            }
        });

        renderCard(chosenMovie);
        toggleSidebar();
    }
}

document.addEventListener("DOMContentLoaded", function () {

    renderCard(initialMovie);

    sidebarNav.addEventListener('click', changeMovie);

    menuChevron.addEventListener("click", toggleSidebar);
});
