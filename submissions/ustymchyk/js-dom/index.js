import { pokemons } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const initialType = pokemons[0].type;

  appendMenu();
  appendCards(initialType);
  initBtnOpener();
});

const appendMenu = () => {
  const menuWrapper = document.querySelector('.menu__list');
  const menuNames = pokemons.map(typeObj => typeObj.type);

  menuWrapper.innerHTML = generateMenuItems(menuNames);
  addClickListener();
}

const appendCards = type => {
  const cardWrapper = document.querySelector('.main__list');
  const pokemonList = pokemons.filter(typeObj => typeObj.type === type)[0]?.list || [];
  cardWrapper.innerHTML = generateCards(pokemonList);
}

const generateCards = pokemonList => {
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

const generateCardStats = statsList => {
  return statsList.map(({ name, value }) => {
    return `
      <li class='card__list-item'>
        <p>${name}</p>
        <p>${value}</p>  
      </li>`;
  }).join('');
}

const generateMenuItems = textList => {
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

const addClickListener = () => {
  document.querySelector('.menu__list').addEventListener('click', ({ target }) => {
    if (target.getAttribute('data-type')) {
      toggleActiveClassOnBtn(target);
      changeView(target);
    }
  });
}

const changeView = btn => {
  appendCards(btn.getAttribute('data-type'));
}

const toggleActiveClassOnBtn = btn => {
  document.querySelectorAll('.menu__item').forEach(el => el.classList.remove('active'));
  btn.classList.add('active');
}

const initBtnOpener = () => {
  document.querySelector('.header__btn').addEventListener('click', () => {
    document.querySelector('.menu').classList.toggle('open');
  });
}
