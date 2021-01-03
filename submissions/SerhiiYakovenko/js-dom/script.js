const articles = [{
  heading: "City at day",
  img: "img/city.jpg",
  text: "Enter the massive open world of Night City, a place that sets new standards in terms of visuals, complexity and depth.",
},
{
  heading: "City at night",
  img: "img/night-city.jpg",
  text: `Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.
      You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.
      You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.`,
},
{
  heading: "Mercenary",
  img: "img/mercenary.jpg",
  text: "Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements and build your legend on the streets of Night City.",
},
{
  heading: "Implants",
  img: "img/implant.jpg",
  text: "Take the riskiest job of your life and go after a prototype implant that is the key to immortality.",
},
];

const body = document.body
const header = document.createElement("header");
const h1 = document.createElement("h1");
const main = document.createElement("main");
const footer = document.createElement("footer");
const p = document.createElement("p");
const nav = document.createElement("nav");
const navList = document.createElement("ul");

h1.textContent =
"Welcome to the CyberDOM. Here you can get more info about Cyberpunk 2077 game.";
header.appendChild(h1);
body.appendChild(header);
nav.classList.add("nav");
navList.classList.add("nav__items");
nav.appendChild(navList);
main.classList.add("main");

articles.forEach((article) => {
navList.insertAdjacentHTML("afterbegin", `<li class="nav__item"> ${article.heading} </li>`);
main.insertAdjacentHTML("afterbegin",
  `<div class="main__item ${article.heading.toLowerCase().split(" ").join("_")} hidden">
  <p class="main__content">${article.text}</p>
  <img class="main_image" src="${article.img}" alt="${article.img.replace("img/", "").replace(".jpg", "")}"></img>
</div>`)
});

body.appendChild(nav);
body.appendChild(main);

p.insertAdjacentHTML(
"afterbegin",
`Created by <a href="https://github.com/serhiiyakovenko" target="_blank">serhiiyakovenko</a> for <a href="https://kottans.org/" target="_blank">kottans</a>`
);
footer.appendChild(p);
body.appendChild(footer);

navList.addEventListener('click', function (event) {
hideArticles();
document
  .getElementsByClassName(
    event.target.textContent.toLowerCase().trim().split(" ").join("_")
  )[0]
  .classList.remove("hidden");
});

function hideArticles() {
let arrayOfElements = Array.from(
  document.getElementsByClassName("main__item")
);
arrayOfElements.map((element) => {
  if (!element.classList.contains("hidden")) element.classList.add("hidden");
});
}
