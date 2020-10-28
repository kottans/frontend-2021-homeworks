const styles = {
    menuLink: 'menu__link',
    menuItem: 'menu__item',
    heroItem: 'hero__item',
    heroImg: 'hero__image',
    itemIcon: 'item__icon',
    itemTitle: 'item__caption',
    itemPrice: 'item__price',
    itemInfo: 'item__description'
};

async function fetchAsync () {
    let response = await fetch('./data/data.json');
    let data = await response.json();
    return data;
}   
  
fetchAsync()
    .then(data => {
        let details = createHtml(data);
        drawPage(details);
        toggleTabs();
        animation();
    })
    .catch(reason => console.log(reason.message));

function createHtml(data) {
    const menuItems = document.createDocumentFragment();
    const heroItems = document.createDocumentFragment();
    data.pancakes.forEach((elem, index) => {
        const navContent = generateNavContent(elem, index); 
        const heroContent = generateHeroContent(elem, index); 
        menuItems.appendChild(navContent);
        heroItems.appendChild(heroContent);
    });
    return {
        menuItems,
        heroItems
    };
}

function generateNavContent(elem, index) {
    let navItem = generateElement('li', styles.menuItem);
    let navLink = `<a class=${styles.menuLink} href='#' id=link${index+1}>${elem.title}</a>`;
    navItem.insertAdjacentHTML('afterbegin', navLink);
    return navItem;
}

function generateHeroContent(elem, index) {
    let sectionItem = generateElement('div', styles.heroItem);
    sectionItem.setAttribute('id', `tab${index+1}`);
    let sectionItemContent = `
        <div class=${styles.itemPrice}>Price for portion ${elem.price} $</div>
        <figure class=${styles.heroImg} id='tab${index+1}'>
            <img class=${styles.itemIcon} src=${elem.path} />
            <figcaption class=${styles.itemTitle}>Pancakes ${elem.title}</figcaption>
        </figure>
        <div class=${styles.itemInfo}>${elem.description}</div>
    `;
    sectionItem.insertAdjacentHTML('afterbegin', sectionItemContent);
    return sectionItem;
}

function generateElement(elementName, className) {
    let item = document.createElement(elementName);
    item.classList.add(className);
    return item;
}

function drawPage(details) {
    document.querySelector('.nav__menu').appendChild(details.menuItems);
    document.querySelector('.hero').appendChild(details.heroItems);
}

function toggleTabs(){
    document.querySelectorAll('.menu__link').forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const index = e.target.getAttribute('id').replace('link', 'tab');
            document.querySelectorAll('.menu__link').forEach(item => item.classList.remove('menu__link--active'));
            document.querySelectorAll('.hero__item').forEach(item => item.classList.remove('hero__item--active'));
            elem.classList.add('menu__link--active'); 
            document.getElementById(index).classList.add('hero__item--active');
        });
    });
    document.querySelector('.menu__link').click();
}

function animation(){
    const heroImgHolders = document.querySelectorAll(".hero__image");
    heroImgHolders.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            item.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        item.addEventListener("mouseleave", (e) => {
            item.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    });
}

