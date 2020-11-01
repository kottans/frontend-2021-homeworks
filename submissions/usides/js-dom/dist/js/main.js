const suspects = [
  {
    number: 763,
    nick: 'Vasana',
    gender: 'Tom',
    birth: '12.03.2014',
    nationality: 'British',
    marks: 'The suspect can have sour cream on the face',
    length: 63,
    weight: 6,
    color: 'Grey',
    details:
      '- Language: meowing <br>- Good at hiding <br>- Professional driver that very dangerous on the road - Pursue with extreme caution <br>- Strong sour cream addiction',
    charges:
      '- Suspected in multiple thefts of luxury vehicles around the world <br>- He spends all proceeds on sour cream and can kill for sour cream',
    portret: 'crim_01',
    files: ['crim_01_e01', 'crim_01_e02', 'crim_01_e03'],
  },
  {
    number: 412,
    nick: 'Sugar',
    gender: 'Tom',
    birth: '01.05.2016',
    nationality: 'Turkish',
    marks: 'thin body',
    length: 45,
    weight: 3,
    color: 'White',
    details:
      '- Language: meowing <br>- strong metabolism - can eat all evidence without a form change <br> - master of disguise',
    charges:
      "- Suspected in mass burglaries and shopliftings <br>- Pretends to be a homeless cat and gets old ladies' trust <br>- Uses the stock in the fridge as the priority target for stealing",
    portret: 'crim_02',
    files: ['crim_02_e01', 'crim_02_e02'],
  },
  {
    number: 404,
    nick: 'Night',
    gender: 'Molly',
    birth: '13.07.2017',
    nationality: 'American',
    marks: 'black as night',
    length: 50,
    weight: 4,
    color: 'Black',
    details:
      '- Language: meowing, bip-bip-bup-bup <br>- Professional hacker and techno maniac<br>- NFC and WiFi module inside',
    charges:
      '- Suspected in malware production<br>- Debit and Credit Card Frauds<br>- Identity Thefts<br>- Phishing scams<br>- Hacking into bank accounts<br>- Vacuum cleaner robots hacking',
    portret: 'crim_03',
    files: ['crim_03_e01', 'crim_03_e02', 'crim_03_e03'],
  },
  {
    number: 123,
    nick: 'Chill',
    gender: 'Tom',
    birth: '01.01.2013',
    nationality: 'American',
    marks: 'Fluffy paws',
    length: 45,
    weight: 4,
    color: 'Ginger',
    details:
      '- Language: meowing <br>- relaxed all the time <br>- not good at hiding',
    charges:
      '- Suspected in tax frauds <br>- Owner of Illegal flip flops market',
    portret: 'crim_04',
    files: ['crim_04_e01', 'crim_04_e02'],
  },
  {
    number: 666,
    nick: 'Katrin',
    gender: 'Molly',
    birth: '02.06.2014',
    nationality: 'Russian',
    marks: 'Sharp claws',
    length: 50,
    weight: 4,
    color: 'Grey',
    details:
      '- Language: meowing, barking <br>- flip flops collector <br>- Charge with extreme caution',
    charges:
      '- Suspected in an assault with fangs and claws <br>- Terrorizes all dogs around ',
    portret: 'crim_05',
    files: ['crim_05_e01', 'crim_05_e02', 'crim_05_e03'],
  },
  {
    number: 334,
    nick: 'Sharpei',
    gender: 'Tom',
    birth: '01.03.2015',
    nationality: 'American',
    marks: 'Super cute',
    length: 55,
    weight: 4,
    color: 'White / grey',
    details:
      '- Language: meowing <br>- calls himself as "sharp eye" but for some reason, other calls him as dog breed "shar-pei" <br>- master of disguise as turkey',
    charges:
      '- Suspected in mouses assassination with a rifle <br>- mouse killer for money - hitcat',
    portret: 'crim_06',
    files: ['crim_06_e01', 'crim_06_e02'],
  },
];

const sideNavMenu = document.getElementById('side-nav-menu');
const sideMenu = document.getElementById('side-nav');
const menuBtn = document.getElementById('menu-btn');
const nextBtn = document.getElementById('next-btn');
let current;

document.addEventListener('DOMContentLoaded', function () {
  loadMenu();
  printData(0);
});

menuBtn.addEventListener('click', function (e) {
  e.preventDefault();
  sideMenu.classList.toggle('hidden');
  this.classList.toggle('active');
});

nextBtn.addEventListener('click', function (e) {
  e.preventDefault();
  current++;
  printData(current);
  makeActive(current);
  if (current == suspects.length - 1) current = -1;
});

sideNavMenu.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  let arrNum = suspects.findIndex(
    (item) => item.number === Number(e.target.id.slice(1)),
  );
  printData(arrNum);
  makeActive(arrNum);
  current = arrNum;
  sideMenu.classList.add('hidden');
  menuBtn.classList.remove('active');
});

function loadMenu() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < suspects.length; i++) {
    const newElem = document.createElement('li');
    newElem.innerHTML = `<a href="#" class="menu-link" id="p${
      suspects[i].number
    }">${labelCreate.call(suspects[i])}</a>`;
    if (i == 0) newElem.firstElementChild.classList.add('active');
    fragment.appendChild(newElem);
  }
  sideNavMenu.appendChild(fragment);
  current = 0;
}

function printData(perp) {
  let holders = document.querySelectorAll('[data-holder]');
  for (let i = 0; i < holders.length; i++) {
    holders[i].innerHTML = suspects[perp][holders[i].dataset.holder];
  }
  document
    .getElementById('crim-portret')
    .setAttribute('src', `./img/${suspects[perp].portret}.png`);
  document.getElementById('crim-label').textContent = labelCreate.call(
    suspects[perp],
  );
  document.getElementById('evidence-set').innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < suspects[perp].files.length; i++) {
    const newElem = document.createElement('div');
    newElem.innerHTML = `<img src="./img/${
      suspects[perp].files[i]
    }.png" alt="Case photo"><p>File ${i + 1}</p>`;
    newElem.classList.add('evidence-item');
    fragment.appendChild(newElem);
  }
  document.getElementById('evidence-set').appendChild(fragment);
}

function labelCreate() {
  return `#${this.number}-${this.gender.slice(0, 1)}-${this.nick}`;
}

function makeActive(menuItem) {
  let items = document.querySelectorAll('.menu-link');
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
    items[menuItem].classList.add('active');
  }
}
