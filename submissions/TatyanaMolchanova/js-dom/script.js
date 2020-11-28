const animalsData = {
    'cats': {
        'menuTitle': 'Cats',
        'title': 'Cats are awesome',
        'info': 'Having a cat can mean different things to different people. Some want a cat to cuddle and sit on their laps; others are happy to live with a very independent cat which spends most of its time outside and doesn’t want too much human interaction.',
        'image': 'cat'
    },
    'dogs': {
        'menuTitle': 'Dogs',
        'title': 'Dogs are awesome',
        'info': 'The dog (Canis familiaris when considered a distinct species or Canis lupus familiaris when considered a subspecies of the wolf)[5] is a domesticated carnivore of the family Canidae. It is part of the wolf-like canids,[6] and is the most widely abundant terrestrial carnivore.[7][8][9][10][11] The dog and the extant gray wolf are sister taxa as modern wolves are not closely related to the wolves that were first domesticated,[12][13][14] which implies that the direct ancestor of the dog is extinct.[15] The dog was the first species to be domesticated,[14][16] and has been selectively bred over millennia for various behaviors, sensory capabilities, and physical attributes.[17]',
        'image': 'dog'
    },
    'lions': {
        'menuTitle': 'Lions',
        'class': 'lions',
        'title': 'Lions are awesome',
        'info': 'The lion (Panthera leo) is a species in the family Felidae and a member of the genus Panthera. It has a muscular, deep-chested body, short, rounded head, round ears, and a hairy tuft at the end of its tail. It is sexually dimorphic; adult male lions have a prominent mane. With a typical head-to-body length of 184–208 cm (72–82 in) they are larger than females at 160–184 cm (63–72 in). It is a social species, forming groups called prides. A lion pride consists of a few adult males, related females and cubs. Groups of female lions usually hunt together, preying mostly on large ungulates. The lion is an apex and keystone predator; although some lions scavenge when opportunities occur and have been known to hunt humans, the species typically does not.',
        'image': 'lions'
    },
    'tigers': {
        'menuTitle': 'Tigers',
        'title': 'Tigers are awesome',
        'info': 'There are two recognized subspecies of tiger*: the continental (Panthera tigris tigris) and the Sunda (Panthera tigris sondaica). The largest of all the Asian big cats, tigers rely primarily on sight and sound rather than smell for hunting. They typically hunt alone and stalk prey. A tiger can consume more than 80 pounds of meat at one time. On average, tigers give birth to two to four cubs every two years. If all the cubs in one litter die, a second litter may be produced within five months.',
        'image': 'tigers'
    },
    'hares': {
        'menuTitle': 'Hares',
        'title': 'Hares are awesome',
        'info': 'Hares and jackrabbits are leporids belonging to the genus Lepus. Hares are classified in the same family as rabbits. They are similar in size and form to rabbits and have similar herbivorous diets, but generally have longer ears and live solitarily or in pairs. Also unlike rabbits, their young are able to fend for themselves shortly after birth rather than emerging blind and helpless. Most are fast runners. Hare species are native to Africa, Eurasia and North America.',
        'image': 'hare'
    },
    'elephants': {
        'menuTitle': 'Elephants',
        'title': 'Elephants are awesome',
        'info': 'Elephants are mammals of the family Elephantidae and the largest existing land animals. Three species are currently recognised: the African bush elephant, the African forest elephant, and the Asian elephant. Elephantidae is the only surviving family of the order Proboscidea; extinct members include the mastodons. The family Elephantidae also contains several now-extinct groups, including the mammoths and straight-tusked elephants. African elephants have larger ears and concave backs, whereas Asian elephants have smaller ears, and convex or level backs. Distinctive features of all elephants include a long proboscis called a trunk, tusks, large ear flaps, massive legs, and tough but sensitive skin. The trunk is used for breathing, bringing food and water to the mouth, and grasping objects. Tusks, which are derived from the incisor teeth, serve both as weapons and as tools for moving objects and digging. The large ear flaps assist in maintaining a constant body temperature as well as in communication. The pillar-like legs carry their great weight.',
        'image': 'elephant'
    },
}

const menu = document.createElement('ul'),
    title = document.querySelector('.main h2'),
    info = document.querySelector('.main p'),
    image = document.querySelectorAll('.main img');

function createMenu() {
    const aside = document.querySelector('aside');

    menu.classList.add('menu');

    for (const prop in animalsData) {
        const liMenu = document.createElement('li');
        liMenu.classList.add('menu__item');
        liMenu.setAttribute('data-item', prop);
        liMenu.textContent = animalsData[prop].menuTitle;
        menu.append(liMenu);
    }

    aside.append(menu);

    const firstLiMenu = document.querySelectorAll('li')[0].classList.add('active');

}

function addInitialContent() {
    title.textContent = animalsData.cats.title;
    info.textContent = animalsData.cats.info;

    image.forEach(function(item, index) {
        item.src = `images/${animalsData.cats.image}${index+1}.jpg`;
    });
}

let refreshContent = ({target}) => {
    
    if (target.classList.contains('menu__item')) {

        const activeMenuItem = document.querySelector('.menu__item.active');

        if (activeMenuItem) {
            activeMenuItem.classList.remove('active');
        }
    
        target.classList.add('active');

        const dataAttribute = target.dataset.item;

        title.textContent = animalsData[dataAttribute].title;
        info.textContent = animalsData[dataAttribute].info;
    
        image.forEach(function(item, index) {
            item.src = `images/${animalsData[dataAttribute].image}${index+1}.jpg`;
        })
    }
}

createMenu();

addInitialContent();

menu.addEventListener('click', refreshContent);

