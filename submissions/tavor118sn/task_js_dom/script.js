const superheroes = [
  {
    name: 'batman',
    logo: './img/batman-logo.png',
    img: './img/batman-img.png',
    description: 'Batman has been Gotham City\'s protector for decades, CEO of Wayne Enterprises, Patriarch of the Bat Family and veteran member of the Justice League.',
  },
  {
    name: 'superman',
    logo: './img/superman-logo.png',
    img: './img/superman-img.png',
    description: 'Superman is an alien named Kal-El from the destroyed planet Krypton. As an adult, Superman became the protector of Earth, working at the Daily Planet as Clark Kent.',
  },
];

const menuButtonTemplate = (name) => {
  return `
  <li class ="nav-item">
     <button id="${name}-btn" class="nav-btn" data-hero-name="${name}">${name}</button>
  </li>`;
};


function createMenu(superheroes) {
  let menuItems = superheroes.map(
    ({name}) => menuButtonTemplate(name)
  );
  let navMenu = document.querySelector(".nav-list");
  navMenu.innerHTML = menuItems.join('');
}
createMenu(superheroes);


const logo = document.querySelector(".logo");
const desciption = document.querySelector(".description");
const heroImg = document.querySelector(".hero");

const fillContent = (item) => {
  logo.innerHTML = `<img class="logo-img" src="${item.logo}" alt="${item.name}-logo" />`;
  desciption.innerHTML = `<p class="description-content">${item.description}</p>`;
  heroImg.innerHTML = `<img class="hero-img" src="${item.img}" alt="${item.name}" />`;

  const heroBtn = document.getElementById(item.name + "-btn");
  heroBtn.classList.add('active');
};
fillContent(superheroes[0]);


document.querySelector('.nav-list').addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    let heroName = event.target.dataset.heroName;
    let heroItem = superheroes.find(item => item.name === heroName);
    document.querySelector(".nav-btn.active").classList.remove("active");
    fillContent(heroItem);
  }
});
