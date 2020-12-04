
const hamburgerToggle = document.querySelector('#menu-toggle');

const flexMenu = document.querySelector('.flex-menu');

const arrAside = [".aside-html", ".aside-css", ".aside-bootstrap", ".aside-js", ".aside-jquery", ".aside-git"];

const arrContent = [".html-section", ".css-section", ".bootstrap-section", ".js-section", ".jquery-section", ".git-section"];

const asideMenuList = document.getElementById("aside-menu-list");

const lengthOfArrAside = arrAside.length;


function respondToTheClick({target}) {

  const matchedAttribute = target.dataset.menu;
  const activeSectionItem = document.querySelector('.section.active');
  activeSectionItem.classList.remove('active');
  const matchedSection = document.querySelector(`.section[data-content='${matchedAttribute}']`);
  matchedSection.classList.add('active');
  
}

hamburgerToggle.addEventListener('click', () => flexMenu.classList.toggle('active'));

asideMenuList.addEventListener('click', respondToTheClick);
