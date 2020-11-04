const downloadInfoFromJson = function () {
    let promise = fetch('./information.json');
    promise.then(res => res.json())
        .then(data => {
            addMenuItems(data.faculties);
            addContentItems(data.faculties);
            return data;
        })
        .then(data=>{
            menuHandler(data);
            menuIconHandler();
        })      
}

document.addEventListener('DOMContentLoaded',downloadInfoFromJson);

const addMenuItems = function (arr) {
    let menu = document.querySelector('.menu');
    let menuFr = document.createDocumentFragment();
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
        menuFr.appendChild(menuItem);
    });
    menu.appendChild(menuFr);
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

const menuIconHandler = function () {
    let button = document.querySelector('.menu-icon');
    button.addEventListener('click', function () {
        button.classList.toggle('active');
    })
}

const menuHandler = function(data){
    let menu = document.querySelector('.menu');
    let content = document.querySelector('.content');
    menu.addEventListener('click',function(e){
        e.preventDefault();
        let target = e.target;
        let menuItemClick = target.parentElement;
        removeActive(menu);
        menuItemClick.classList.add('active');
        addActiveContent(content,menuItemClick); 
        setBgColorForParent(content,data); 
    })
}

const addActiveContent = function(wrapper,item){
    let arr = Array.from(wrapper.children);
    removeActive(wrapper);
    let facultyNameActive = item.classList[1];
    let contentItem = arr.find(element=>element.classList.contains(facultyNameActive));
    contentItem.classList.add('active');
}

const removeActive = function(wrapper){
    let arr = Array.from(wrapper.children);
    let active = arr.find(item=>item.classList.contains('active'));
    if(active){
        active.classList.remove('active');
    }
}

const setBgColorForParent = function(wrapper,data){
    let arr = Array.from(wrapper.children);
    let activeChild = arr.find(element=>element.classList.contains('active'));
    let facultyname = activeChild.classList[1];
    let faculty = data.faculties.find(item=>item.name.toLowerCase() == facultyname);
    wrapper.style.backgroundColor = faculty.bc;
}
