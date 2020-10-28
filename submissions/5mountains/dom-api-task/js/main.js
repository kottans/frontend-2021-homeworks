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
        //nav
        //nav item (li)
        let navItem = document.createElement('li');
        navItem.classList.add('menu__item');
        //nav link (a)
        let navLink = document.createElement('a');
        navLink.classList.add('menu__link');
        navLink.setAttribute('id', `link${index+1}`);
        navLink.setAttribute('href', '#');
        navLink.textContent = elem.title;
        //append elements
        navItem.appendChild(navLink);
        menuItems.appendChild(navItem);
        //content
        //wrap
        let sectionItem = document.createElement('div');
        sectionItem.classList.add('hero__item');
        sectionItem.setAttribute('id', `tab${index+1}`);
        //image wrap html5
        let itemImageContainer = document.createElement('figure');
        itemImageContainer.classList.add('hero__image');
        //img
        let image = document.createElement('img');
        image.setAttribute('src', elem.path);
        //img caption
        let caption = document.createElement('figcaption');
        caption.classList.add('item__caption');
        caption.textContent = `Pancakes ${elem.title}`;
        //price
        let itemPrice = document.createElement('div');
        itemPrice.classList.add('item__price');
        itemPrice.textContent = `Price for portion ${elem.price} $`;
        //descriptions
        let itemDescription = document.createElement('div');
        itemDescription.classList.add('item__description');
        itemDescription.textContent = elem.description;
        //append elements
        itemImageContainer.appendChild(image);
        itemImageContainer.appendChild(caption);
        sectionItem.appendChild(itemPrice);
        sectionItem.appendChild(itemImageContainer);
        sectionItem.appendChild(itemDescription);
        heroItems.appendChild(sectionItem);
    });
    return {
        menuItems,
        heroItems
    };
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

////animation 
function animation(){
    const heroImgHolders = document.querySelectorAll(".hero__image");
    heroImgHolders.forEach(item => {
        item.addEventListener("mousemove", (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            item.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    });
    heroImgHolders.forEach(item => {
        item.addEventListener("mouseenter", (e) => {
            item.style.transition = "none";
            item.firstChild.style.transform = "translateZ(200px)";
            item.lastChild.style.transform = "translateZ(50px)";
        });
    });
    heroImgHolders.forEach(item => {
        item.addEventListener("mouseleave", (e) => {
            item.style.transition = "all 0.5s ease";
            item.style.transform = `rotateY(0deg) rotateX(0deg)`;
            item.lastChild.style.transform = "translateZ(0px)";
            item.firstChild.style.transform = "translateZ(0px)";
        });
    });
}

