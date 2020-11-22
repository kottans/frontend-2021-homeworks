import { pokemons } from "./data.js";

document.addEventListener('DOMContentLoaded', init);

function init() {
  const initialType = pokemons[0].type;

  appendMenu();
  appendCards(initialType);
  initBtnOpener();
}

function changeView(type) {
  appendCards(type);
}

function appendMenu() {
  const menuWrapper = document.querySelector('.menu__list');
  const menuItemsVirtual = document.createDocumentFragment();

  generateMenu(pokemons.map(typeObj => typeObj.type)).forEach(menuItem => {
    menuWrapper.append(menuItem);
  });

  menuWrapper.appendChild(menuItemsVirtual);
}

function appendCards(type) {
  const cardWrapper = document.querySelector('.main__list');
  const cardListVirtual = document.createDocumentFragment();

  generateCards(pokemons.filter(typeObj => typeObj.type === type)[0].list).forEach(card => {
    cardListVirtual.append(card);
  });

  cardWrapper.innerHTML = '';
  cardWrapper.append(cardListVirtual);
}

function generateCards(pokemonList) {
  return pokemonList.map(pokemon => {
    const wrapper = document.createElement('li');
    const titleNode = document.createElement('p');
    const titleText = document.createTextNode(pokemon.name);
    const img = document.createElement('img');
    const statList = document.createElement('ul');

    wrapper.classList.add('card');
    titleNode.classList.add('card__title');
    img.classList.add('card__img');
    statList.classList.add('card__list');

    img.src = pokemon.img;
    img.alt = `${pokemon.name} img`;

    titleNode.appendChild(titleText);
    wrapper.appendChild(titleNode);
    wrapper.appendChild(img);
    wrapper.appendChild(statList);

    pokemon.stats.forEach(stat => {
      const listItem = document.createElement('li');
      const statNameWrapper = document.createElement('p');
      const statNameText = document.createTextNode(stat.name);
      const statValueWrapper = document.createElement('p');
      const statValueText = document.createTextNode(stat.value);

      listItem.classList.add('card__list-item');

      statNameWrapper.append(statNameText);
      statValueWrapper.append(statValueText);
      listItem.append(statNameWrapper);
      listItem.append(statValueWrapper);

      statList.append(listItem);
    });

    return wrapper;
  });
}

function generateMenu(textList) {
  return textList.map((type, i) => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    const text = document.createTextNode(type);
    button.classList.add('menu__item');

    button.append(text);
    listItem.append(button);

    button.addEventListener('click', toggleActiveClassOnBtn);
    button.addEventListener('click', () => changeView(type));

    if (i === 0) {
      button.classList.add('active');
    }

    return listItem;
  });
}

function toggleActiveClassOnBtn({ currentTarget: btn }) {
  if (!btn.classList.contains('active')) {
    document.querySelectorAll('.menu__item').forEach(el => el.classList.remove('active'));
  }
  btn.classList.add('active');
}

function initBtnOpener() {
  document.querySelector('.header__btn').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
  });
}
