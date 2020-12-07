
const hamburgerToggle = document.querySelector('#menu-toggle');

const flexMenu = document.querySelector('.flex-menu');

const asideMenuList = document.getElementById("aside-menu-list");

function respondToTheClick({target}) {

  const matchedAttribute = target.dataset.menu;
  const activeSectionItem = document.querySelector('.section.active');
  activeSectionItem.classList.remove('active');
  const matchedSection = document.querySelector(`.section[data-content='${matchedAttribute}']`);
  matchedSection.classList.add('active');
  
}

hamburgerToggle.addEventListener('click', () => flexMenu.classList.toggle('activeToggle'));

asideMenuList.addEventListener('click', respondToTheClick);
