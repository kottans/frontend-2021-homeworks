const IMG_CLASS_NAME = 'card-image';
const CARD_DESCRIPTION_CLASS_NAME = 'card-description';
const CARD_TITLE_CLASS_NAME = 'card-header';
const CARD_TEXT_CLASS_NAME = 'card-text';
const CARD_LINK_CLASS_NAME = 'link-wiki';
const catalogItemsList = [
    {
        id: 0,
        title: 'Siamese cat',
        text: 'The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the ' +
        'Wichianmat landrace, one of several varieties of cat native to Thailand (formerly known as ' +
        'Siam), the original Siamese became one of the most popular breeds in Europe and North America in ' +
        'the 19th century. The carefully refined, more extreme-featured, modern-style Siamese is ' +
        'characterized by blue almond-shaped eyes; a triangular head shape; large ears; an elongated, ' +
        'slender, and muscular body; and various forms of point colouration. Other than colouration, the ' +
        'modern-style Siamese bears little resemblance to the original stock, and the more moderate, ' +
        'traditional, or "old-style" Siamese, with a much rounder head and body, has been re-established ' +
        'by multiple registries as the Thai cat. The International Cat Association describes the modern ' +
        'Siamese as affectionate, social, intelligent, and playful into adulthood, often enjoying a game ' +
        'of fetch. Siamese tend to seek human interaction and also like companionship from other cats...',
        link: 'https://en.wikipedia.org/wiki/Siamese_cat',
        image: {
            url: './img/siamese.jpg',
            alt: 'Siamese cat image'
        }
    },
    {
        id: 1,
        title: 'British Shorthair',
        text: 'The British Shorthair is the pedigreed version of the traditional British domestic cat, with a distinctively stocky body, ' +
        'dense coat, and broad face. The most familiar color variant is the "British Blue," a solid grey-blue coat, orange eyes, ' +
        'and a medium-sized tail. The breed has also been developed in a wide range of other colours and patterns, including tabby and colorpoint. ' +
        "It is one of the most ancient cat breeds known. In modern times, it remains the most popular pedigreed breed in its native country, as registered by the UK's " +
        'Governing Council of the Cat Fancy (GCCF). A quarter of all kittens registered with the GCCF each year are British Shorthairs, ' +
        'making the British the most popular pedigree cat in the UK. ' +
        "The breed's good-natured appearance and relatively calm temperament make it a frequent media star, notably as the inspiration " +
        "for John Tenniel's famous illustration of the Cheshire Cat from Alice in Wonderland. The Cat Fanciers' Association " +
        'profile reads: "When gracelessness is observed, the British Shorthair is duly embarrassed, quickly recovering ' +
        "with a 'Cheshire cat smile...",
        link: 'https://en.wikipedia.org/wiki/British_Shorthair',
        image: {
            url: './img/britanets.jpg',
            alt: 'British cat image'
        }
    },

    {
        id: 2,
        title: 'Maine Coon',
        text: 'The Maine Coon is the largest domesticated cat breed. It has a distinctive physical appearance and valuable ' +
        'hunting skills. It is one of the oldest natural breeds in North America, specifically native to the US state of Maine, ' +
        'where it is the official state cat.' +
        'The Maine Coon is a large and sociable cat, hence its nickname, "the gentle giant". It is characterized by a ' +
        'prominent ruff along its chest, robust bone structure, rectangular body shape, an uneven two-layered coat ' +
        'with longer guard hairs over a silky satin undercoat, and a long, bushy tail. ' +
        "The breed\'s colors vary widely, with only lilac and chocolate disallowed for pedigree. Reputed for its intelligence " +
        'and playful, gentle personality, the Maine Coon is often cited as having "dog-like" characteristics...',
        link: 'https://en.wikipedia.org/wiki/Maine_Coon',
        image: {
            url: './img/maine_coon.jpg',
            alt: 'Maine Coon cat image'
        }
    },

    {
        id: 3,
        title: 'Sphynx cat',
        text: 'The Sphynx cat is a breed of cat known for its lack of coat (fur). Hairlessness in cats is a ' +
        'naturally occurring genetic mutation; however, the Sphynx cat, as a breed, was developed through selective breeding, ' +
        'starting in the 1960s. The skin should have the texture of chamois leather, as it has fine hairs, ' +
        'or the cat may be completely hairless. Whiskers may be present, either whole or broken, or may be totally absent. ' +
        'The cats have a narrow, long head and webbed feet. Their skin is the color that their fur would be, and all ' +
        "the usual cat markings (solid, point, van, tabby, tortie, etc.) may be found on the Sphynx cat's skin. " +
        "Because they have no fur they lose more body heat than coated cats which makes them warm to the touch and prone to finding warm places...",
        link: 'https://en.wikipedia.org/wiki/Sphynx_cat',
        image: {
            url: './img/canadian_sphinx.jpg',
            alt: 'Canadian Sphynx cat image'
        }
    },

    {
        id: 4,
        title: 'Turkish Angora',
        text: "The Turkish Angora (Turkish: Ankara kedisi, 'Ankara cat') is a breed of domestic cat. Turkish Angoras " +
        "are one of the ancient, natural breeds of cat, having originated in central Turkey, in the Ankara region. " +
        "The breed has been documented as early as the 17th century and is believed to be the origin of the mutations " +
        "for both the color white[citation needed] and long hair[citation needed]. " +
        "The breed is also sometimes referred to as simply the Angora or Ankara cat...",
        link: 'https://en.wikipedia.org/wiki/Turkish_Angora',
        image: {
            url: './img/angorra.jpg',
            alt: 'Angorra cat image'
        }
    },
];

const menu = document.querySelector('.catalog-list');
const menuItems = document.querySelectorAll('.catalog-link');
const card = document.querySelector('.card');

// menuItems.forEach(item => item.addEventListener('click', toggleCatalog));
menu.addEventListener('click', toggleCatalog);
menu.addEventListener('keyup', function (event) {
    if (event.keyCode === 32) {
        toggleCatalog(event);
    }
});

// Animate appearance of the card
function animate(item) {
    let opacity = +item.style.opacity;
    if (opacity < 1) {
        opacity += 0.05;
        item.style.opacity = opacity.toString();
        setTimeout(animate, 50, item);
    }
}


// Fill card
function createPattern(item, node) {
    // Update image
    const img = node.querySelector(`.${IMG_CLASS_NAME}`);
    img.setAttribute('alt', item.image.alt);
    img.setAttribute('src', item.image.url);
    // Update data
    const caption = node.querySelector(`.${CARD_DESCRIPTION_CLASS_NAME}`);
    caption.querySelector(`.${CARD_TITLE_CLASS_NAME}`).textContent = item.title;
    caption.querySelector(`.${CARD_TEXT_CLASS_NAME}`).textContent = item.text;
    caption.querySelector(`.${CARD_LINK_CLASS_NAME}`).setAttribute('href', item.link);
    const cardItem = card.querySelector('.card-item');
    cardItem.style.opacity = 0;
    animate(cardItem);
}


// Execute on click of menu item
function toggleCatalog(event) {
    // Prevent link's behaviour
    event.preventDefault();
    // Delete active class
    menuItems.forEach(item => item.classList.remove('catalog-link__active'));
    // Get current item of the menu
    const menuItem = event.target;
    // Add active class
    menuItem.classList.add('catalog-link__active');
    // Get catalog item for current menu item
    const index = Array.from(menuItems).indexOf(menuItem);
    let catalogItem = catalogItemsList.filter(item => item.id === index)[0];
    // Update content
    createPattern(catalogItem, card);
}


// Create initial content
function createContent() {
    // First item of the menu is active by default
    menuItems[0].classList.add('catalog-link__active');
    const catalogItem = catalogItemsList[0];
    // Create elements for content
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const title = document.createElement('h2');
    const text = document.createElement('p');
    const link = document.createElement('a');
    // Add classes to elements
    figure.classList.add('card-item');
    image.classList.add(IMG_CLASS_NAME);
    figcaption.classList.add(CARD_DESCRIPTION_CLASS_NAME);
    title.classList.add(CARD_TITLE_CLASS_NAME);
    text.classList.add(CARD_TEXT_CLASS_NAME);
    link.classList.add(CARD_LINK_CLASS_NAME);
    link.textContent = 'Read more >>';
    link.setAttribute('target', '_blank');
    // Create structure
    [title, text, link].forEach(item => figcaption.appendChild(item));
    [image, figcaption].forEach(item => figure.appendChild(item));
    card.appendChild(figure);
    // Fill content
    createPattern(catalogItem, card);
}


window.addEventListener('load', createContent);
