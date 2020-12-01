
/* Toggle menu */

const hamburgerToggle = document.querySelector('#menu-toggle');

hamburgerToggle.addEventListener('click', function (e) {
  e.preventDefault();

  document.querySelector('.flexmenu').classList.toggle('active');
});

/* Aside menu -  interactive side-menu*/

let arrAside = ["aside-html", "aside-css", "aside-bootstrap", "aside-js", "aside-jquery", "aside-git"];
let arrContent = ["html-section", "css-section", "bootstrap-section", "js-section", "jquery-section", "git-section"];

const myCustomDiv = document.getElementById("aside-container");

function respondToTheClick(evt) {

    for (let i = 0; i < arrAside.length; i++) {
      if (arrAside[i] !== evt.target.id) {
        document.getElementById(arrContent[i]).style.display = "none";
      } else {
        document.getElementById(arrContent[i]).style.display = "block";
      }

    }
    
}

myCustomDiv.addEventListener('click', respondToTheClick);