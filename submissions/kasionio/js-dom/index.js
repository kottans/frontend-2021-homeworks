const planets = [{
    name: "Pandora",
    source: 'Avatar movie',
    year: 2009,
    author: 'James Francis Cameron',
    image: 'https://i.pinimg.com/originals/e1/14/e1/e114e1de72bbfa04e13ed956685d9f81.jpg',
    description: '<p>The Pandora biosphere teems with a biodiversity of bioluminescent species ranging from six-legged animals to other types of exotic fauna and flora. The Pandoran ecology forms a vast neural network spanning the entire lunar surface into which the Na\'vi and other creatures can connect. The strength of this collective consciousness is powerfully illustrated when the human invaders are defeated in battle by the Pandora ecology, after the resolute Na\'vi were nearly defeated. Cameron used a team of expert advisors in order to make the various examples of fauna and flora as scientifically feasible as possible.</p>'
},
{
    name: "Solaris",
    source: 'Solaris novel',
    year: 1961,
    author: 'Stanislaw Lem',
    image: 'https://s11.stc.all.kpcdn.net/share/i/4/1186519/wr-750.jpg>',
    description: "<p>Solaris chronicles the ultimate futility of attempted communications with the extraterrestrial life inhabiting a distant alien planet named Solaris. The planet is almost completely covered with an ocean of gel that is revealed to be a single, planet-encompassing entity. Terran scientists conjecture it is a living and a sentient being, and attempt to communicate with it.</p>"

},
{
    name: "Magrathea",
    source: 'The Hitchhiker\'s Guide to the Galaxy book',
    year: 1979,
    author: ' Douglas Adams',
    image: 'https://media.nature.com/w800/magazine-assets/d41586-019-02969-8/d41586-019-02969-8_17222542.jpg',
    description: 'Magrathea is an ancient planet located in orbit around the twin suns Soulianis and Rahm in the heart of the Horsehead Nebula. It was the Magratheans who constructed the planet-sized computer, Earth (for a race of hyperintelligent pan-dimensional beings, the mice and designed by Deep Thought), to determine the ultimate question of Life, the Universe, and Everything, which is required to understand the Answer to Life, the Universe, and Everything.'
},
{
    name: "Mul",
    source: 'Valerian and the City of a Thousand Planets movie',
    year: 2017,
    author: 'Luc Besson',
    image: 'https://i.pinimg.com/originals/9f/83/62/9f8362272701c8a283e0d8a4735631ab.jpg',
    description: 'The Pearls were once peaceful race native to the paradise-like planet Mül, where they thrived and lived in harmony with nature similar to the Na\'vi which were based on the cultures of African tribal societies and Indians of Native American history. However, an interstellar war between Humans and an unknown alien race fought high above the planet where destroyed ships rained down from the sky during the conflict. In an effort to survive, a group of Pearls hid into a crashed ship to escape the destruction. The planet was then destroyed by a giant mothership of the opposing aliens that was shot down and crashed into Mül with enough power to annihilate the entire planet. '

},
{
    name: "Acheron (LV-426)",
    source: 'Aliens movie',
    year: 1986,
    author: 'James Francis Cameron',
    image: 'https://i.pinimg.com/originals/0c/1b/26/0c1b2606a743eacceb0b4690e7cad108.jpg',
    description: 'Acheron, formerly designated as LV-426 is one of three known moons orbiting the planet Calpamos, located in the Zeta II Reticuli system, 39 light-years from Earth. In the Alien timeline, it was one of the first planets to be infested by Xenomorphs.'
}
];

const main = document.querySelector('#main');
const nav = document.querySelector('#nav');
let currentLink;

let navLinks = planets.map(planet => `<li class ='nav_item'><a href='#'>${planet.name}</a></li>`)
.join('');
nav.innerHTML = navLinks;

function createArticle(item) {
    const article = document.createElement('article');
    article.className = "article";
    article.innerHTML = `
    <div class='article-wrapper'>
    <div class = 'info'>
        <h3>Source: </h3><span> ${item.source}</span>
        <h3>Year: </h3><span> ${item.year}</span>
        <h3>Author: </h3><span> ${item.author}</span>
    </div>
    <figure>
        <img class='image' src='${item.image}' alt='${item.name}'/>
        <figcaption class='figcaption'>${item.name} planet view</figcaption>
    </figure>
    </div>
    <p>${item.description}</p>`;
    return article;   
}

nav.addEventListener('click', ({target}) => {
    if (target.innerText !== currentLink) {
        currentLink = target.innerText;
        main.innerHTML = '';
        main.appendChild(createArticle(planets.find(item => item.name === target.innerText)));
   }
});
