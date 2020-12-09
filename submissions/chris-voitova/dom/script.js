const listData = [
  {
    id: "1",
    title: "Honda s2000",
    img: "s2000.jpeg",
  },
  {
    id: "2",
    title: "Mazda Miata",
    img: "miata.jpg",
  },
  {
    id: "3",
    title: "Mitsubishi Eclipse",
    img: "eclipse.jpg",
  },
  {
    id: "4",
    title: "Subaru Impreza WRX",
    img: "wrx.jpg",
  },
];

const content = document.querySelector(".content");
const list = document.querySelector(".list");

const listItemTemplate = (id, text) => {
  return `
  <li>
     <button type="button" id="${id}" class="button">${text}</button>
  </li>`;
};
const imgTemplate = (src) => {
  return `<img src="./img/${src}" alt="car" />`;
};

const addListItems = () => {
  let items = "";
  listData.forEach(({ id, title }) => {
    items += listItemTemplate(id, title);
  });
  list.innerHTML += items;
};

const addInitActiveState = () => {
  const firstListItem = list.children[0].children[0];
  const img = getImg(firstListItem);
  firstListItem.classList.add("active");
  content.innerHTML += imgTemplate(img);
};

const getImg = (target) =>
  listData.filter(({ id }) => id === target.id).map(({ img }) => img);

const renderContent = (fromTarget) => {
  const img = getImg(fromTarget);
  content.innerHTML = "";
  content.innerHTML += imgTemplate(img);
};

const handleChanges = () => {
  list.addEventListener("click", ({ target }) => {
    if (target.classList.contains("button")) {
      [...list.children].forEach(({ children }) => {
        const button = children[0];
        button.classList.remove("active");
      });
      target.classList.add("active");
      renderContent(target);
    }
  });
};

addListItems();
addInitActiveState();
handleChanges();
