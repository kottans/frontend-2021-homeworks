import creatures from './tower.js';

document.addEventListener('DOMContentLoaded', () => {
  const navigation = document.getElementById('navigation');
  const navList = document.getElementById('nav-list');
  const main = document.getElementById('main');
  const buttonText = document.getElementById('button-text');

  navList.innerHTML = createMenuItems(creatures);

  navigation.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('nav-link')) {
      const navItem = e.target.closest('.nav-item');
      const creatureName = navItem.querySelector('.nav-link').textContent;
      buttonText.textContent = creatureName;
      main.innerHTML = createDescription(creatureName, creatures);

      const active = navList.getElementsByClassName('active');
      if (active.length) {
        active[0].classList.remove('active');
      }
      navItem.classList.add('active');
    }
  });

  function createMenuItems(creatures) {
    const menuItems = creatures.map(
      ({ name }) =>
        `<li class="nav-item"><a href="" class="nav-link">${name}</a></li>`
    );
    return menuItems.join('');
  }

  function createDescription(creatureName, creatures) {
    const creature = creatures.find(({ name }) => name === creatureName);
    if (!creature) return;
    const { imageUrl, name, description } = creature;

    return `<div class="description">
      <img class="description-image"
        src="${imageUrl}"
        alt="${name}"
      /> 
      <p class="description-text">${description}</p>
    </div>`;
  }
});
