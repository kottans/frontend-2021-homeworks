/*
* 
*/
const listTea  = [
  {
    id: '01',
    title : 'Black tea',
    caption: 'Black tea',
    description: 'Black tea is the most common type of tea accounting for upto 85% of total tea consumption in the western world. Black tea is fully oxidised and has darker appearance, stronger flavour and higher caffeine content compared to other teas. The caffeine content in black tea is still around half the level of coffee. Often black teas can be consumed with sugar, milk or lemon and offer some of the same health benefits as other teas.',
    image: './image/black_tea.jpg'
  },{
    id: '02',
    title : 'Green tea ',
    caption: 'Green tea ',
    description: 'Green tea is \'unoxidised\' tea. The leaves are heated soon after picking in order to destroy the enzymes that cause oxidation. This type of processing preserves a high level of antioxidants, vitamins and minerals accounting for the various health benefits of green tea. The infusion is pale greenish yellow in colour and tastes light and grassy. It is best consumed without any additives, although some people may prefer to add lemon or a sweetener but not milk.',
    image: './image/green_tea.jpg'
  },{
    id: '03',
    title : 'Oolong tea',
    caption: 'Oolong tea',
    description: 'Oolong tea is semi-oxidized, so the leaf is allowed to sit for maybe 2-4 hours, before being heated up to halt oxidization. The amount of oxidation affects the flavour and appearance of the tea. Longer oxidization results in a darker oolong which is more similar in taste to a black tea, while shorter oxidization makes it more similar in nature to green tea. When steeped, Oolong tea produces golden or light brown tea with a very delicate flavour resembling neither black nor green tea.',
    image: './image/oolong_tea.jpg'
  },{
    id: '04',
    title : 'White tea',
    caption: 'White tea',
    description: 'White tea is the least processed of all teas. Only the unopened buds and young leaves covered in silver fuzz are used, and they are merely withered and dried. White tea produces a very light coloured infusion with mild flavour. Its caffeine content is even lower than that of green tea and is considered to have a very high level of antioxidants. White tea is best consumed without any additives at all.',
    image: './image/white tea.jpg'
  },{
    id: '05',
    title : 'Pu-erh tea',
    caption: 'Pu-erh tea',
    description: 'Pu-erh tea is a special type of tea that comes from the Yunan province of China and is known for its earthy flavour. It is made out of tea plucked from wild tea trees rather than cultivated bushes and the leaves go through microbial fermentation by pressing the raw leaves together and then storing them for maturity. Pu-erh tea can be either black or green depending on the level of oxidation allowed in the process. Although we don\'t stock any Pu-erh tea on its own, our Coffee Truffle tea has Pu-erh tea as the base onto which we have added coffee beans and cocoa pieces to give it a rich coffee chocolate flavour.',
    image: './image/pu_erh-tea.jpg'
  }
];

let menuList = document.querySelector('.nav__menu');
let mainSection = document.querySelector('.main');

const createItemMenu = ({id, title}) => `<button type="button" id="${id}" class="menu__button">${title}</button>`;
const createArticle = ({caption, image, description}) => `<h1>${caption}</h1>
                                                          <img src="${image}" alt="${caption}">
                                                          <p>${description}</p>`;

const showArticle = (item) => {  
  const newArticle = document.createElement('article');    
  newArticle.classList.add('main__article');
  newArticle.innerHTML = createArticle(item);
  mainSection.appendChild(newArticle);
};
const createMenu = (list) => {
  const fragmentMenu = document.createDocumentFragment();
  list.forEach(item => {
    const newItem = document.createElement('li');
    newItem.classList.add('menu__item');
    newItem.innerHTML = createItemMenu(item);
    fragmentMenu.appendChild(newItem);
  });
  return fragmentMenu;
};
const toggleActive = (elem) => {
  const lastActive = document.querySelector(`.${elem.target.classList.item(0)}.active`);
  lastActive.classList.remove('active');
  elem.target.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {

  menuList.appendChild(createMenu(listTea));

  menuList.querySelector('.menu__button').classList.add('active');
  showArticle(listTea[0]); 

  menuList.addEventListener('click', (elem) => {
    
    toggleActive(elem);

    mainSection.querySelector('article').remove();
    showArticle(listTea.filter(item => item.id === elem.target.id)[0]);
  });


  /* Open the navigation when the menu ison is clicked.*/
  let toggleButton = document.querySelector('#toggle_menu');
  let navBar = document.querySelector('#nav_bar');

  toggleButton.addEventListener('click', function(e) {
    navBar.classList.toggle('open');
    e.stopPropagation();
  });
  mainSection.addEventListener('click', function() {
    navBar.classList.remove('open');
  });

});


