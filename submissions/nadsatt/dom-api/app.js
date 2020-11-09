document.addEventListener('DOMContentLoaded', () => {
    const initialMovieId = 0;

    headerIcon.addEventListener('click', toggleSidebar);
    sidebarIcon.addEventListener('click', toggleSidebar);
    sidebarList.addEventListener('click', selectSidebarItem);
    createInitialElements(); 
    fillPageByMovieId(initialMovieId);
});

const headerIcon = document.querySelector('.header__icon-wrapper');
const sidebarIcon = document.querySelector('.sidebar__icon-wrapper');
const sidebar = document.querySelector('.sidebar');
const sidebarList = document.querySelector('.sidebar__list');
const posterSection = document.querySelector('.poster-section');
const ratingSectionContent = document.querySelector('.rating-section__content');
const ratingIcon = '<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 511.999 511.999\" style=\"enable-background:new 0 0 511.999 511.999;\" xml:space="preserve\"><g><g><path d="M469.32,184.481c-34.002-8.963-65.204-26.922-90.217-51.935c-25.076-25.076-43.06-56.367-52.007-90.491 c-0.091-0.35-0.091-0.35-2.743-12.537c-0.085-0.392-0.17-0.781-0.255-1.171c-41.593,15.733-76.483,37.551-104.123,65.191 c-30.92,30.92-54.735,71.306-70.786,120.037c-11.911,36.163-17.566,71.283-20.24,97.566L14.305,319 c-0.056,0.004-0.11,0.015-0.166,0.02c-0.306,0.025-0.609,0.066-0.911,0.109c-0.202,0.028-0.405,0.052-0.603,0.089 c-0.246,0.045-0.489,0.106-0.732,0.164c-0.248,0.058-0.496,0.112-0.739,0.182c-0.18,0.052-0.354,0.118-0.532,0.176 c-0.291,0.096-0.583,0.19-0.864,0.303c-0.137,0.055-0.27,0.122-0.405,0.181c-0.307,0.134-0.614,0.267-0.909,0.42 c-0.144,0.074-0.281,0.162-0.423,0.241c-0.273,0.153-0.547,0.303-0.808,0.472c-0.198,0.127-0.385,0.27-0.576,0.407 c-0.193,0.138-0.39,0.269-0.576,0.415c-0.243,0.191-0.473,0.4-0.705,0.607c-0.123,0.11-0.251,0.212-0.37,0.326c-0.239,0.227-0.462,0.472-0.687,0.716c-0.103,0.112-0.211,0.218-0.31,0.332c-0.196,0.227-0.377,0.468-0.56,0.708c-0.117,0.152-0.238,0.3-0.349,0.457c-0.142,0.202-0.271,0.414-0.403,0.624c-0.137,0.217-0.277,0.431-0.403,0.655c-0.096,0.17-0.181,0.348-0.271,0.523c-0.143,0.279-0.284,0.559-0.41,0.847c-0.021,0.049-0.049,0.094-0.07,0.144c-0.048,0.115-0.081,0.231-0.126,0.346c-0.119,0.3-0.233,0.601-0.332,0.909c-0.062,0.191-0.113,0.382-0.167,0.574c-0.076,0.275-0.15,0.55-0.211,0.829c-0.052,0.237-0.092,0.474-0.132,0.712c-0.039,0.236-0.078,0.471-0.106,0.71c-0.034,0.287-0.054,0.573-0.072,0.859c-0.012,0.197-0.025,0.393-0.029,0.591c-0.007,0.325,0.003,0.648,0.017,0.97c0.005,0.123-0.002,0.244,0.007,0.368c0.004,0.055,0.015,0.108,0.019,0.164c0.023,0.285,0.061,0.568,0.1,0.849c0.029,0.212,0.055,0.425,0.093,0.633c0.042,0.229,0.095,0.454,0.147,0.68c0.059,0.257,0.117,0.514,0.189,0.765c0.051,0.177,0.111,0.351,0.168,0.526c0.094,0.287,0.189,0.573,0.299,0.851c0.06,0.153,0.129,0.302,0.194,0.453c0.123,0.284,0.249,0.567,0.389,0.84c0.08,0.158,0.168,0.311,0.254,0.466c0.14,0.252,0.281,0.502,0.435,0.745c0.111,0.177,0.231,0.348,0.35,0.52c0.143,0.206,0.287,0.411,0.439,0.61c0.148,0.193,0.303,0.379,0.461,0.565c0.141,0.166,0.283,0.331,0.431,0.49c0.179,0.193,0.364,0.38,0.554,0.565c0.148,0.143,0.297,0.284,0.451,0.421c0.197,0.176,0.398,0.347,0.605,0.513c0.173,0.139,0.349,0.272,0.528,0.403c0.195,0.143,0.392,0.284,0.596,0.418c0.224,0.148,0.454,0.286,0.686,0.423c0.171,0.1,0.341,0.202,0.517,0.296c0.304,0.163,0.616,0.309,0.931,0.451c0.096,0.043,0.185,0.096,0.282,0.137l0.243,0.103c0.015,0.006,0.03,0.013,0.045,0.019l108.223,45.803l46.596,109.205c0.023,0.054,0.052,0.105,0.075,0.159c0.072,0.162,0.15,0.321,0.227,0.481c0.125,0.258,0.255,0.511,0.393,0.758c0.071,0.128,0.142,0.256,0.217,0.381c0.2,0.337,0.411,0.664,0.633,0.979c0.023,0.032,0.043,0.066,0.066,0.098c0.272,0.38,0.562,0.744,0.864,1.092c0.02,0.023,0.041,0.044,0.062,0.067c0.275,0.312,0.562,0.61,0.858,0.895c0.065,0.063,0.131,0.124,0.197,0.185c0.277,0.257,0.562,0.502,0.854,0.735c0.063,0.05,0.123,0.103,0.186,0.152c0.343,0.264,0.695,0.515,1.058,0.747c0.103,0.066,0.211,0.125,0.316,0.189c0.259,0.157,0.521,0.308,0.788,0.449c0.156,0.083,0.314,0.162,0.474,0.239c0.25,0.121,0.504,0.232,0.759,0.339c0.147,0.061,0.29,0.127,0.44,0.184c0.384,0.146,0.774,0.274,1.169,0.388c0.134,0.038,0.27,0.07,0.405,0.105c0.326,0.084,0.655,0.158,0.985,0.22c0.115,0.021,0.228,0.044,0.344,0.063c0.797,0.131,1.607,0.205,2.424,0.205c0.626,0,1.255-0.055,1.884-0.135c0.35-0.044,0.7-0.089,1.041-0.157c0.089-0.018,0.176-0.045,0.265-0.065c0.399-0.087,0.794-0.184,1.18-0.302c0.101-0.031,0.2-0.071,0.3-0.104c0.37-0.122,0.735-0.252,1.093-0.402c0.037-0.015,0.075-0.025,0.113-0.041c0.108-0.046,0.207-0.104,0.313-0.153c0.295-0.135,0.588-0.273,0.872-0.426c0.187-0.1,0.366-0.207,0.547-0.313c0.221-0.131,0.44-0.263,0.653-0.405c0.21-0.139,0.414-0.284,0.616-0.432c0.171-0.126,0.339-0.254,0.505-0.388c0.213-0.171,0.421-0.347,0.623-0.529c0.146-0.131,0.288-0.266,0.429-0.403c0.196-0.191,0.388-0.384,0.573-0.584c0.142-0.154,0.278-0.313,0.413-0.473c0.163-0.192,0.324-0.384,0.476-0.584c0.149-0.194,0.287-0.394,0.427-0.596c0.122-0.178,0.246-0.354,0.361-0.536c0.151-0.24,0.29-0.488,0.428-0.738c0.087-0.158,0.177-0.313,0.258-0.473c0.139-0.275,0.263-0.558,0.386-0.841c0.065-0.151,0.134-0.3,0.194-0.453c0.109-0.279,0.203-0.565,0.296-0.851c0.057-0.175,0.117-0.347,0.168-0.524c0.071-0.25,0.127-0.505,0.185-0.76c0.052-0.228,0.107-0.454,0.148-0.685c0.036-0.203,0.061-0.41,0.089-0.617c0.04-0.288,0.079-0.575,0.102-0.864c0.004-0.048,0.013-0.094,0.017-0.142l7.913-115.408c26.235-2.709,61.253-8.4,97.283-20.316c48.526-16.048,88.757-39.813,119.579-70.636c27.485-27.485,49.211-62.14,64.923-103.424C475.93,186.298,470.001,184.668,469.32,184.481z"/></g></g><g>    <g>        <path d="M511.61,21.366c-0.179-11.78-9.547-21.148-21.329-21.327c-16.729-0.257-61.168,0.438-112.671,12.269            c-8.52,1.958-16.822,4.124-24.911,6.489c0.269,1.23,0.581,2.662,0.947,4.347c1.116,5.13,2.251,10.345,2.524,11.596            c7.62,28.864,22.878,55.356,44.13,76.609c21.277,21.276,47.806,36.547,76.721,44.159c0.134,0.036,0.157,0.042,15.58,4.281            c2.461-8.354,4.714-16.934,6.74-25.751C511.172,82.535,511.863,38.085,511.61,21.366z M444.768,88.374            c-0.351,0.351-0.719,0.68-1.1,0.989c-0.38,0.31-0.778,0.6-1.179,0.879c-0.41,0.27-0.829,0.52-1.269,0.75            c-0.431,0.23-0.869,0.44-1.319,0.63c-0.45,0.18-0.919,0.351-1.379,0.49c-0.47,0.14-0.949,0.27-1.43,0.36            c-0.479,0.1-0.969,0.17-1.459,0.22c-0.479,0.05-0.978,0.08-1.469,0.08c-0.491,0-0.989-0.03-1.478-0.08            c-0.48-0.05-0.97-0.12-1.449-0.22c-0.48-0.091-0.959-0.221-1.429-0.36c-0.461-0.14-0.93-0.311-1.38-0.49            c-0.449-0.189-0.898-0.399-1.329-0.63c-0.43-0.23-0.849-0.48-1.259-0.75c-0.41-0.28-0.799-0.57-1.179-0.879            c-0.38-0.311-0.75-0.64-1.099-0.989c-2.788-2.788-4.388-6.656-4.388-10.593c0-0.49,0.021-0.989,0.071-1.479            c0.05-0.49,0.13-0.969,0.22-1.449c0.101-0.479,0.22-0.959,0.36-1.429c0.149-0.47,0.31-0.929,0.5-1.379            c0.189-0.45,0.399-0.899,0.62-1.329c0.229-0.43,0.489-0.859,0.76-1.259c0.27-0.41,0.56-0.81,0.869-1.189            c0.31-0.38,0.649-0.74,0.989-1.089c0.35-0.35,0.72-0.68,1.099-0.989c0.38-0.31,0.769-0.6,1.179-0.879            c0.41-0.27,0.829-0.52,1.259-0.749c0.431-0.229,0.88-0.439,1.329-0.62c0.45-0.189,0.919-0.359,1.38-0.5            c0.47-0.14,0.948-0.26,1.429-0.359c0.479-0.101,0.969-0.17,1.449-0.221c0.978-0.1,1.978-0.1,2.947,0            c0.49,0.051,0.979,0.12,1.459,0.221c0.48,0.1,0.96,0.22,1.43,0.359c0.46,0.141,0.929,0.311,1.379,0.5            c0.45,0.181,0.889,0.391,1.319,0.62c0.439,0.23,0.858,0.48,1.269,0.749c0.4,0.28,0.799,0.57,1.179,0.879            c0.381,0.311,0.75,0.641,1.1,0.989c2.788,2.788,4.387,6.656,4.387,10.603C449.155,81.717,447.556,85.585,444.768,88.374z"/></g></g></svg>';
const actorsSectionContent = document.querySelector('.actors-section__content');
const descriptionSectionContent = document.querySelector('.description-section__content');
const fragment = document.createDocumentFragment();

const movies = [
    {
        id: 0,
        name: 'the martian', 
        description: 'When astronauts blast off from the planet Mars, they leave behind Mark Watney, presumed dead after a fierce storm. With only a meager amount of supplies, the stranded visitor must utilize his wits and spirit to find a way to survive on the hostile planet. Meanwhile, back on Earth, members of NASA and a team of international scientists work tirelessly to bring him home, while his crew mates hatch their own plan for a daring rescue mission.',
        rating: 8,
        colors: ['rgb(216,80,28)', 'rgb(225,224,142)', 'rgb(118,96,84)', 'rgb(189,200,196)']
    },
    {
        id: 1,
        name: 'great catsby', 
        description: 'Midwest native Nick Carraway arrives in 1922 New York in search of the American dream. Nick, a would-be writer, moves in next-door to millionaire Jay Gatsby and across the bay from his cousin Daisy and her philandering husband, Tom. Thus, Nick becomes drawn into the captivating world of the wealthy and -- as he bears witness to their illusions and deceits -- pens a tale of impossible love, dreams, and tragedy.',
        rating: 6,
        colors: ['rgb(7,229,169)', 'rgb(106, 115, 94)', 'rgb(155, 163, 146)', 'rgb(202, 181, 158)']
    },
    {
        id: 2,
        name: 'cat of the year', 
        description: 'Tom Dobbs, the satirical host of a political talk show, decides to shake things up by running for president after making comments that he would be a better president than the leader who currently occupies the White House. His fans begin a grassroots campaign that catapults him into the Oval Office, but soon after moving in it is revealed a computer glitch mistakenly awarded him the presidency. Tom is left with a tough choice, stay the course or head back behind the microphone.',
        rating: 2,
        colors: ['rgb(207,163,179)', 'rgb(146,43,62)', 'rgb(23,69,111)', 'rgb(189,200,196)']
    },
    {
        id: 3,
        name: 'kitty potter', 
        description: 'Harry Potter\'s third year at Hogwarts starts off badly when he learns deranged killer Sirius Black has escaped from Azkaban prison and is bent on murdering the teenage wizard. While Hermione\'s (Emma Watson) cat torments Ron\'s sickly rat, causing a rift among the trio, a swarm of nasty Dementors is sent to protect the school from Black. A mysterious new teacher helps Harry learn to defend himself, but what is his secret tie to Sirius Black?',
        rating: 9,
        colors: ['rgb(0,145,194)', 'rgb(0,26,57)', 'rgb(175, 171, 171)', 'rgb(116,153,156)']
    },
    {
        id: 4,
        name: 'new meov', 
        description: 'High-school student Bella Swan, always a bit of a misfit, doesn\'t expect life to change much when she moves from sunny Arizona to rainy Washington state. Then she meets Edward Cullen, a handsome but mysterious teen whose eyes seem to peer directly into her soul. Edward is a vampire whose family does not drink blood, and Bella, far from being frightened, enters into a dangerous romance with her immortal soulmate.',
        rating: 5,
        colors: ['rgb(23,131,72)', 'rgb(93, 150, 18)', 'rgb(175, 171, 171)', 'rgb(128,126,44)']
    },
];

function toggleSidebar(){
    headerIcon.classList.toggle('icon-wrapper--active');
    sidebarIcon.classList.toggle('icon-wrapper--active');
    sidebar.classList.toggle('sidebar--active');
}

function selectSidebarItem({target}){
    if(target.classList.contains('sidebar__item')){
        let movie = movies.find(movie => movie.name === target.textContent);
        let id = movie ? movie.id : 0;

        fillPageByMovieId(id);
        toggleSidebar();
    }
}

function createInitialElements(){
    createSidebarItems();
    createRatingIcons();
    createActorsImgs();
}

function createSidebarItems(){
    movies.map(movie => movie.name).forEach(name => {
        let sidebarItem = document.createElement('li');

        sidebarItem.textContent = name;
        sidebarItem.classList.add('sidebar__item')  
    
        sidebarList.append(sidebarItem);
    });
}

function createRatingIcons(){
    const container = document.createElement('div');
    const iconsNumber = 10;

    for (let i = 1; i <= iconsNumber; i++){
        container.insertAdjacentHTML('beforeend', ratingIcon);
        container.lastElementChild.classList.add('rating-section__icon');

        fragment.appendChild(container.lastElementChild);
    }

    ratingSectionContent.append(fragment); 
}

function createActorsImgs(){
    const imgsNumber = 4;

    for(let i = 1; i <= imgsNumber; i++){
        let img = document.createElement('img');
        img.classList.add('actors-section__img');
    
        fragment.appendChild(img);
    }

    actorsSectionContent.appendChild(fragment);
}

function fillPageByMovieId(id){
    const movie = movies[id]

    fillPosterSection(movie.name);
    fillRatingIcons(movie.rating);
    fillActorsImgs(movie.name);
    fillDescriptionSection(movie.description);
    defineColors(movie.colors);
    defineBackgrounds(movie.name);
}

function fillPosterSection(name){
    const posterSectionHeading = posterSection.querySelector('.poster-section__heading');
    const posterSectionContent = posterSection.querySelector('.poster-section__content');
    const formattedName = formatName(name);

    posterSectionHeading.textContent = name;
    posterSectionContent.setAttribute('src', `images/posters/${formattedName}-poster.png`);
    posterSectionContent.setAttribute('alt', `${formattedName}-poster`);
}

function fillRatingIcons(rating){
    selectRatingIcons(rating);
    unselectRatingIcons(rating);
}

function selectRatingIcons(rating){
    const ratingIcons = Array.from(ratingSectionContent.children);

    ratingIcons
        .slice(0, rating + 1)
        .forEach(ratingIcon => 
            ratingIcon.classList.add('rating-section__icon--selected')
        );  
}

function unselectRatingIcons(rating){
    const ratingIcons = Array.from(ratingSectionContent.children);

    ratingIcons
        .slice(rating)
        .forEach(ratingIcon => 
            ratingIcon.classList.remove('rating-section__icon--selected')
        );
}

function fillActorsImgs(name){
    const formattedName = formatName(name);
    const imgs = actorsSectionContent.querySelectorAll('.actors-section__img');

    imgs.forEach((img, i) => {
        img.setAttribute('src', `images/actors/${formattedName}-actor${++i}.png`);
        img.setAttribute('alt', `${formattedName}-actor${i}`);
    });
}

function fillDescriptionSection(description){
    descriptionSectionContent.textContent = description;
}

function defineColors(colors){
    colors.forEach((color, i) => 
        document.documentElement.style.setProperty(`--color${++i}`, color)
    );
}

function defineBackgrounds(name){
    const formattedName = formatName(name);
    const root = document.documentElement;

    root.style.setProperty('--background-mobile', `url(\'./images/backgrounds/${formattedName}-mobile.png\')`);
    root.style.setProperty('--background', `url(\'../images/backgrounds/${formattedName}.png\')`);
}

function formatName(name){
    return name.replace(/\s/g, '-');
}

