import creatures from './tower.js';

document.addEventListener('DOMContentLoaded', () => {
  const navigation = document.getElementById('navigation');
  const main = document.getElementById('main');
  const buttonText = document.getElementById('button-text');

  navigation.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-item')) {
      buttonText.textContent = e.target.textContent;

      // main.innerHTML = '';
      let desc = main.getElementsByClassName('description');
      if (desc.length) {
        desc[0].remove();
      }
      let newDesc = createDescription(e.target.textContent, creatures);
      main.appendChild(newDesc);
      // main.insertAdjacentElement('beforeend', newDesc);

      let active = navigation.getElementsByClassName('active');
      if (active.length) {
        active[0].classList.remove('active');
      }
      e.target.classList.add('active');
    }
  });

  function createDescription(creatureName, creatures) {
    const creature = creatures.find((c) => {
      return c.name === creatureName;
    });

    const newDescription = document.createElement('div');
    newDescription.classList.add('description');

    const image = document.createElement('img');
    image.src = creature.imageUrl;
    image.alt = creature.name;
    image.classList.add('description-image');
    newDescription.appendChild(image);

    const text = document.createElement('p');
    text.textContent = creature.description;
    text.classList.add('description-text');
    newDescription.appendChild(text);

    return newDescription;
  }
});
