const mushrooms = [
  {
    name: 'Білий гриб',
    imgSrc: './img/biliy.jpg',
    description: 'Один з найкращих їстівних грибів із роду Боровик.',
    recipeName: 'Крем-суп із білих грибів',
    ingredients: 'білі гриби 0,5кг, цибуля 1шт, бульон курячий 1л, вершки жирні 4ст/л, спеції, зелень.',
    recipe: 'Обсмажте дрібно нарізану цибулю в маслі протягом 3-4 хвилин, додайте гриби і обсмажуйте ще 6 хвилин. Додайте в бульйон гриби і цибулю, доведіть до кипіння і готуйте протягом 20 хвилин. В кінці додайте вершки. У блендері перетворіть суп в пюре, додайте сіль і перець. Подавайте суп, прикрасивши ароматної зеленню і невеликою кількістю грибів.'
  },
  {
    name: 'Мухомор червоний',
    imgSrc: './img/mukhomor.jpg',
    description: 'Отруйний психоактивний гриб роду аманітів, відноситься до базидіоміцетів. Стає їстівним після двократного відварювання.',
    recipeName: 'Мухомори в сметані',
    ingredients: 'мухомори 0,4кг, цибуля 1шт, сметана 4ст/л, спеції',
    recipe: 'Відварити мухомори 2-3 рази по 20-30 хвилин, промити. Цибулю почистити, дрібно нарізати, злегка обсмажити на олії. Додати гриби, обсмажувати цибулю з грибами до готовності. До майже готових грибів додати сметану, дати грибам трохи протушкувати на маленькому вогні. Додати сіль, перець за смаком. Подавати на стіл в гарячому вигляді.'
  },
  {
    name: 'Сироїжка зелена',
    imgSrc: './img/syroezhka.jpg',
    description: 'З родини сироїжкових. Їстівний. Треба бути обережним, схожий на смертельно отруйний гриб — мухомор зелений (бліду поганку).',
    recipeName: 'Солоні сироїжки з гострим перцем',
    ingredients: 'сироїжки 1кг, перець чилі 1шт, сіль 3ст/л, лавровий лист 6шт.',
    recipe: 'Гриби промити, залити солоною водою на 2-3 години. Гострий перчик очистити від насіння і нарізати шматочками. Укласти гриби в ошпарені окропом скляні банки, додаючи на кожен шар лавровий лист, сіль і перець. Залити окропом, закатати банку і залишити в теплому місці на кілька днів.'
  },
  {
    name: 'Павутинник фіолетовий',
    imgSrc: './img/pautinnik.jpg',
    description: 'Не дивлячись на дивний колір - їстівний гриб з роду Павутинник. Занесен до Червоної книги, тому краще не брати. Також можна сплутати з отруйними павутинниками.',
    recipeName: 'Мариновані павутинники',
    ingredients: 'павутинники 1кг, сіль 2ст/л, цукор 2 ст/л, оцет 2 ст/л, запашний перець горошком 5шт, лист лавра 1шт, часник 5 зубків.',
    recipe:'До води додати спеції, закіп\'ятити і занурити туди підготовлені і відварені гриби, потім тримати на вогні ще 20 хвилин. Розкласти плоди по банкам і долити до верху маринад. Стерилізувати протягом 15 хвилин і закатати кришками.'
  },
  {
    name: 'Польський гриб',
    imgSrc: './img/polskiy.jpg',
    description: 'Дуже добрий їстівний гриб. В різних системах класифікації відносяться до родів Боровик або Моховик .',
    recipeName: 'Листкові булочки з грибами',
    ingredients: 'листкове тісто 1уп, польські гриби 0,25кг, цибулина 1шт, сметана 3 ст/л, жовток 1шт, борошно 1ст/л, сіль, перець.',
    recipe: 'Дрібно нарізати цибулю і відварені гриби. Обсмажити до напівготовності з сіллю і перцем. Додати сметану і борошно, добре перемішати. Тісто нарізати квадратиками і злегка розкатати (10х10см). На середину квадратика покласти начинку. Скласти по діагоналі і защипи по краях виделкою. Пиріжок проколоти виделкою та змастити жовтком. Випікати 20 хвилин при температурі 200 градусів.'
  },
  {
    name: 'Підосиковик',
    imgSrc: './img/podosinovik.jpg',
    description:
      'Вид базидіомікотових грибів родини Болетові. Їстівний смачний гриб.',
    recipeName:'Грибний суп з підосиковиків',
    ingredients: 'Підосиковики 4шт, картопля - 3шт, цибуля 1шт, морква 1шт, сіль, перець чорний горошком, лавровий лист 2шт. ',
    recipe:'У каструлю влийте воду, посоліть, додайте гриби, спеції і варіть на середньому вогні 20 хвилин. Знімайте пінку шумівкою. Цибулю і моркву наріжте кубиками та обсмажте до золотистого кольору. Картоплю наріжте і додайте в грибний бульйон. Через кілька хвилин додайте смажені моркву і цибулю та варіть до готовності. Подавайте зі сметаною.'
  }
];

const DOC = document;

const navigation = DOC.createElement('ul');
navigation.classList.add('navigation');
const nav = DOC.querySelectorAll('li');
DOC.getElementById('divMenu').appendChild(navigation);

mushrooms.forEach((val, key) => {
  const li = DOC.createElement('li');
  li.classList.add('list-element');
  li.textContent = mushrooms[key].name;
  if (key === 0) {
    li.classList.add('clicked');
  }
  navigation.appendChild(li);
});

const divDescription = DOC.createElement('div');
divDescription.classList.add('description');
divMain.appendChild(divDescription);

const divrecipe = DOC.createElement('div');
divrecipe.classList.add('recipe');
divMain.appendChild(divrecipe);

const divImage = DOC.createElement('div');
divImage.classList.add('image');
divMain.appendChild(divImage);

const descriptionHeader = DOC.createElement('h2');
descriptionHeader.textContent = mushrooms[0].name;
divDescription.appendChild(descriptionHeader);

const descriptionParah = DOC.createElement('p');
descriptionParah.textContent = mushrooms[0].description;
divDescription.appendChild(descriptionParah);

const descriptionrecipeName = DOC.createElement('h2');
descriptionrecipeName.textContent = mushrooms[0].recipeName;
divDescription.appendChild(descriptionrecipeName);

const descriptionIng = DOC.createElement('h4');
descriptionIng.textContent =  mushrooms[0].ingredients;
divDescription.appendChild(descriptionIng);

const descriptionrecipe = DOC.createElement('p');
descriptionrecipe.textContent = mushrooms[0].recipe;
divDescription.appendChild(descriptionrecipe);

const image = DOC.createElement('img');
image.classList.add('image');
image.setAttribute('src', mushrooms[0].imgSrc);
divImage.appendChild(image);

const menuList = DOC.querySelector('ul');

menuList.addEventListener('click' || 'touchstart', evt => {
DOC.querySelector('.list-element.clicked').classList.remove('clicked');

  mushrooms.forEach((val, key) => {
    if (evt.target.textContent === mushrooms[key].name) {
      evt.target.classList.add('clicked');
      descriptionHeader.textContent = mushrooms[key].name;
      descriptionParah.textContent = mushrooms[key].description;
      descriptionrecipeName.textContent = mushrooms[key].recipeName;
      descriptionIng.textContent =  mushrooms[key].ingredients;
      descriptionrecipe.textContent = mushrooms[key].recipe;
      image.src = mushrooms[key].imgSrc;
    };
  });
});
