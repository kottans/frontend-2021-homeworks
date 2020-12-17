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
     <button id="${name}-btn" class="nav-btn">${name}</button>
  </li>`;
};

function createMenu(superheroes) {
  let menuItems = superheroes.map(
    ({name}) => menuButtonTemplate(name)
  );
  let navMenu = document.querySelector(".nav-list");
  navMenu.innerHTML = menuItems.join('');
}

const fillContent = (item) => {
  let logo = document.querySelector(".logo");
  logo.innerHTML = `<img class="logo-img" src="${item.logo}" alt="${item.name}-logo" />`;

  let desciption = document.querySelector(".description");
  desciption.innerHTML = `<p class="description-content">${item.description}</p>`;

  let heroImg = document.querySelector(".hero");
  heroImg.innerHTML = `<img class="hero-img" src="${item.img}" alt="${item.name}" />`;

  let heroBtn = document.getElementById(item.name + "-btn");
  heroBtn.classList.add('active');
};


createMenu(superheroes);
fillContent(superheroes[0]);


document.querySelector('.nav-list').addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    let heroName = event.target.textContent;
    let heroItem = superheroes.find(item => item.name === heroName);
    document.querySelector(".nav-btn.active").classList.remove("active");
    fillContent(heroItem);
  }
});
