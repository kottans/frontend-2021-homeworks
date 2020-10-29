const styles = {
    menuLink: 'menu__link',
    menuLinkActive: 'menu__link--active',
    menuItem: 'menu__item',
    heroItem: 'hero__item',
    heroItemActive: 'hero__item--active',
    heroImg: 'hero__image',
    itemIcon: 'item__icon',
    itemTitle: 'item__caption',
    itemPrice: 'item__price',
    itemInfo: 'item__description'
};
const sectionMenu = document.querySelector('.nav__menu');
const sectionHero = document.querySelector('.hero');
const url = './data/data.json';
let selectMenuItem;
let selectHeroItem;

async function fetchAsync () {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}   
  
fetchAsync()
    .then(data => {
        const details = createHtml(data);
        drawPage(details);
        toggleTabs();
    })
    .catch(reason => console.log(reason.message));

function createHtml(data) {
    let navContent  = '';
    let heroContent  = '';
    data.pancakes.forEach((elem, index) => {
        const menuItems = generateNavContent(elem, index); 
        const heroItems = generateHeroContent(elem, index); 
        navContent += menuItems;
        heroContent += heroItems;
    });
    return {
        navContent,
        heroContent
    };
}

function generateNavContent(elem, index) {
    const navLink = `<a class=${styles.menuLink} href='#' id=link${index+1}>${elem.title}</a>`;
    const navElem = `<li class=${styles.menuItem}>${navLink}</li>`;
    return navElem;
}

function generateHeroContent(elem, index) {
    const heroPrice = `<div class=${styles.itemPrice}>Price for portion ${elem.price} $</div>`;
    const heroFigureImg = `<img class=${styles.itemIcon} src=${elem.path} />`;
    const heroFigureCaption = `<figcaption class=${styles.itemTitle}>Pancakes ${elem.title}</figcaption>`;
    const heroFigure = `<figure class=${styles.heroImg} id='tab${index+1}'>${heroFigureImg}${heroFigureCaption}</figure>`;
    const heroInfo = `<div class=${styles.itemInfo}>${elem.description}</div>`;
    const heroElem = `<div class=${styles.heroItem} id='tab${index+1}'>${heroPrice}${heroFigure}${heroInfo}</div>`;
    return heroElem;
}

function drawPage(details) {
    sectionMenu.innerHTML = details.navContent;
    sectionHero.innerHTML = details.heroContent;
}

function toggleTabs(){
    sectionMenu.addEventListener('click', e => {
        e.preventDefault();
        highlightMenuItem(e.target);
        highlightHeroItem(e.target);
    });
    document.querySelector('.menu__link').click();
}

function highlightMenuItem(target) {
    if (selectMenuItem) selectMenuItem.classList.remove(styles.menuLinkActive);
    selectMenuItem = target;
    selectMenuItem.classList.add(styles.menuLinkActive);
}

function highlightHeroItem(target) {
    if (selectHeroItem) selectHeroItem.classList.remove(styles.heroItemActive);
    selectHeroItem = document.getElementById(target.getAttribute('id').replace('link', 'tab'));
    selectHeroItem.classList.add(styles.heroItemActive);
    animation(selectHeroItem);
}

function animation(elem){
    const element = elem.firstChild.nextSibling;
    element.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        element.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    element.addEventListener("mouseleave", (e) => {
        element.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

