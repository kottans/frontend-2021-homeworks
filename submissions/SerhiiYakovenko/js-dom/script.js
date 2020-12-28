const items = [
  {
    heading: "City at day",
    img: "img/city.jpg",
    text:
      "Enter the massive open world of Night City, a place that sets new standards in terms of visuals, complexity and depth.",
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
    text:
      "Become a cyberpunk, an urban mercenary equipped with cybernetic enhancements and build your legend on the streets of Night City.",
  },
  {
    heading: "Implants",
    img: "img/implant.jpg",
    text:
      "Take the riskiest job of your life and go after a prototype implant that is the key to immortality.",
  },
];

const body = document.querySelector("body");

// Header
const header = document.createElement("header");
let h1 = document.createElement("h1");
h1.textContent =
  "Welcome to the CyberDOM. Here you can get more info about Cyberpunk 2077 game.";
header.appendChild(h1);
body.appendChild(header);

// Nav and Main
const nav = document.createElement("nav");
nav.classList.add("nav");
const navList = document.createElement("ul");
navList.classList.add("nav__items");
nav.appendChild(navList);

const main = document.createElement("main");
main.classList.add("main");

// Items
items.forEach((item) => {
  const navItem = createElementWithClassName("li", item.heading, "nav__item");
  const mainItem = createItem(item);
  navList.appendChild(navItem);
  main.appendChild(mainItem);
});

body.appendChild(nav);
body.appendChild(main);

// Footer
const footer = document.createElement("footer");
let p = document.createElement("p");
p.insertAdjacentHTML(
  "afterbegin",
  `Created by <a href="https://github.com/serhiiyakovenko" target="_blank">serhiiyakovenko</a> for <a href="https://kottans.org/" target="_blank">kottans</a>`
);
footer.appendChild(p);
body.appendChild(footer);

//Functions
function createElementWithClassName(tag, value, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  switch (tag) {
    case "img":
      element.src = value;
      element.alt = value.replace("img/", "").replace(".jpg", "");
      break;
    default:
      element.textContent = value;
      break;
  }
  return element;
}

function createItem(item) {
  const div = document.createElement("div");
  div.classList.add(
    "main__item",
    item.heading.toLowerCase().split(" ").join("_")
  );
  const mainItemContent = createElementWithClassName(
    "p",
    item.text,
    "main__content"
  );
  div.appendChild(mainItemContent);
  const mainItemImage = createElementWithClassName(
    "img",
    item.img,
    "main__image"
  );
  div.appendChild(mainItemImage);
  div.classList.add("hidden");
  return div;
}

// Hide and unhide items
const navSection = document.getElementsByClassName("nav__item");
for (var i = 0; i < navSection.length; i++) {
  navSection[i].addEventListener("click", function () {
    hideItems();
    document
      .getElementsByClassName(
        this.textContent.toLowerCase().split(" ").join("_")
      )[0]
      .classList.remove("hidden");
  });
}

function hideItems() {
  let arrayOfElements = Array.from(
    document.getElementsByClassName("main__item")
  );
  arrayOfElements.map((element) => {
    if (!element.classList.contains("hidden")) element.classList.add("hidden");
  });
}
