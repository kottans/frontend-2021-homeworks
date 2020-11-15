var content = {
    'animal1': {
        'h2': 'Cats are awesome',
        'p': 'Having a cat can mean different things to different people. Some want a cat to cuddle and sit on their laps; others are happy to live with a very independent cat which spends most of its time outside and doesn’t want too much human interaction.',
        'img': 'cat'
    },
    'animal2': {
        'h2': 'Dogs are awesome',
        'p': 'The dog (Canis familiaris when considered a distinct species or Canis lupus familiaris when considered a subspecies of the wolf)[5] is a domesticated carnivore of the family Canidae. It is part of the wolf-like canids,[6] and is the most widely abundant terrestrial carnivore.[7][8][9][10][11] The dog and the extant gray wolf are sister taxa as modern wolves are not closely related to the wolves that were first domesticated,[12][13][14] which implies that the direct ancestor of the dog is extinct.[15] The dog was the first species to be domesticated,[14][16] and has been selectively bred over millennia for various behaviors, sensory capabilities, and physical attributes.[17]',
        'img': 'dog'
    },
    'animal3': {
        'h2': 'Lions are awesome',
        'p': 'The lion (Panthera leo) is a species in the family Felidae and a member of the genus Panthera. It has a muscular, deep-chested body, short, rounded head, round ears, and a hairy tuft at the end of its tail. It is sexually dimorphic; adult male lions have a prominent mane. With a typical head-to-body length of 184–208 cm (72–82 in) they are larger than females at 160–184 cm (63–72 in). It is a social species, forming groups called prides. A lion pride consists of a few adult males, related females and cubs. Groups of female lions usually hunt together, preying mostly on large ungulates. The lion is an apex and keystone predator; although some lions scavenge when opportunities occur and have been known to hunt humans, the species typically does not.',
        'img': 'lions'
    },
    'animal4': {
        'h2': 'Tigers are awesome',
        'p': 'There are two recognized subspecies of tiger*: the continental (Panthera tigris tigris) and the Sunda (Panthera tigris sondaica). The largest of all the Asian big cats, tigers rely primarily on sight and sound rather than smell for hunting. They typically hunt alone and stalk prey. A tiger can consume more than 80 pounds of meat at one time. On average, tigers give birth to two to four cubs every two years. If all the cubs in one litter die, a second litter may be produced within five months.',
        'img': 'tigers'
    },
    'animal5': {
        'h2': 'Hares are awesome',
        'p': 'HHares and jackrabbits are leporids belonging to the genus Lepus. Hares are classified in the same family as rabbits. They are similar in size and form to rabbits and have similar herbivorous diets, but generally have longer ears and live solitarily or in pairs. Also unlike rabbits, their young are able to fend for themselves shortly after birth rather than emerging blind and helpless. Most are fast runners. Hare species are native to Africa, Eurasia and North America.',
        'img': 'hare'
    },
    'animal6': {
        'h2': 'Elephants are awesome',
        'p': 'Elephants are mammals of the family Elephantidae and the largest existing land animals. Three species are currently recognised: the African bush elephant, the African forest elephant, and the Asian elephant. Elephantidae is the only surviving family of the order Proboscidea; extinct members include the mastodons. The family Elephantidae also contains several now-extinct groups, including the mammoths and straight-tusked elephants. African elephants have larger ears and concave backs, whereas Asian elephants have smaller ears, and convex or level backs. Distinctive features of all elephants include a long proboscis called a trunk, tusks, large ear flaps, massive legs, and tough but sensitive skin. The trunk is used for breathing, bringing food and water to the mouth, and grasping objects. Tusks, which are derived from the incisor teeth, serve both as weapons and as tools for moving objects and digging. The large ear flaps assist in maintaining a constant body temperature as well as in communication. The pillar-like legs carry their great weight.',
        'img': 'elephant'
    },
}

var menuItem = document.querySelectorAll('.menu__item'),
    h2 = document.querySelector('.main h2'),
    p = document.querySelector('.main p'),
    img = document.querySelectorAll('.main img'),
    smenuItem = document.querySelectorAll('.menu__item');

menuItem.forEach(function(item) {
    item.addEventListener('click', function(event) {

        menuItem.forEach(function(menu) {
            menu.classList.remove('active');
        })

        event.target.classList.add('active');

        var dataAttribute = event.target.dataset.item;

        h2.textContent = content[dataAttribute].h2;
        p.textContent = content[dataAttribute].p;

        img.forEach(function(item, index) {
            item.src = `images/${content[dataAttribute].img}${index+1}.jpg`;
        })
    })
})
