const places = [
  {
    id: 1,
    navTitle: "Place 1",
    title: "Basilica de la Sagrada Familia",
    src: "./assets/place1.jpg",
    text:
      "One of Europe's most unconventional churches, this spectacular basilica is the most famous sight in Barcelona. The UNESCO-listed Basilica de la Sagrada Familia stands in the northern part of the city, dominating its surroundings with its 18 spindly towers soaring high above all other monuments. The Basilica of the Sacred Family is also known in Spanish by its official name: Temple Expiatori de la Sagrada Família. Antoni Gaudí was commissioned in 1883 to design this basilica as a neo-Gothic church. But instead of following the plans, he created a signature example of his famous surrealistic Art Nouveau architecture.",
  },
  {
    id: 2,
    navTitle: "Place 2",
    title: "Gothic Quarter",
    src: "./assets/place2.jpg",
    text:
      "For 2,000 years, the Gothic Quarter has been the spiritual and secular center of the city. Relics of ancient Roman buildings are still found here, but the Middle Ages are best represented by the historic monuments packed into this quarter. A masterpiece of Gothic architecture, the medieval cathedral stands on Monte Tabor, the highest point in the town center. The Gothic Quarter is where Christopher Columbus was received by the Catholic Monarchs after his first voyage to the New World, and since the 14th and 15th centuries, the city administrations have had their seat here.",
  },
  {
    id: 3,
    navTitle: "Place 3",
    title: "The Magic Fountain",
    src: "./assets/place3.jpg",
    text:
      "One of the favorite things to do in Barcelona at night is to watch the Magic Fountain of Montjuïc, at the beginning of Avinguda Maria Cristina in the Montjuïc neighborhood. The large Art Deco fountain, erected in 1929, delights all ages with its light and water shows choreographed to music. It was designed by Carles Buigas for the 1929 International Exhibition, which took place in Montjuïc. The show lasts for about an hour.",
  },
  {
    id: 4,
    navTitle: "Place 4",
    title: "Parc Güell: Gaudí's Surrealist Park",
    src: "./assets/place4.jpg",
    text:
      "Colorful, cheerful, and full of whimsy, this splendid surrealistic park is another UNESCO World Heritage Site designed by Antoni Gaudí. Created between 1900 and 1914, the Park Güell is beautifully landscaped and features architectural elements in Gaudí's signature style. Viaducts, grottoes, a colonnaded hall, winding staircases, and semi-closed conversation seats are scattered throughout the space. These creative structures are decorated in multicolored ceramic fragments. A spectacular terrace offers panoramic views of the city and the sea. Gaudí himself loved this area of the city, and his home was located here.",
  },
  {
    id: 5,
    navTitle: "Place 5",
    title: "Casa Batlló",
    src: "./assets/place5.jpg",
    text:
      "Yet another amazing Gaudí creation, the UNESCO-listed Casa Batlló is one of the most characteristic Modernist buildings in Barcelona. The fantastical mansion was designed as a private residence for the textile manufacturer Josep Batlló i Casanovas. With its freely swinging shapes and ornamental facade, this dreamlike building looks like a castle from a surreal fairy tale.",
  },
];
const header = document.querySelector(".header");

const headerTitle = document.createElement("h1");
headerTitle.classList = "header__title";
headerTitle.innerText = "Top 5 places to visit in Barcelona";
header.appendChild(headerTitle);

const navigation = document.querySelector(".navigation");
const navMenu = document.querySelector(".navigation__menu");
const container = document.querySelector(".container__content");
const contentItem = document.querySelector(".content");

function createNavMenuBtn() {
  let content = "";
  places.forEach(function ({ id, navTitle }) {
    content += `<li class="navigation__menu-item"><a data-id="${id}" class="navigation__menu-link" href="#">${navTitle}</a></li>`;
  });
  navMenu.innerHTML = content;
}

function createContent(place) {
  const fragment = document.createDocumentFragment();
  contentItem.innerHTML = "";

  const itemTitle = document.createElement("h2");
  itemTitle.classList.add("content-title");
  itemTitle.innerText = place.title;

  const itemParagraph = document.createElement("p");
  itemParagraph.classList.add("content-text");
  itemParagraph.innerText = place.text;

  const itemImage = document.createElement("img");
  itemImage.classList.add("content-image");
  itemImage.setAttribute("src", place.src);
  itemImage.setAttribute("alt", place.title);
  fragment.append(itemTitle, itemImage, itemParagraph);

  contentItem.appendChild(fragment);
  return contentItem;
}

createNavMenuBtn();

document
  .querySelector(".navigation__menu")
  .addEventListener("click", function ({ target }) {
    const placeNumber = target.textContent;
    const container = document.querySelector(".container__content");
    const placeArray = places
      .filter((place) => place.navTitle === placeNumber)
      .map((place) => createContent(place));
    placeArray.forEach((place) => container.appendChild(place));
  });

document.getElementById("trigger").addEventListener( 'click', function () {
  open();
});

function open() {
  document.querySelector(".navigation__menu").classList.toggle("show");
}
