const state = {
  items: [
    {
      menuTitle: 'All types:',
      title: "The Types Of Women You'll Encounter In L.A.",
      image: "img/overview.jpg",
      description: "I’m not sure what Jim Morrison was talking about, because there’s no one single type of “L.A. Woman.” We’re blessed with all sorts of different kinds of ladies out here on the left coast. ",
      location: "Los Angeles",
      attractionMethod: "Here are a few of these types of southern California girls, where they’re found, and how to attract them. Select different types just from left menu and enjoy... reading! )))",
    },
    {
      menuTitle: 'Ingénue',
      title: "The Ingénue",
      image: "img/beautiful-blonde.jpg",
      description: "Fresh off the bus from the Midwest, under twenty-five and full of wide-eyed innocence, the Ingénue is a commonly encountered specimen in Los Angeles. She came out here to be a star, so she’s not really looking for romance, but you’re certainly welcome to try.",
      location: "North Hollywood, Burbank, Mid-Wilshire",
      attractionMethod: "How to attract h Can you help her with her acting career? If not, are you willing to lie about it? If the answer to either of those questions is yes, then you’re in. But you better nab her quick, because in all likelihood, she’s about to transform into one of two other types of L.A. women.",
    },
    {
      menuTitle: 'Drama Queen',
      title: "The Drama Queen",
      image: "img/actress.jpg",
      description: `The Drama Queen used to be an Ingénue, had some success as an actor, at least in theater. This has translated into an over-inflated ego and sense of entitlement, but the rejection she’s faced and the fact that she hasn’t made it big yet have also granted her with massive insecurities. One minute you’re her knight in shining armor, the next you’re the scumbag who’s holding her back.`,
      location: "Hollywood, Los Feliz",
      attractionMethod: "How to attract her: Go see all her shitty plays and tell her how great she was. She loves to date and falls deeply in love, but she’s also a fan of intense break-ups, so look out.",
    },
    {
      menuTitle: 'Reluctant Pornstar',
      title: "The Reluctant Porn Star",
      image: "img/adult.jpg",
      description: "If the ingénue took a wrong turn on her road to fame, this is where she ended up. She’s not very talented, but she’s pretty — or she was before she got those ridiculous implants and started applying her makeup with a spackling knife.This is the third one.",
      location: "Encino, Reseda, Northridge",
      attractionMethod: "How to attract her: Do you really want to? Well, I guess you can tell her she has the talent to be a mainstream actress. That would probably work. If it doesn’t, offer her some cocaine.",
    },
    {
      menuTitle: 'Hipster Chick',
      title: "The Hipster Chick",
      image: "img/hipster.png",
      description: "She may have wanted to be an actor at some point, but she’s given that up. Now, she’s too cool for school and incapable of saying or doing anything that’s not dripping with irony. She loves coffee and cigarettes, doesn’t own a TV and only listens to music on vinyl.",
      location: "Silverlake, Echo Park",
      attractionMethod: "How to attract her: Wear horn-rimmed glasses and a fedora, and don’t give a shit about anything.",
    },
    {
      menuTitle: 'Flower Child',
      title: "The Flower Child",
      image: "img/flower.jpg",
      description: "Most of these specimens have migrated north to San Francisco or Portland, but they can still be seen sometimes in the Los Angeles area if you know where to look. You can recognize her from her sundress and unshaved armpits. She believes in free love, which is good, but she’s probably a raw vegan, so I hope you’re not hungry.",
      location: "Venice, Santa Monica",
      attractionMethod: "How to attract her: Don’t shave, use deodorant or have a job, and always carry around a little weed (Don’t worry, it’s practically legal here).",
    },
    {
      menuTitle: 'Gold Digger',
      title: "The Gold Digger",
      image: "img/digger.jpg",
      description: "Sadly, this is one of the more common types of L.A. women, but luckily they’re easy to spot. The twist here is that you don’t necessarily have to have a lot of money, you just have to have the potential to make it. So if you’re a junior agent or work in the mailroom at an entertainment law firm, she’ll invest her time in you. But if you don’t come through, buddy, you are screwed. All she wants is the house on the hill and the fancy car, so if you’re just looking for a trophy wife, then take your pick.",
      location: "Beverly Hills, Hollywood Hills, any Hills, really.",
      attractionMethod: "How to attract her: What are you, an idiot? Just flash your cash!",
    },
  ],
  activeIndex: 0,
};

const menuContainer = document.querySelector('.menu-container');
const menuUl = document.querySelector('.menu');
const toggleMenuButton = document.querySelector('.btn-toogle-menu');
const wrapper = document.querySelector('.wrapper');
const title = document.querySelector('.title');
const image = document.querySelector('.picture');
const description = document.querySelector('.description');
const locationLine = document.querySelector('.habitat-line');
const locationArea = document.querySelector('.habitat');
const attractionMethod = document.querySelector('.method');

  const getViewWidth = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const maxAutoHideMenuWidth = 820;


const toggleMenu = (event)=>{
  
  event.target.classList.toggle("closed");
  menuContainer.classList.toggle("opened") ;
  wrapper.classList.toggle("wide");

};

const menuItemClickListener = (event)=>{

  if (event.target.matches('.menu-item')) {
    state.activeIndex = Number(event.target.parentNode.id);
    renderPage(state);

    if (getViewWidth() < maxAutoHideMenuWidth) {
      document.querySelector('.btn-toogle-menu').click(); 
    }
  };
};

const renderMenu = (state)=>{
  
  menuUl.innerHTML = "";

  state.items.forEach((item,index)=>{
    const li = document.createElement("li");   
    li.id = index;

    const a = document.createElement("a");
    a.innerHTML = item.menuTitle;
    a.classList.add("menu-item");
    a.href = "javascript:void(0)";
    
    if (index===state.activeIndex) {
      a.classList.toggle("active");
    };

    li.appendChild(a);
    menuUl.appendChild(li);
  });
};

const showTextContent = ()=>{
  setTimeout(()=> {
    description.classList.remove("transparent");
    locationLine.classList.remove("transparent");
    attractionMethod.classList.remove("transparent");
  }, 150); /* this timeout was added just for immitation longer time of image loading */
};

const renderArticle = (content)=> {

  description.classList.add("transparent");
  locationLine.classList.add("transparent");
  attractionMethod.classList.add("transparent");

  title.innerHTML = content.title;
  image.src = content.image;
  image.alt = content.menuTitle + ' image';
  description.innerHTML = content.description;
  locationArea.innerHTML = content.location;
  attractionMethod.innerHTML = content.attractionMethod;
};

const renderPage = (state) => {

  renderMenu(state);
  renderArticle(state.items[state.activeIndex]);

};

// start App when DOM is loaded
document.addEventListener('DOMContentLoaded', (event)=>{
  
  renderPage(state);

  toggleMenuButton.addEventListener('click', toggleMenu);
  menuUl.addEventListener('click',menuItemClickListener);
  image.addEventListener('load',showTextContent);

});
