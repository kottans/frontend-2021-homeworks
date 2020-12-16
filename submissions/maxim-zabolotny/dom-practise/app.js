const state = {
    rockets: [
        {
            id: 0,
            name: "Falcon 1",
            img: 'https://lh3.googleusercontent.com/proxy/BJf2kQqYiEp0G_0jW3rN69fn9NNjwK1mkvUMwe0buZIcTUvIpuimAHx05QAYogzh4zG9ChJNERH7a4jPg0n9nIf3wmNMUSVpGTxX_KK02d9xWchTrsYumtVABFn4vWB8mg',
            description: `A two-stage light-class launch vehicle developed by SpaceX.
            The first private liquid-propellant launch vehicle to launch a payload into low-Earth orbit.
            There were five launches of this rocket, the first three launches ended in accidents.
            The launch cost of the launch vehicle was $ 7.9 million.
            Due to the low demand for carriers of this class on the market, it was decided to complete the development of the rocket. In the future, the use of the Falcon 9 booster rocket began, with the help of which it is planned to launch satellites under the already signed contracts (Orbcomm-G2, Formosat-5).`
        },
        {
            id: 1,
            name: "Falcon 9",
            img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Falcon_9_Demo-2_Launching_6_%283%29.jpg',
            description: `family of one-time and partially reusable heavy-class launch vehicles of the Falcon series of the American company SpaceX. The Falcon 9 consists of two stages and uses RP-1 kerosene (fuel) and liquid oxygen (oxidizer) as propellants. The number “9” in the title denotes the number of Merlin liquid propellant rocket engines installed in the first stage of the launch vehicle.
            The first stage of the Falcon 9 can be reused, equipped with equipment for return and vertical landing on the landing pad or the autonomous spaceport drone ship floating platform. On December 22, 2015, after the launch of 11 Orbcomm-G2 satellites into orbit, the first stage of the Falcon 9 FT launch vehicle successfully landed on the landing zone 1 for the first time.`
        },
        {
            id: 2,
            name: "Falcon Heavy",
            img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Falcon_Heavy_cropped.jpg',
            description: 'American launch vehicle (LV) of a super-heavy class with the possibility of reusing the first stage and side boosters, designed and manufactured by SpaceX and is one of the largest launch vehicles in the history of world space rocketry - along with Saturn-5, N-1 ", The" Space Shuttle "system and" Energy ". Belongs to the Falcon family and is developed on the basis of the Falcon 9 launch vehicle, using its significantly modified first stage as the central unit (stage I), as well as two additional modified Falcon 9 first stages as side boosters (the so-called "zero stage") ...'
        },
        {
            id: 3,
            name: "Crew Dragon 2",
            img: 'https://hightech.fm/wp-content/uploads/2019/12/2019072707403647929_dragoncrew-8k.jpg',
            description: `Dragon 2 (also known as Crew Dragon and Dragon V2) is SpaceX's American reusable manned spacecraft commissioned by NASA under the Commercial Crew Development (CCDev) program. Designed to deliver a crew of up to 7 people to the International Space Station (ISS) and return them to Earth. The Dragon 2 cargo variant will be used to deliver cargo to the ISS, starting with the second phase of the Commercial Resupply Services supply program, replacing the Dragon 1 cargo ship used in the first phase of the program. The cargo and manned versions of Dragon 2 are almost identical, with the exception of special technical means added into the manned version: emergency rescue systems, life support systems, information displays and controls that allow the pilot to use manual control if necessary.`
        },
        {
            id: 4,
            name: "Starship",
            img: 'https://techcrunch.com/wp-content/uploads/2019/09/Starship-Mk1-Day.jpg',
            description: `Super-heavy reusable launch vehicle developed by the private American company SpaceX since 2012. Starship is designed to launch more than 100 tons of payload into low orbit. As part of the Starship project, SpaceX is also developing a Super Heavy launch vehicle to launch a spacecraft into low-earth orbit from the ground and a Starship-based "tanker" for refueling in orbit for deep space missions. According to SpaceX CEO and Chief Engineer Elon Musk, Starship will in the future replace Falcon 9 and Falcon Heavy, the cargo and manned Dragon V2.
            The goal of SpaceX is to launch Starship: to Mars with cargo in 2022, followed by a manned flight in 2024.`
        },
    ],
    activeIndex: 0,
}

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

const toggleMenu = (e) => {
    e.target.classList.toggle("closed");
    menuContainer.classList.toggle("opened") ;
    wrapper.classList.toggle("wide");
}

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
  
    state.rockets.forEach((item,index)=>{
      const li = document.createElement("li");   
      li.id = index;
  
      const a = document.createElement("a");
      a.innerHTML = item.name;
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
    }, 150);
  };
  
  const renderArticle = (content)=> {
  
    description.classList.add("transparent");
  
    title.innerHTML = content.name;
    image.src = content.img;
    image.alt = content.name + ' image';
    description.innerHTML = content.description;
  };
  
  const renderPage = (state) => {
  
    renderMenu(state);
    renderArticle(state.rockets[state.activeIndex]);
  
  };
  
  document.addEventListener('DOMContentLoaded', (event)=>{
    
    renderPage(state);
  
    toggleMenuButton.addEventListener('click', toggleMenu);
    menuUl.addEventListener('click',menuItemClickListener);
    image.addEventListener('load',showTextContent);
  
  });