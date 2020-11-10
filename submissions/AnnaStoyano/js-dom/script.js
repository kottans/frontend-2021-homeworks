const downloadInfoFromJson = function () {
    let promise = fetch('./information.json');
    promise.then(res => res.json())
        .then(data => {
            addMenuItems(data.faculties);
            addContentItems(data.faculties);
            addMenuHandler(data);
            addMenuIconHandler();
        })      
}

document.addEventListener('DOMContentLoaded',downloadInfoFromJson);

const addMenuItems = function (arr) {
    let menu = document.querySelector('.menu');
    let menuFragment = document.createDocumentFragment();
    arr.forEach((element, index) => {
        let menuItem = document.createElement('li');
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.textContent = element.name;
        menuItem.insertAdjacentElement('afterbegin', link);
        menuItem.classList.add("menu-item", element.name.toLowerCase());
        if (index === 0) {
            menuItem.classList.add('active');
        }
        menuFragment.appendChild(menuItem);
    });
    menu.appendChild(menuFragment);
}

const addContentItems = function (arr) {
    let content = document.querySelector('.content');
    let contentFr = document.createDocumentFragment();

    arr.forEach((element, index) => {
        let contentItem = document.createElement('div');
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let desc = document.createElement('div');
        img.setAttribute('src', element.img);
        img.setAttribute('alt', element.name + '-logo');
        figure.appendChild(img);
        desc.textContent = element.description;
        desc.classList.add('description');
        figure.classList.add('logo');
        contentItem.insertAdjacentElement('afterbegin', figure);
        contentItem.insertAdjacentElement('beforeend', desc);
        contentItem.classList.add('content-item',element.name.toLowerCase());
        if (index === 0) {
            contentItem.classList.add('active');
        }
        contentFr.appendChild(contentItem);
    })

    content.appendChild(contentFr);
}

const addMenuIconHandler = function () {
    const button = document.querySelector('.menu-icon');
    button.addEventListener('click', function () {
        button.classList.toggle('active');
    })
}

const addMenuHandler = function(data){
    const menu = document.querySelector('.menu');
    menu.addEventListener('click',function(e){
        e.preventDefault();
        let target = e.target;
        let menuItemClick = target.parentElement;
        const activeMenuItem = menu.querySelector('.active');
        activeMenuItem.classList.remove('active');
        menuItemClick.classList.add('active');
        addActiveContent(menuItemClick); 
        setBgColorForParent(data); 
    })
}

const addActiveContent = function(item){
    const activeContentItem = document.querySelector('.content .active');
    activeContentItem.classList.remove('active');
    let faculty = checkFaculty(item);
    const contentItem = document.querySelector(`.content .${faculty}`);
    contentItem.classList.add('active');
}

const checkFaculty = function(item){
    let faculty;
    switch(true){
        case item.classList.contains('gryffindor'):
            faculty = 'gryffindor';
            break;
        case item.classList.contains('hufflepuf'):
            faculty = 'hufflepuf';
            break;
        
        case item.classList.contains('ravenclaw'):
            faculty = 'ravenclaw';
            break;
        
        case item.classList.contains('slytherin'):
            faculty = 'slytherin';
            break;      
    }
    return faculty;
}

const setBgColorForParent = function(data){
    const activeContentItem = document.querySelector('.content .active');
    let facultyItemClassName = checkFaculty(activeContentItem);
    let faculty = data.faculties.find(item=>item.name.toLowerCase() == facultyItemClassName);
    activeContentItem.parentElement.style.backgroundColor = faculty.bc;
}
