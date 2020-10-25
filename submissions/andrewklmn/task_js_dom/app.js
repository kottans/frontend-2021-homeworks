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

const renderMenu = (state)=>{
  let nav = document.querySelector('nav');
  let prevUl = document.querySelector('ul');
  let fragment = document.createDocumentFragment();
  let ul = document.createElement("div");
  state.items.forEach((item,index)=>{
    let li = document.createElement("li");
    li.innerHTML = item.menu;
    li.id = index;
    ul.appendChild(li);
  });
  fragment.appendChild(ul);
  prevUl.remove();
  nav.appendChild(ul);
};

const renderArticle = (contentArray)=> {

};

const renderPage = (state) => {

  renderMenu(state);
  console.log(state);

};

const menuItemClickListener = (event)=>{
  
  event.stopPropagation();
  
  let elem = event.target;
  state.activeIndex = elem.id;
  renderPage(state);
};

// start App when DOM is loade
document.addEventListener('DOMContentLoaded', (event)=>{
  
  renderPage(state);

  // bind event listeners to menu items
  document.querySelectorAll('li.menu-item').forEach((item)=>{
    item.addEventListener('click',menuItemClickListener);
  });
});
