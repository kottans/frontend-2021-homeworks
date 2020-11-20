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
      const item = e.target.parentElement;
      const name = item.firstElementChild.textContent;
      buttonText.textContent = name;
      main.innerHTML = createDescription(name, creatures);

      const active = navigation.getElementsByClassName('active');
      if (active.length) {
        active[0].classList.remove('active');
      }
      item.classList.add('active');
    }
  });

  function createMenuItems(data) {
    const items = data.map(
      ({ name }) =>
        `<li class="nav-item"><a href="" class="nav-link">${name}</a></li>`
    );
    return items.join('');
  }

  function createDescription(creatureName, creatures) {
    const creature = creatures.find(({ name }) => name === creatureName);
    const image = `<img class="description-image"
      src="${creature.imageUrl}"
      alt="${creature.name}"
    />`;
    const text = `<p class="description-text">${creature.description}</p>`;
    const newDescription = `<div class="description">${image} ${text}</div>`;

    return newDescription;
  }
});
