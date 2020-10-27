const state = {
  items: [
    {
      menu: 'Ingénue',
      header: "The Ingénue",
      image: "img/beautiful-blonde.jpg",
      description: "Fresh off the bus from the Midwest, under twenty-five and full of wide-eyed innocence, the Ingénue is a commonly encountered specimen in Los Angeles. She came out here to be a star, so she’s not really looking for romance, but you’re certainly welcome to try.",
      habitat: "North Hollywood, Burbank, Mid-Wilshire",
      method: "How to attract h Can you help her with her acting career? If not, are you willing to lie about it? If the answer to either of those questions is yes, then you’re in. But you better nab her quick, because in all likelihood, she’s about to transform into one of two other types of L.A. women.",
    },
    {
      menu: 'Drama Queen',
      header: "The Drama Queen",
      image: "img/actress.jpg",
      description: `The Drama Queen used to be an Ingénue, had some success as an actor, at least in theater. This has translated into an over-inflated ego and sense of entitlement, but the rejection she’s faced and the fact that she hasn’t made it big yet have also granted her with massive insecurities. One minute you’re her knight in shining armor, the next you’re the scumbag who’s holding her back.`,
      habitat: "Hollywood, Los Feliz",
      method: "How to attract her: Go see all her shitty plays and tell her how great she was. She loves to date and falls deeply in love, but she’s also a fan of intense break-ups, so look out.",
    },
    {
      menu: 'Reluctant Pornstar',
      header: "The Reluctant Porn Star",
      image: "img/adult.jpg",
      description: "If the ingénue took a wrong turn on her road to fame, this is where she ended up. She’s not very talented, but she’s pretty — or she was before she got those ridiculous implants and started applying her makeup with a spackling knife.This is the third one.",
      habitat: "Encino, Reseda, Northridge",
      method: "How to attract her: Do you really want to? Well, I guess you can tell her she has the talent to be a mainstream actress. That would probably work. If it doesn’t, offer her some cocaine.",
    },
    {
      menu: 'Hipster Chick',
      header: "The Hipster Chick",
      image: "img/hipster.png",
      description: "She may have wanted to be an actor at some point, but she’s given that up. Now, she’s too cool for school and incapable of saying or doing anything that’s not dripping with irony. She loves coffee and cigarettes, doesn’t own a TV and only listens to music on vinyl.",
      habitat: "Silverlake, Echo Park",
      method: "How to attract her: Wear horn-rimmed glasses and a fedora, and don’t give a shit about anything.",
    },
    {
      menu: 'Flower Child',
      header: "The Flower Child",
      image: "img/flower.jpg",
      description: "Most of these specimens have migrated north to San Francisco or Portland, but they can still be seen sometimes in the Los Angeles area if you know where to look. You can recognize her from her sundress and unshaved armpits. She believes in free love, which is good, but she’s probably a raw vegan, so I hope you’re not hungry.",
      habitat: "Venice, Santa Monica",
      method: "How to attract her: Don’t shave, use deodorant or have a job, and always carry around a little weed (Don’t worry, it’s practically legal here).",
    },
    {
      menu: 'Gold Digger',
      header: "The Gold Digger",
      image: "img/digger.jpg",
      description: "Sadly, this is one of the more common types of L.A. women, but luckily they’re easy to spot. The twist here is that you don’t necessarily have to have a lot of money, you just have to have the potential to make it. So if you’re a junior agent or work in the mailroom at an entertainment law firm, she’ll invest her time in you. But if you don’t come through, buddy, you are screwed. All she wants is the house on the hill and the fancy car, so if you’re just looking for a trophy wife, then take your pick.",
      habitat: "Beverly Hills, Hollywood Hills, any Hills, really.",
      method: "How to attract her: What are you, an idiot? Just flash your cash!",
    },
  ],
  activeIndex: 0,
};

const getViewWidth = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

const menuToogleClickListener = (event)=>{
  let elem = event.target;
  let aside = document.querySelector('.menu-container');
  let wraper = document.querySelector('.wraper');
  
  elem.innerHTML = (elem.innerHTML == "«") ? "☰":"«";
  
  aside.classList.toggle("opened") ;
  elem.classList.toggle("burger");
  wraper.classList.toggle("wide");

  event.stopPropagation();
  return false;
};

const menuItemClickListener = (event)=>{

  if (event.target.tagName=='A') {
    state.activeIndex = event.target.parentNode.id;
    renderPage(state);
  
    if (getViewWidth() < 820) {
      document.querySelector('.btn-toogle-menu').click(); 
    }
    event.stopPropagation();
  };

  return false;
};

const renderMenu = (state)=>{
  
  let nav = document.querySelector('nav');
  let prevUl = document.querySelector('ul');
  let fragment = document.createDocumentFragment();
  let ul = document.createElement("ul");
  ul.className = "menu";

 state.items.forEach((item,index)=>{
    let li = document.createElement("li");   
    li = document.createElement("li");

    let a = document.createElement("a");
    li.id = index;
      
    a = document.createElement("a");
    a.innerHTML = item.menu;
    a.className = "menu-item";
    a.href = "javascript:void(0)";
    
    if (index==state.activeIndex) {
      a.classList.toggle("active");
    };

    li.appendChild(a);
    ul.appendChild(li);
  });

  ul.addEventListener('click',menuItemClickListener);

  fragment.appendChild(ul);
  prevUl.remove();
  nav.appendChild(fragment);
};

const showTextContent = ()=>{
  document.body.style.color = "black";
}

const renderArticle = (content)=> {

  document.body.style.color = "white";
  
  let article = document.querySelector('article');
  article.classList.add("wraper");
  article.classList.add("narrow");
  let fragment = document.createDocumentFragment();
  
  let a = document.createElement("a");
  a.innerHTML = "&laquo;";
  a.className = "btn-toogle-menu";
  a.href = "javascript:void(0)";
  a.addEventListener('click', menuToogleClickListener);
  fragment.appendChild(a);

  let h = document.createElement("h2");
  h.innerHTML = content.header;
  h.className = "header-line";
  fragment.appendChild(h);

  let img = document.createElement("img");
  img.src = content.image;
  img.className = "picture";
  img.alt = content.image + ' image';
  img.addEventListener('load',showTextContent);
  fragment.appendChild(img);

  let p = document.createElement("p");
  p.innerHTML = content.description;
  p.className = "description"
  fragment.appendChild(p);
  
  let span = document.createElement("span");
  span.innerHTML = content.habitat;
  span.className = "habitat"
  p = document.createElement("p");
  p.innerHTML = 'Habitat: ';

  p.appendChild(span);
  p.className = "habitat-line"
  fragment.appendChild(p);

  p = document.createElement("p");
  p.innerHTML = content.method;
  p.className = "method"
  fragment.appendChild(p);
  

  article.innerHTML="";
  article.appendChild(fragment);

};

const renderPage = (state) => {

  renderMenu(state);
  renderArticle(state.items[state.activeIndex]);

};

// start App when DOM is loaded
document.addEventListener('DOMContentLoaded', (event)=>{

  // Add first menu item content from default HTML layout
  state.items.unshift({
    menu: "All types:",
    header: document.querySelector('article > h2').innerHTML,
    image: document.querySelector('article > img').src,
    description: document.querySelector('p.description').innerHTML,
    habitat: document.querySelector('span.habitat').innerHTML,
    method: document.querySelector('p.method').innerHTML,
  });

  renderPage(state);
  
  if (getViewWidth() < 820) {
    document.querySelector('.btn-toogle-menu').click(); 
  }

});
