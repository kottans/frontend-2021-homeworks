const coffeeDrinks = [
  {
    name: 'americano',
    imageUrl: 'img/americano.png',
    description: 'Americanos are popular breakfast drinks and thought to have originated during World War II. Soldiers would add water to their coffee to extend their rations farther. The water dilutes the espresso while still maintaining a high level of caffeine.',
    ratio: '1 shot of espresso + 3 oz. of hot water',
    cup: '5-6 oz. Glass Coffee Mug'
  },
  {
    name: 'black-eye',
    imageUrl: 'img/black-eye.png',
    description: 'The black eye is just the doubled version of the red eye and is very high in caffeine.',
    ratio: '2 shots of espresso + 6 oz. of drip-brewed coffee',
    cup: '8-10 oz. Coffee Mug'
  },
  {
    name: 'caffe-latte',
    imageUrl: 'img/caffe-latte.png',
    description: 'Cafe lattes are considered an introductory coffee drink since the acidity and bitterness of coffee is cut by the amount of milk in the beverage. Flavoring syrups are often added to the latte for those who enjoy sweeter drinks.',
    ratio: '1 shot of espresso + 8-10 oz. of steamed milk + 1 cm of foam',
    cup: '4 oz. Mixing Glass'
  },
  {
    name: 'cappuccino',
    imageUrl: 'img/cappuccino.png',
    description: 'This creamy coffee drink is usually consumed at breakfast time in Italy and is loved in the United States as well. It is usually associated with indulgence and comfort because of its thick foam layer and additional flavorings that can be added to it.',
    ratio: '1-2 shots of espresso + 2 oz. of steamed milk + 2 oz. of foamed milk + sprinkling of chocolate powder (optional)',
    cup: '6-8 oz. Cappuccino Mug'
  },
  {
    name: 'espresso',
    imageUrl: 'img/espresso.png',
    description: 'The espresso, also known as a short black, is approximately 1 oz. of highly concentrated coffee. Although simple in appearance, it can be difficult to master.',
    ratio: '1 shot of espresso',
    cup: '2-4 oz. Espresso Cup'
  },
  {
    name: 'flat-white',
    imageUrl: 'img/flat-white.png',
    description: 'A flat white also originates from New Zealand and Australia and is very similar to a cappuccino but lacks the foam layer and chocolate powder. To keep the drink creamy rather than frothy, steamed milk from the bottom of the jug is used instead of from the top.',
    ratio: '1 shot of espresso + 4 oz. of steamed milk',
    cup: '6 oz. Glass Tumbler'
  },
  {
    name: 'macchiato',
    imageUrl: 'img/macchiato.png',
    description: 'The word "macchiato" means mark or stain. This is in reference to the mark that steamed milk leaves on the surface of the espresso as it is dashed into the drink. Flavoring syrups are often added to the drink according to customer preference.',
    ratio: '1 shot of espresso + 1 to 2 teaspoons of steamed milk',
    cup: '3 oz. Glass Espresso Cup'
  },
  {
    name: 'mocha',
    imageUrl: 'img/mocha.png',
    description: 'The mocha is considered a coffee and hot chocolate hybrid. The chocolate powder or syrup gives it a rich and creamy flavor and cuts the acidity of the espresso.',
    ratio: '1 shot of espresso + 1-2 oz. of chocolate syrup/powder + 1-3 oz. of steamed milk + 2-3 cm of foam or whipped cream',
    cup: '6-8 oz. Irish Coffee Mug'
  },
  {
    name: 'red-eye',
    imageUrl: 'img/red-eye.png',
    description: 'The red eye\'s purpose is to add a boost of caffeine to your standard cup of coffee.',
    ratio: '1 shot of espresso + 6 oz. of drip-brewed coffee',
    cup: '8 oz. Coffee Mug'
  },
  {
    name: 'vienna',
    imageUrl: 'img/vienna.png',
    description: 'There are a few variations on the Vienna, but one of the most common is made with two ingredients: espresso and whipped cream. The whipped cream takes the place of milk and sugar to provide a creamy texture.',
    ratio: '1-2 shots of espresso + 2 oz. of whipped cream',
    cup: '4-5 oz. Espresso Mug'
  }
];

const navButtons = document.querySelector('.nav-buttons');
const itemDescription = document.querySelector('.description');
const itemImage = document.querySelector('.item-image');
const itemRecipe = document.querySelector('.recipe');
const itemTitle = document.querySelector('h2');
const menuButton = document.querySelector('.menu-button');
const navBar = document.querySelector('.nav-bar');

const hideMenu = () => {
  if (navBar.classList.contains('visible')) {
    navBar.classList.remove('visible')
  }
}

const getProp = (id, prop) => coffeeDrinks.filter(obj => obj.name === id)[0][prop];

menuButton.addEventListener('click', function () {
  navBar.classList.toggle('visible');
})

navButtons.addEventListener('click', function (evt) {
  if (evt.target.tagName === 'BUTTON') {
    const id = evt.target.id;
    hideMenu();
    itemTitle.textContent = getProp(id, 'name').toUpperCase();
    itemImage.setAttribute('src', getProp(id, 'imageUrl'));
    itemRecipe.innerHTML = `<p><b>Ratio</b>: ${getProp(id, 'ratio')}</p><p><b>Cup</b>: ${getProp(id, 'cup')}</p>`;
    itemDescription.textContent = getProp(id, 'description');
  }
})
