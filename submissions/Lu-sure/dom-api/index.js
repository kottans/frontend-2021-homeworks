const contentArray = [
    {
        'sideName': 'This is his spot',
        'name': 'Doctor Sheldon Cooper',
        'img': 'img/sheldon.jpg',
        'known': 'Smelly Pooper, Shelly Bean, Sheldor, Dr. Dumbass and C3P-Wee Herman.',
        'appearance': 'T-shirts over a long-sleeve shirt.',
        'quotes': '"Bazinga!"',
        'fondOf': 'science fiction, comic books, costumes, video games, flags, trains.',
        'features': 'an eidetic memory, obsessive–compulsive disorder, speaking Klingon.'
    },
    {
        'sideName': 'He begs you click',
        'name': 'Lonard Hofstadter',
        'img': 'img/leonard.jpg',
        'known': 'Lenny, Honey, Ricardo Shilly-Shally',
        'appearance': 'weird eyebrows, sweat shirt with hood worn under a jacket, and Converse All Stars sneakers',
        'quotes': '"People get things they don\`t deserve all the time. Like me with you."',
        'fondOf': 'science fiction, comic books, fan costumes, video games, Penny, lazers.',
        'features': 'an extremely bad vision, lactose intolerance, asthma, playing the cello, speaking Klingon.'
    },
    {
        'sideName': 'His dad paid for all',
        'name': 'Rajesh Koothrappali',
        'img': 'img/raj.jpg',
        'known': 'Raj, indian guy.',
        'appearance': 'chocolate skin, a layered combination of a shirt, a sweater vest, and a windbreaker with skate shoes.',
        'quotes': '"I\'ve said this before and I\'ll say it again: Aquaman sucks!"',
        'fondOf': 'science fiction, comic books, fan costumes, video games, his dog Cinnamon.',
        'features': 'an Indian English accent, selective mutism social anxiety disorder, metrosexuality.'
    },
    {
        'sideName': 'The astronaut here',
        'name': 'Howard Wolowitz',
        'img': 'img/howard.jpg',
        'known': 'Howie, Froot Loops, Rocket Man, Wolowizard.',
        'appearance': 'a bowl haircut, loud, vintage, 1960-era outfit, a shirt over a turtleneck or dickey on the neck, Vans or Converse sneakers, and skinny pants with massive belt buckle.', 
        'quotes': '"I\'m a horny engineer... I never joke about math or sex."',
        'fondOf': 'science fiction, comic books, fan costumes, video games, magic and card tricks.',
        'features': 'multilingualism, not having a doctoral degree'
    }
];

const body = document.querySelector('body');
const side = document.getElementById('side');
const main = document.getElementById('main');
const sideButton = document.getElementById('side-button');

const renderSide = function () {
    const ul = document.createElement('ul');
    for (let i=0; i<contentArray.length; i++) {
        const sideHero = document.createElement('li');
        sideHero.innerHTML = contentArray[i].sideName;
        sideHero.classList.add('side-hero');
        sideHero.setAttribute("data-idx", i);
        ul.appendChild(sideHero);
    };
    ul.addEventListener('click', function (evt) {
        changeContent(evt.target.getAttribute("data-idx"));
        side.classList.remove('open');
    });
    side.appendChild(ul);
};

const render = function (index) {
    const contentWrapper = document.createElement('div');
    const content = contentArray[index];
    if (!content) return;

    const name = document.createElement('h2');
    name.innerHTML = content.name;
    name.classList.add('name');

    const img = document.createElement('img');
    img.setAttribute('src', content.img);
    img.classList.add('image');

    const known = document.createElement('h3');
    known.innerHTML = `Also known as: ${content.known}`;
    known.classList.add('known-for');

    const appearance = document.createElement('p');
    appearance.innerHTML = `Appearance: ${content.appearance}`;
    appearance.classList.add('about-hero');

    const quotes = document.createElement('p');
    quotes.innerHTML = `Most famous quotes: ${content.quotes}`;
    quotes.classList.add('about-hero');

    const fondOf = document.createElement('p');
    fondOf.innerHTML = `He is fond of: ${content.fondOf}`;
    fondOf.classList.add('about-hero');

    const features = document.createElement('p');
    features.innerHTML = `Special features: ${content.features}`;
    features.classList.add('about-hero');

    contentWrapper.append(name, img, known, appearance, quotes, fondOf, features);
    main.appendChild(contentWrapper);
    contentWrapper.classList.add('hero');
};

const changeContent = function (index) {
    main.innerHTML = "";
    render(index);
}

renderSide();
render(0);

sideButton.addEventListener('click', function () {   
    side.classList.add('open');
});

document.addEventListener('click', function (event) {
    if(!side.contains(event.target) && !sideButton.contains(event.target)){
        side.classList.remove('open');
    }
});
