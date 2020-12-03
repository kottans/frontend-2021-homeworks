
const hamburgerToggle = document.querySelector('#menu-toggle');

const flexMenu = document.querySelector('.flex-menu');

const arrAside = [".aside-html", ".aside-css", ".aside-bootstrap", ".aside-js", ".aside-jquery", ".aside-git"];

const arrContent = [".html-section", ".css-section", ".bootstrap-section", ".js-section", ".jquery-section", ".git-section"];

const asideMenuList = document.getElementById("aside-menu-list");

const lengthOfArrAside = arrAside.length;

function respondToTheClick(evt) {

  const asideButton = arrAside.find(element => document.querySelector(element) === evt.target);
  const indexOfAsideButton = arrAside.indexOf(asideButton);
  const sectionContent = document.querySelector(arrContent[indexOfAsideButton]);

  for (let i = 0; i < lengthOfArrAside; i++) {
    
    const localSectionContent = document.querySelector(arrContent[i]);

    localSectionContent.classList.add("section-none");
    localSectionContent.classList.remove("section-block");

  }

  sectionContent.classList.add("section-block");
  sectionContent.classList.remove("section-none");

}

hamburgerToggle.addEventListener('click', () => flexMenu.classList.toggle('active'));

asideMenuList.addEventListener('click', respondToTheClick);
