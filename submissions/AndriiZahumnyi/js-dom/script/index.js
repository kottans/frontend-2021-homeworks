
const hamburgerToggle = document.querySelector('#menu-toggle');

const flexMenu = document.querySelector('.flex-menu');

hamburgerToggle.addEventListener('click', function (e) {

  flexMenu.classList.toggle('active');

});

const arrAside = [".aside-html", ".aside-css", ".aside-bootstrap", ".aside-js", ".aside-jquery", ".aside-git"];
const arrContent = [".html-section", ".css-section", ".bootstrap-section", ".js-section", ".jquery-section", ".git-section"];


const asideMenuList = document.getElementById("aside-menu-list");

const n = arrAside.length;

function respondToTheClick(evt) {

  for (let i = 0; i < n; i++) {
    
    const asideButton = document.querySelector(arrAside[i]);
    let sectionContent = document.querySelector(arrContent[i]);

    if (asideButton !== evt.target) {
      sectionContent.classList.add("section-none");
      sectionContent.classList.remove("section-block");
    } else {
      sectionContent.classList.add("section-block");
      sectionContent.classList.remove("section-none");
    }

  }

}

asideMenuList.addEventListener('click', respondToTheClick);
