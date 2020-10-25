const state = {
  items: [
    {
      menu: 'First',
      header: "First Item",
      image: "img/first.png",
      description: "This is the first one."
    },
    {
      menu: 'Second',
      header: "Second Item",
      image: "img/second.png",
      description: "This is the second one."
    },
    {
      menu: 'Third',
      header: "Third Item",
      image: "img/third.png",
      description: "This is the third one."
    },
  ],
  activeIndex: null,
};

const menuItemClickListener = (event)=>{
  let elem = event.target;
  state.activeIndex = elem.parentNode.id;
  renderPage(state);
  event.stopPropagation();
};

const renderMenu = (state)=>{
  let nav = document.querySelector('nav');
  let prevUl = document.querySelector('ul');
  let fragment = document.createDocumentFragment();
  let ul = document.createElement("ul");

  state.items.forEach((item,index)=>{
    let li = document.createElement("li");
    let a = document.createElement("a");
    li.id = index;
    a.innerHTML = item.menu;
    a.className = "menu-item";
    if (index==state.activeIndex) {
      a.classList.toggle("active");
    }
    a.addEventListener('click',menuItemClickListener);
    li.appendChild(a);
    ul.appendChild(li);
  });

  fragment.appendChild(ul);
  prevUl.remove();
  nav.appendChild(fragment);
};

const renderArticle = (content)=> {

  //console.log(content);
  let article = document.querySelector('article');
  let fragment = document.createDocumentFragment();
  
  let h = document.createElement("h3");
  h.innerHTML = content.header;
  fragment.appendChild(h);

  let img = document.createElement("img");
  img.src = content.image;
  fragment.appendChild(img);
  
  let p = document.createElement("p");
  p.innerHTML = content.description;
  fragment.appendChild(p);
  
  article.innerHTML="";
  article.appendChild(fragment);

};

const renderPage = (state) => {

  renderMenu(state);
  //console.log(state)
  if (state.activeIndex) {
    renderArticle(state.items[state.activeIndex]);
  };
};

// start App when DOM is loaded
document.addEventListener('DOMContentLoaded', (event)=>{

  // Read first menu item content from default HTML layout
  let menu = "Overview";
  let header = document.querySelector('article > h3').innerHTML;
  let image = document.querySelector('article > img').src;
  let description = document.querySelector('article > p').innerHTML;

  state.items.unshift({
    menu,
    header,
    image,
    description,
  });

  renderPage(state);
});
