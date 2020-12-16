document.addEventListener('DOMContentLoaded', () => {
  createList();
  createElements(houses[0]);
  addImages(houses[0]);
  animateMap(houses[0]);
});

const houses = [
  {
    id: 0,
    name: 'stark',
    slogan: '"Winter Is Coming"',
    description:
      "House Stark of Winterfell is a Great House of Westeros and the royal house of the Kingdom of the North. They rule over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and early on in Daenerys Targaryen's war for Westeros, the leaders of House Stark ruled over the region as the Kings in the North.",
    mapPosition: ['scale(1.1)', '-270%', '-30%'],
    dead: [1, 0, 0],
  },
  {
    id: 1,
    name: 'greyjoy',
    slogan: '"What Is Dead May Never Die"',
    description: 'House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.',
    mapPosition: ['scale(1.5)', '-140%', '-80%'],
    dead: [1, 0, 1],
  },
  {
    id: 2,
    name: 'arryn',
    slogan: '"As High as Honor"',
    description:
      'House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Defenders of the Vale and Wardens of the East under the Targaryen, Baratheon, and Lannister dynasties. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with Yohn Royce holding actual power over the house.',
    mapPosition: ['scale(1.2)', '-160%', '-10%'],
    dead: [0, 1, 1],
  },
  {
    id: 3,
    name: 'lannister',
    slogan: '"A Lannister Always Pays His Debts"',
    description:
      "House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and one of its oldest dynasties. It was also the royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house during the War of the Five Kings, for a brief stint of time until House Targaryen took back the Iron Throne in Daenerys Targaryen's war for Westeros.",
    mapPosition: ['scale(1.2)', '-90%', '-60%'],
    dead: [0, 1, 1],
  },
  {
    id: 4,
    name: 'tully',
    slogan: '"Family, Duty, Honor"',
    description: 'House Tully of Riverrun is a Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background.',
    mapPosition: ['scale(1.2)', '-120%', '-30%'],
    dead: [1, 1, 0],
  },
  {
    id: 5,
    name: 'targaryen',
    slogan: '"Fire and Blood"',
    description:
      "House Targaryen of Dragonstone is a noble family of Valyrian descent who once ruled the Seven Kingdoms of Westeros. It eventually became the first royal house of the Seven Kingdoms, as House Targaryen of King's Landing. The only family of dragonlords who survived the Doom of Valyria, the Targaryens left the Valyrian Freehold twelve years before the Doom.",
    mapPosition: ['scale(1.3)', '-80%', '0'],
    dead: [1, 1, 1],
  },
  {
    id: 6,
    name: 'tyrell',
    slogan: '"Growing Strong"',
    description:
      'House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest.',
    mapPosition: ['scale(1.2)', '-40%', '-45%'],
    dead: [1, 1, 1],
  },
  {
    id: 7,
    name: 'baratheon',
    slogan: '"Ours is the Fury"',
    description:
      "House Baratheon of Storm's End is a Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister took control of the throne, though lost it to House Targaryen. House Baratheon traditionally rules the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.",
    mapPosition: ['scale(1.1)', '-40%', '-10%'],
    dead: [1, 1, 1],
  },
  {
    id: 8,
    name: 'martell',
    slogan: '"Unbowed, Unbent, Unbroken"',
    description: "House Martell of Sunspear is one of the Great Houses of Westeros. It rules the peninsula of Dorne in the far south of the continent from their castle Sunspear. Though loyal to the Iron Throne, the Martells were never conquered by the Targaryens and pursued a more isolated role in wider political events since Robert's Rebellion.",
    mapPosition: ['scale(1.1)', '20%', '-20%'],
    dead: [1, 1, 1],
  },
];

let button;
let buttonLi;
let image;
let imageId;
let imageCollection = [];
let previousId = 0;
const number = 3;
const time = 1450;
const houseElement = document.querySelector('.house');
const shieldElement = document.querySelector('.shield');
const sloganElement = document.querySelector('.slogan');
const descriptionElement = document.querySelector('.description');
const background = document.querySelector('.content-container');
const menu = document.querySelector('.menu-container');
const navbar = document.querySelector('.navbar');
const images = document.querySelector('.content-img-container');
const hiddenIcon = document.querySelector('.icon');
const header = document.querySelector('.header-container');

function createList() {
  houses.forEach(({ id, name }) => {
    buttonLi = document.createElement('li');
    button = document.createElement('button');
    button.className = 'menu-item';
    button.id = id;
    button.innerHTML = `
    <img class="menu-item-img" src="assets/shields/${name}.png"><span>house ${name}</span>`;
    buttonLi.appendChild(button);
    menu.appendChild(buttonLi);
  });
}

function changeContent(e) {
  let target = e.target;
  if (!target.matches('button')) {
    target = target.parentNode;
  }
  const btn = target.closest('.menu-item');
  if (btn) {
    id = target.getAttribute('id');
    createElements(houses[id]);
    addImages(houses[id]);
    animateMap(houses[id]);
  }
}

menu.addEventListener('click', changeContent);

function createElements({ name, slogan, description }) {
  houseElement.innerText = `house ${name}`;
  shieldElement.setAttribute('src', `assets/shields/${name}.png`);
  sloganElement.innerText = `${slogan}`;
  descriptionElement.innerHTML = `<span>${description}</span>`;
  background.style.backgroundColor = `var(--${name})`;
}

function addImages(item) {
  if (images.children.length === 0) {
    createImage(item);
  } else {
    images.innerHTML = '';
    createImage(item);
  }
}

function createImage({ name }) {
  for (let i = 0; i < number; i++) {
    image = document.createElement('div');
    image.className = 'content-img';
    image.id = i;
    images.appendChild(image);
    image.style.backgroundImage = `url("assets/members/member-${name}-${i}.jpg")`;
    if (imageCollection.length >= 3) {
      imageCollection = [];
    }
    imageCollection.push(image);
  }
}

function animateMap(item) {
  document.querySelector('.background-picture').animate(
    [
      { transform: `${houses[previousId].mapPosition[0]}`, bottom: `${houses[previousId].mapPosition[1]}`, right: `${houses[previousId].mapPosition[2]}` },
      { transform: `${item.mapPosition[0]}`, bottom: `${item.mapPosition[1]}`, right: `${item.mapPosition[2]}` },
    ],
    {
      duration: 1000,
      fill: 'forwards',
    }
  );
  previousId = item.id;
}

function changeImageBackground(img, i) {
  if (!img.classList.contains('fire') && !img.classList.contains('light') && !img.classList.contains('dead')) {
    if (houses[id].dead[i] === 1) {
      img.style.backgroundImage = '';
      img.classList.add('fire');
      showDead(img);
    } else {
      img.style.backgroundImage = '';
      img.classList.add('light');
    }

    setTimeout(() => {
      img.style.backgroundImage = `url("assets/members/member-${houses[id].name}-${i}.jpg")`;
    }, time);
  }
}

function showDead(el) {
  setTimeout(() => {
    const deadImage = document.createElement('div');
    deadImage.className = 'dead';
    el.appendChild(deadImage);
  }, time);
}

function addImageAnimation(e) {
  const target = e.target;
  const img = target.closest('.content-img');
  imageId = target.getAttribute('id');
  if (img) {
    changeImageBackground(target, imageId);
  }
}

images.addEventListener('click', addImageAnimation);

hiddenIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
  hiddenIcon.classList.toggle('active');
  header.classList.toggle('active');
});
