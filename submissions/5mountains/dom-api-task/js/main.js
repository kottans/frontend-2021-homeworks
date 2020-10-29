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
    return `<li class=${styles.menuItem}>
                <a class=${styles.menuLink} href='#' id=link${index+1}>${elem.title}</a>
            </li>`;
}

function generateHeroContent(elem, index) {
    return `<div class=${styles.heroItem} id='tab${index+1}'>
                <div class=${styles.itemPrice}>Price for portion ${elem.price} $</div>
                <figure class=${styles.heroImg} id='tab${index+1}'>
                    <img class=${styles.itemIcon} src=${elem.path}>
                    <figcaption class=${styles.itemTitle}>Pancakes ${elem.title}</figcaption>
                </figure>
                <div class=${styles.itemInfo}>${elem.description}</div>
            </div>`;
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
    animateDish(selectHeroItem);
}

function animateDish(elem){
    const element = elem.querySelector('.hero__image');
    element.addEventListener("mousemove", (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        element.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    element.addEventListener("mouseleave", (e) => {
        element.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
}

function initApp() {
    fetchAsync().then(data => {
            const details = createHtml(data);
            drawPage(details);
            toggleTabs();
        })
        .catch(reason => console.error(reason.message));
}

document.addEventListener('DOMContentLoaded', init = () => {
    initApp();
    document.removeEventListener('DOMContentLoaded', init);
});

