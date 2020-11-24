import { pokemons } from './data.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const initialType = pokemons[0].type;

  appendMenu();
  appendCards(initialType);
  initBtnOpener();
}

function appendMenu() {
  const menuWrapper = document.querySelector('.menu__list');
  const menuNames = pokemons.map(typeObj => typeObj.type);

  menuWrapper.innerHTML = generateMenu(menuNames);
  addListenersToMenu();
}

function appendCards(type) {
  const cardWrapper = document.querySelector('.main__list');
  const pokemonList = pokemons.filter(typeObj => typeObj.type === type)[0]?.list || [];
  cardWrapper.innerHTML = generateCards(pokemonList);
}

function generateCards(pokemonList) {
  return pokemonList.map(pokemon => {
    return `
      <li class='card'>
        <p class='card__title'>${pokemon.name || 'unknown'}</p>
        <img src='${pokemon.img}' alt='${pokemon.name} image' class='card__img'>
        <ul class='card__list'>${generateCardStats(pokemon.stats)}</ul>
      </li>
    `;
  }).join('');
}

function generateCardStats(statsList) {
  return statsList.map(({ name, value }) => {
    return `
      <li class='card__list-item'>
        <p>${name}</p>
        <p>${value}</p>  
      </li>`;
  }).join('');
}

function generateMenu(textList) {
  return textList.map((type, i) => {
    return `
      <li>
        <button 
          class='menu__item${i === 0 ? ' active' : ''}' 
          data-type='${type}'>
          ${type}
        </button>
      </li>
    `;
  }).join('');
}

function addListenersToMenu() {
  document.querySelectorAll('.menu__item').forEach(btn => {
    btn.addEventListener('click', ({ currentTarget }) => changeView(currentTarget));
    btn.addEventListener('click', ({ currentTarget }) => toggleActiveClassOnBtn(currentTarget));
  });
}

function changeView(btn) {
  appendCards(btn.getAttribute('data-type'));
}

function toggleActiveClassOnBtn(btn) {
  document.querySelectorAll('.menu__item').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
}

function initBtnOpener() {
  document.querySelector('.header__btn').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
  });
}
