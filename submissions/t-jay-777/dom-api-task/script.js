//create an array of objects of my dom menu content
const contentList = [
    {
        id: 000,
        name: 'Big Mac @ McDonald’s',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/000-Big-Mac.jpg',
        text: 'Call us crazy, but how can we possibly leave out a burger that sells 550 million times each year in America alone?\
        That means that every second, there are 17 people across the country stuffing their face with the McDonald\’s icon.\
        It might not be topped with exotic truffles of served alongside a sparkly bottle of rear 1950s Champagne, but it sells.\
        And with those kinds of astronomical numbers, it must be doing something right.\
        It’s layers of meat and bread, plus shredded lettuce, pickles and McDonald’s special Big Mac sauce,\
        all served on a sesame bun - and apparently, the world can’t get enough of it.',
    },
    {
        id: 001,
        name: 'FleurBurger @ Fleur',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/001-FleurBurger.jpg',
        text: 'Arguably, a quick burger feed at Shake Shack or In-N-Out will do the trick,\
        and with a bill of under $10, it’s hard to say no. Over at the Fleur restaurant in Las Vegas, however, $10 won\’t\
        even get you a napkin. The FleurBurger, which is considered to be one of the world’s best burgers,\
        and definitely of the most expensive, comes in at a whopping $5,000 price tag.</br>\
        Is it worth that extraordinary amount? Well, most people seem to think so.\
        The dish comes together as an amalgamation of foie gras, plenty of truffles, the highest quality Kobe beef,\
        and is served alongside a rare bottle of Petrus.',
    },
    {
        id: 002,
        name: 'The Butchers Club Burger @ The Butchers Club',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/002-0AThe-Butchers-Club-Burger.jpg',
        text: 'It might come as a bit of a surprise to find one of the world’s best burgers (a dish which is typically American)\
        in an Asian locale, however, when we consider the number of internationals in the city, as well as the fact that its executive\
        chef is from Canada, it starts to make a little more sense. He even said himself that “hamburgers are something you grow\
        up eating in North America”, and he’s brought that tradition and excellence to Hong Kong.\
        Over in Tin Wan, The Butchers Club’s specialty burger is made up of dry-aged Angus beef burger with maple-glazed bacon,\
        aged cheddar, and caramelized onion burger sauce. Yum.',
    },
    {
        id: 003,
        name: 'The Smokey Burger @ Burger Liquor',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/003-The-Smokey-Burger-at-Burger-Liquor.jpg',
        text: 'Yes, everything’s bigger in Texas, but for our next stop, we’re heading down to Wellington, New Zealand, where,\
        apparently, everything’s more delicious. Over at Burger Liquor, the owners wanted to dish up top-of-the-range burgers and\
        drinks, without customers having to wait half an hour, and they’ve executed their vision to perfection.\
        The Smokey Burger, its frontrunner meal, is served with an A-grade patty, topped with streaky and delicious free-range bacon,\
        double-crumbed onion rings, a special Thai sauce, and a brioche bun. It’s become a hit with locals, however, is\
        mostly yet to be discovered by internationals, though it’s only a matter of time.',
    },
    {
        id: 004,
        name: 'The Ozersky Burger',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/004-The-Ozersky-Burger.jpg',
        text: 'When you’ve been rated as the best burger in Dallas, a city with a booming foodie scene,\
        then you know you’ve done something rather extraordinary. That’s exactly the case with The Ozersky Burger at Knife Dallas,\
        named after burger aficionado Josh Ozersky (who preferred his meals to be very simplistic).\
        There’s nothing too fancy and nothing too unique about the Ozersky, it’s just a basic burger served up perfectly.\
        The 44 Farms beef is clean, the red onions are sliced to just the right level on thinness, and the pickles give\
        it the overall balance to make it a real ten out of ten for execution.',
    },
    {
        id: 005,
        name: 'The Burger @ Dirty Bones',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/005-dirty-bones-burger-london.jpg',
        text: 'With six ounces of aged beef alongside black treacle bacon, gooey gorgonzola sauce, pickled jalapeños, baby\
        spinach and a slathering of garlic aioli, ‘The Burger’ at Dirty Bones in Kensington, London is sure to satisfy burger enthusiasts,\
        be them from the area or from afar. It’s constantly rated amongst the most impressive burgers, not only citywide but across the continent.\
        The locale serves us various styles of New York comfort food and cocktails, but the burgers are where it truly shines.\
        Aside from its signature burger, the chefs have also conjured up burgers smeared with Welsh rarebit, and well as Cheeseburger Dumplings.',
    },
    {
        id: 006,
        name: 'American Burger @ Gordon Ramsay Burger',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/006-gordon-ramsay-american-burger-las-vegas.jpg',
        text: 'With six ounces of aged beef alongside black treacle bacon, gooey gorgonzola sauce, pickled jalapeños,\
        baby spinach and a slathering of garlic aioli, ‘The Burger’ at Dirty Bones in Kensington, London is sure to satisfy burger enthusiasts,\
        be them from the area or from afar. It’s constantly rated amongst the most impressive burgers, not only citywide but across the continent.\
        The locale serves us various styles of New York comfort food and cocktails, but the burgers are where it truly shines.\
        Aside from its signature burger, the chefs have also conjured up burgers smeared with Welsh rarebit, and well as Cheeseburger Dumplings.',
    },
    {
        id: 007,
        name: 'The Jackie-O @ Fat Bobs Bar & Grill',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/007-fat-bobs-burger.jpg',
        text: 'For the next leg of our juicy burger journey around the world, we’re heading all the way to the Land Down Under,\
        specifically the southeastern suburbs of Melbourne. In the industrial Moorabbin area, burger enthusiasts are shocked to find one of\
        the country’s best nestled in a place you wouldn’t ordinarily expect. The aesthetic takes inspiration from the classic 1950s\
        American diners, lined with neon and old-school signage.\
        Its go-to burger, the Jackie-O, is made up a 180 grams of succulent beef pattie, plus your classic garnishes: tomato,\
        fontina cheese, red onion, lettuce, mustard, and a dollop of Fat Bob\'s magic sauce.',
    },
    {
        id: 008,
        name: 'The Burger @ Raoul\'s',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/008-The-Burger0ARaouls.jpg',
        text: 'Nestled on Prince St in Soho, Lower Manhattan, New York, Raoul\'s offers a unique Parisian atmosphere\
        with one of the world’s most devourable burgers. With such a revered reputation, Raoul’s needs to limit their burger\
        production, otherwise they’d never be able to meet the demand - the restaurant only makes 12 burgers a night, so samplings are competitive.\
        The seared patty on ‘‘The Burger’ is heavy with brisket and sprinkled with peppercorns and salt, much like your classic\
        peppered steak. It’s served with sliced red onions, cornichons, and peppery greens, all on a challah roll, alongside a delectable\
        cream-and-cognac au poivre sauce like no other.',
    },
    {
        id: 009,
        name: 'Bleecker Black Burger @ Bleecker',
        url: 'https://github.com/t-jay-777/dom.github.io/blob/main/img/009-Bleecker-Black-Burger.jpg',
        text: 'Burger lovers will find this juicy plate of goodness over at Bleecker in London, which is aptly named\
        after the owner Zan Kaufman’s favorite street in Manhattan. The restaurant has received the astounding accolade of the city\'s best\
        burger not once, but twice, voted by Time Out London.\
        The owner was inspired by a burger she tasted when in New York, so decided to drop everything,\
        move all the way across the pond and open up her own burger joint - and the determination and care really shine in\
        the burgers, particularly the notorious Bleecker Black. No need for cutlery here, it’s all about getting down and dirty with your burger mistress.',
    },
];

//Find object by id in an array of JavaScript objects 
//https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
const getElemId = (items, id) => items.find(item => item.id === id);
//clear input or clecked  smth in html file
//https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
const clearHTML = node => node.innerHTML = '';

//https://plnkr.co/edit/VaT2rCMbRm1QGymC?p=preview&preview
const burgerElem = document.getElementById('main');
const menuElem = burgerElem.querySelector('.title');

//rendering list of li and button tags
const renderListItem = ({ name, id }, activeID) => {
    //create button
    //https://www.w3schools.com/jsref/met_document_createelement.asp
    const button = document.createElement('button');
    //creating li
    const item = document.createElement('li');
    //Node.innerText - это свойство, позволяющее задавать или получать текстовое содержимое элемента и его потомков
    button.innerText = name;
    button.type = 'button';
    button.id = id;

    if (activeID === id) {
        button.className = 'active button';
    } else {
        button.className = 'button';
    }
    //https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append
    item.append(button);

    return item;
};

//rendering list
const renderListItems = (items, activeID) => {
    const burgerListElem = document.querySelector('.burger-list');
    //clear existing list if it is
    clearHTML(burgerListElem);
    //https://www.w3schools.com/jsref/met_document_createdocumentfragment.asp
    //https://habr.com/ru/post/413287/
    //https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
    const fragment = document.createDocumentFragment();
    //items.forEach((item) => fragment.append(renderListItem(item, activeID)));
    //append buttons and li 
    items.map((item) => fragment.append(renderListItem(item, activeID)));

    burgerListElem.append(fragment);
};

//rendering images
const renderContent = (activePageId) => {
    //getting destructured list of images id
    const { url } = getElemId(contentList, activePageId);
    //selet class name "content"
    const contentElement = document.querySelector('.content');
    //create image tag
    const image = document.createElement('img');
    image.src = url;

    clearHTML(contentElement);
    contentElement.append(image);
};

//rendering images and buttons
const render = (state) => {
    renderListItems(state.burgers, state.activePageId);
    renderContent(state.activePageId);
};

//hiding rendered images and buttons
const notRender = (state) => {
    renderListItems(state.burgers, state.activePageId);
    //renderContent(state.activePageId);
};

//interaction on click
const init = () => {
    const burgersList = document.querySelector('.burger-list');
    //set object of state changing
    //In response to state changes, the component is rendered
    const state = {
        burgers: contentList,
        activePageId: 0,
    }
    //to do when click
    const handleListItemClick = (evt) => {
        const { target } = evt;
        const currentID = parseInt(target.id, 10);

        const isNeedRerender = currentID !== state.activePageId;
        if (target.tagName !== 'BUTTON' || !isNeedRerender) {
            return;
        }

        state.activePageId = currentID;
        render(state);
    }

    burgersList.addEventListener('click', handleListItemClick);

    render(state);
};

const noInit = () => {
    const state = {};
    
    render(state);
};

//open after click on buttom
function afterClick() {
    burgerElem.classList.toggle('open');
    (document.querySelector('.burgers').classList.contains("open"))?init():noInit();

    
    // if (document.querySelector('.burgers').classList.contains("open")) {
    //     init();
    // } else {
    //     noInit();
    //     //burgerElem.classList.toggle('hidden');
    // }
}

menuElem.onclick = afterClick;
