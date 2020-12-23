const data = [
    {
        title: 'Exotic',
        description: 'Exotics are essentially the shorthaired version of the Persian cat. Like their longhaired cousins, these cats are calm and affectionate, preferring a warm lap or plush cushion to intense activity. They have a moderate activity level and will happily get out some energy with cat toys before heading back to your lap.',
        img: './img/exotic.jpg',
        subtitle: 'Breed Overview',
        details: ['Height: 10 to 12 inches', 'Weigth: 10 to 12 pounds', 'Physical Characteristics: short legs, rounded body, short nose']
    }, 
    {
        title: 'Maine Coon',
        description: 'The Maine coon is known as a “gentle giant” for its easygoing, friendly nature. These big cats love socializing with their humans, but they aren’t typically demanding of attention. And they do well with entertaining themselves, as long as they have some toys and a window to look out. They’re also often willing to walk outside on a leash for exercise.',
        img: './img/maine.jpg',
        subtitle: 'Breed Overview',
        details: ['Height: 10 to 16 inches', 'Weigth: 10 to 25 pounds', 'Physical Characteristics: muscular build; thick, heavy coat']
    },
    {
        title: 'American Shorthair',
        description: `The American shorthair, the pedigreed version of the domestic shorthair, is an easygoing cat that loves to hang out with its humans. These cats can do well in apartments as long as you're home enough to meet their social needs. But they also are good at entertaining themselves with toys and watching out windows.`,
        img: './img/american.jpg',
        subtitle: 'Breed Overview',
        details: ['Height: 8 to 10 inches', 'Weigth: 10 to 15 pounds', 'Physical Characteristics: athletic build; short, dense coat']
    },
    {
        title: 'Balinese',
        description: 'Balinese are known for their intelligence, their friendly, inquisitive and playful nature, and their striking beauty. They are also often vocal and rather demanding. The breed arose as a result of a spontaneous genetic mutation in pure breed Siamese that caused the cats to develop a longer coat type.',
        img: './img/balinese.jpg',
        subtitle: 'Breed Overview',
        details: ['Height: 10 to 12 inches', 'Weigth: 6 to 11 pounds', 'Physical Characteristics: athletic build; short, heavy coat']
    },
    {
        title: 'British Shorthair',
        description: `The British shorthair is an extremely adaptable cat that can thrive in an apartment. These quiet, laid-back cats typically prefer lounging over racing around their homes. But they can have bursts of energy and love interactive play to challenge them mentally and physically. Food puzzles are great to keep them entertained in a small space, as long as they don't lead to overfeeding.`,
        img: './img/british.jpg',
        subtitle: 'Breed Overview',
        details: ['Height: 12 to 14 inches', 'Weigth: 7 to 17 pounds', 'Physical Characteristics: large head; round eyes; well-balanced body']
    }
]; 

const navElement = document.querySelector('.nav'); 

const createButton = (name) => {
    return `
    <li class ="nav__item">
        <button class="nav__btn">${name}</button>
    </li>
    `;
}; 

const getButtons = () => {
    return data.map(obj => createButton(obj.title)); 
}; 


const insertNav = () => {
    const ul = document.querySelector('.nav__list'); 
    ul.innerHTML = getButtons().join('');
    document.querySelector('.nav__btn').classList.add('active'); 
};


const insertData = (title) => {
    const main = document.querySelector('main'); 
    const { img, description, subtitle, details } = data.filter(catObj => catObj.title === title)[0];

    const characteristicsAsString = details.map(detail => {
        return  `<li class='overview__item'>${detail}</li>`
    }).join('');

    main.innerHTML = `
        <div class="content">
            <img class="content__img" src=${img} alt=${title}>
            <div class="content__text">
                  <h2 class = "content__title">${title}</h2>
                  <p class = "content__desc">${description}</p>
            </div>   
        </div>
        <div class= "overview">
            <h3 class="overview__title">${subtitle}</h3>
            <ul class= "overview__list">${characteristicsAsString}
            </ul>
        </div>
    `; 
}

insertNav(); 
insertData(data[0].title);

navElement
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('nav__btn')) {
            const button = event.target;
            const menu = event.currentTarget;
            const catTitle = button.textContent;

            insertData(catTitle);
            menu.classList.remove('mobile');
            document.querySelector('.nav__btn.active').classList.remove('active');    
            button.classList.add('active');
        }
    });

document
    .querySelector('.header__btn')
    .addEventListener('click', () => {
        navElement.classList.toggle('mobile'); 
    });
