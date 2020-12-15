const data = [
    {
        title: 'Exotic',
        desc: 'Exotics are essentially the shorthaired version of the Persian cat. Like their longhaired cousins, these cats are calm and affectionate, preferring a warm lap or plush cushion to intense activity. They have a moderate activity level and will happily get out some energy with cat toys before heading back to your lap.',
        img: '/img/exotic.jpg',
        subtitle: 'Breed Overview',
        deatils: ['Height: 10 to 12 inches', 'Weigth: 10 to 12 pounds', 'Physical Characteristics: short legs, rounded body, short nose']
    }, 
    {
        title: 'Maine Coon',
        desc: 'The Maine coon is known as a “gentle giant” for its easygoing, friendly nature. These big cats love socializing with their humans, but they aren’t typically demanding of attention. And they do well with entertaining themselves, as long as they have some toys and a window to look out. They’re also often willing to walk outside on a leash for exercise.',
        img: '/img/maine.jpg',
        subtitle: 'Breed Overview',
        deatils: ['Height: 10 to 16 inches', 'Weigth: 10 to 25 pounds', 'Physical Characteristics: muscular build; thick, heavy coat']
    },
    {
        title: 'American Shorthair',
        desc: `The American shorthair, the pedigreed version of the domestic shorthair, is an easygoing cat that loves to hang out with its humans. These cats can do well in apartments as long as you're home enough to meet their social needs. But they also are good at entertaining themselves with toys and watching out windows.`,
        img: '/img/american.jpg',
        subtitle: 'Breed Overview',
        deatils: ['Height: 8 to 10 inches', 'Weigth: 10 to 15 pounds', 'Physical Characteristics: athletic build; short, dense coat']
    },
    {
        title: 'Balinese',
        desc: 'Balinese are known for their intelligence, their friendly, inquisitive and playful nature, and their striking beauty. They are also often vocal and rather demanding. The breed arose as a result of a spontaneous genetic mutation in pure breed Siamese that caused the cats to develop a longer coat type.',
        img: '/img/balinese.jpg',
        subtitle: 'Breed Overview',
        deatils: ['Height: 10 to 12 inches', 'Weigth: 6 to 11 pounds', 'Physical Characteristics: athletic build; short, heavy coat']
    },
    {
        title: 'British Shorthair',
        desc: `The British shorthair is an extremely adaptable cat that can thrive in an apartment. These quiet, laid-back cats typically prefer lounging over racing around their homes. But they can have bursts of energy and love interactive play to challenge them mentally and physically. Food puzzles are great to keep them entertained in a small space, as long as they don't lead to overfeeding.`,
        img: '/img/british.jpg',
        subtitle: 'Breed Overview',
        deatils: ['Height: 12 to 14 inches', 'Weigth: 7 to 17 pounds', 'Physical Characteristics: large head; round eyes; well-balanced body']
    }
]; 

const btn = (name) => {
    return `
    <li class ="nav__item">
        <button class="nav__btn">${name}</button>
    </li>
    `;
}; 

const getBtns = () => {
    return data.map(obj => btn(obj.title)); 
}; 


const insertNav = () => {
    let ul = document.querySelector('.nav__list'); 
    ul.innerHTML = getBtns().join('');
};


const insertData = (title) => {
    let main = document.querySelector('main'); 
    const cat = data.filter(catObj => {
        return catObj.title === title
    })[0];

    const characteristics = cat.deatils.map(detail => {
        return  `<li class='overview__item'>${detail}</li>`
    });

    main.innerHTML = `
        <div class="content">
            <img class="content__img" src=${cat.img} alt=${title}>
            <div class="content__text">
                  <h2 class = "content__title">${title}</h2>
                  <p class = "content__desc">${cat.desc}</p>
            </div>   
        </div>
        <div class= "overview">
            <h3 class="overview__title">${cat.subtitle}</h3>
            <ul class= "overview__list">${characteristics.join('')}
            </ul>
        </div>
    `; 
}

insertNav(); 
insertData(data[0].title);

document
    .querySelector('.nav')
    .addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const catTitle = event.target.textContent;
            insertData(catTitle);
            event.currentTarget.classList.remove('mobile'); 
        }
    });

document
    .querySelector('.header__btn')
    .addEventListener('click', () => {
        let menu = document.querySelector('.nav'); 
        menu.classList.toggle('mobile'); 
    });
