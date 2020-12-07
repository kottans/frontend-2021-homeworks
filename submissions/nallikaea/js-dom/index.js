const gryby = [
  {
    name: 'Білий гриб',
    imgSrc: './img/biliy.jpg',
    description: 'Один з найкращих їстівних грибів із роду Боровик.',
    receptName: 'Крем-суп із білих грибів',
    ingredients: 'білі гриби 0,5кг, цибуля 1шт, бульон курячий 1л, вершки жирні 4ст/л, спеції, зелень.',
    recept: 'Обсмажте дрібно нарізану цибулю в маслі протягом 3-4 хвилин, додайте гриби і обсмажуйте ще 6 хвилин. Додайте в бульйон гриби і цибулю, доведіть до кипіння і готуйте протягом 20 хвилин. В кінці додайте вершки. У блендері перетворіть суп в пюре, додайте сіль і перець. Подавайте суп, прикрасивши ароматної зеленню і невеликою кількістю грибів.'
  },
  {
    name: 'Мухомор червоний',
    imgSrc: './img/mukhomor.jpg',
    description: 'Отруйний психоактивний гриб роду аманітів, відноситься до базидіоміцетів. Стає їстівним після двократного відварювання.',
    receptName: 'Мухомори в сметані',
    ingredients: 'мухомори 0,4кг, цибуля 1шт, сметана 4ст/л, спеції',
    recept: 'Відварити мухомори 2-3 рази по 20-30 хвилин, промити. Цибулю почистити, дрібно нарізати, злегка обсмажити на олії. Додати гриби, обсмажувати цибулю з грибами до готовності. До майже готових грибів додати сметану, дати грибам трохи протушкувати на маленькому вогні. Додати сіль, перець за смаком. Подавати на стіл в гарячому вигляді.'
  },
  {
    name: 'Сироїжка зелена',
    imgSrc: './img/syroezhka.jpg',
    description: 'З родини сироїжкових. Їстівний. Треба бути обережним, схожий на смертельно отруйний гриб — мухомор зелений (бліду поганку).',
    receptName: 'Солоні сироїжки з гострим перцем',
    ingredients: 'сироїжки 1кг, перець чилі 1шт, сіль 3ст/л, лавровий лист 6шт.',
    recept: 'Гриби промити, залити солоною водою на 2-3 години. Гострий перчик очистити від насіння і нарізати шматочками. Укласти гриби в ошпарені окропом скляні банки, додаючи на кожен шар лавровий лист, сіль і перець. Залити окропом, закатати банку і залишити в теплому місці на кілька днів.'
  },
  {
    name: 'Павутинник фіолетовий',
    imgSrc: './img/pautinnik.jpg',
    description: 'Не дивлячись на дивний колір - їстівний гриб з роду Павутинник. Занесен до Червоної книги, тому краще не брати. Також можна сплутати з отруйними павутинниками.',
    receptName: 'Мариновані павутинники',
    ingredients: 'павутинники 1кг, сіль 2ст/л, цукор 2 ст/л, оцет 2 ст/л, запашний перець горошком 5шт, лист лавра 1шт, часник 5 зубків.',
    recept:'До води додати спеції, закіп\'ятити і занурити туди підготовлені і відварені гриби, потім тримати на вогні ще 20 хвилин. Розкласти плоди по банкам і долити до верху маринад. Стерилізувати протягом 15 хвилин і закатати кришками.'
  },
  {
    name: 'Польський гриб',
    imgSrc: './img/polskiy.jpg',
    description: 'Дуже добрий їстівний гриб. В різних системах класифікації відносяться до родів Боровик або Моховик .',
    receptName: 'Листкові булочки з грибами',
    ingredients: 'листкове тісто 1уп, польські гриби 0,25кг, цибулина 1шт, сметана 3 ст/л, жовток 1шт, борошно 1ст/л, сіль, перець.',
    recept: 'Дрібно нарізати цибулю і відварені гриби. Обсмажити до напівготовності з сіллю і перцем. Додати сметану і борошно, добре перемішати. Тісто нарізати квадратиками і злегка розкатати (10х10см). На середину квадратика покласти начинку. Скласти по діагоналі і защипи по краях виделкою. Пиріжок проколоти виделкою та змастити жовтком. Випікати 20 хвилин при температурі 200 градусів.'
  },
  {
    name: 'Підосиковик',
    imgSrc: './img/podosinovik.jpg',
    description:
      'Вид базидіомікотових грибів родини Болетові. Їстівний смачний гриб.',
    receptName:'Грибний суп з підосиковиків',
    ingredients: 'Підосиковики 4шт, картопля - 3шт, цибуля 1шт, морква 1шт, сіль, перець чорний горошком, лавровий лист 2шт. ',
    recept:'У каструлю влийте воду, посоліть, додайте гриби, спеції і варіть на середньому вогні 20 хвилин. Знімайте пінку шумівкою. Цибулю і моркву наріжте кубиками та обсмажте до золотистого кольору. Картоплю наріжте і додайте в грибний бульйон. Через кілька хвилин додайте смажені моркву і цибулю та варіть до готовності. Подавайте зі сметаною.'
  }
];

const DOC = document;

const container = DOC.createElement('div');
container.classList.add('container');
DOC.body.appendChild(container);

const dictionaryName = DOC.createElement('h1');
dictionaryName.classList.add('dictionary-name');
dictionaryName.textContent = 'Мої знахідки';
container.appendChild(dictionaryName);

const divMain = DOC.createElement('div');
divMain.classList.add('main');
container.appendChild(divMain);

const divMenu = DOC.createElement('div');
divMenu.classList.add('menu');
divMain.appendChild(divMenu);

const navigation = DOC.createElement('ul');
navigation.classList.add('navigation');
const nav = DOC.querySelectorAll('li');
divMenu.appendChild(navigation);

gryby.forEach((val, key) => {
  const li = DOC.createElement('li');
  li.classList.add('list-element');
  li.textContent = gryby[key].name;
  if (key === 0) {
    li.classList.add('clicked');
  }
  navigation.appendChild(li);
});

const divDescription = DOC.createElement('div');
divDescription.classList.add('description');
divMain.appendChild(divDescription);

const divRecept = DOC.createElement('div');
divRecept.classList.add('recept');
divMain.appendChild(divRecept);

const divImage = DOC.createElement('div');
divImage.classList.add('image');
divMain.appendChild(divImage);

const descriptionHeader = DOC.createElement('h2');
descriptionHeader.textContent = gryby[0].name;
divDescription.appendChild(descriptionHeader);

const descriptionParah = DOC.createElement('p');
descriptionParah.textContent = gryby[0].description;
divDescription.appendChild(descriptionParah);

const descriptionReceptName = DOC.createElement('h2');
descriptionReceptName.textContent = gryby[0].receptName;
divDescription.appendChild(descriptionReceptName);

const descriptionIng = DOC.createElement('h4');
descriptionIng.textContent =  gryby[0].ingredients;
divDescription.appendChild(descriptionIng);

const descriptionRecept = DOC.createElement('p');
descriptionRecept.textContent = gryby[0].recept;
divDescription.appendChild(descriptionRecept);

const image = DOC.createElement('img');
image.classList.add('image');
image.setAttribute('src', gryby[0].imgSrc);
divImage.appendChild(image);

const menuList = DOC.querySelector('ul');

menuList.addEventListener('click', evt => {
  const lis = DOC.querySelectorAll('li');
  lis.forEach(element => {
    element.classList.remove('clicked');
  });

  gryby.forEach((val, key) => {
    if (evt.target.textContent === gryby[key].name) {
      evt.target.classList.add('clicked');
      descriptionHeader.textContent = gryby[key].name;
      descriptionParah.textContent = gryby[key].description;
      descriptionReceptName.textContent = gryby[key].receptName;
      descriptionIng.textContent =  gryby[key].ingredients;
      descriptionRecept.textContent = gryby[key].recept;
      image.src = gryby[key].imgSrc;
    }
  });
});
