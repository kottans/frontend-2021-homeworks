//create an array of objects of my dom menu content
const contentList = [
    {
        id: 000,
        name: 'Big Mac @ McDonald’s',
        url: 'img/000-Big-Mac.jpg',
        text: '',
    },
    {
        id: 001,
        name: 'FleurBurger @ Fleur',
        url: 'img/001-FleurBurger.jpg',
        text: '',
    },
    {
        id: 002,
        name: 'The Butchers Club Burger @ The Butchers Club',
        url: 'img/002-0AThe-Butchers-Club-Burger.jpg',
        text: '',
    },
    {
        id: 003,
        name: 'The Smokey Burger @ Burger Liquor',
        url: 'img/003-The-Smokey-Burger-at-Burger-Liquor.jpg',
        text: '',
    },
    {
        id: 004,
        name: 'The Ozersky Burger',
        url: 'img/004-The-Ozersky-Burger.jpg',
        text: '',
    },
    {
        id: 005,
        name: 'The Burger @ Dirty Bones',
        url: 'img/005-dirty-bones-burger-london.jpg',
        text: '',
    },
    {
        id: 006,
        name: 'American Burger @ Gordon Ramsay Burger',
        url: 'img/006-gordon-ramsay-american-burger-las-vegas.jpg',
        text: '',
    },
    {
        id: 007,
        name: 'The Jackie-O @ Fat Bobs Bar & Grill',
        url: 'img/007-fat-bobs-burger.jpg',
        text: '',
    },
    {
        id: 008,
        name: 'The Burger @ Raoul\'s',
        url: 'img/008-The-Burger0ARaouls.jpg',
        text: '',
    },
    {
        id: 009,
        name: 'Bleecker Black Burger @ Bleecker',
        url: 'img/009-Bleecker-Black-Burger.jpg',
        text: '',
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
