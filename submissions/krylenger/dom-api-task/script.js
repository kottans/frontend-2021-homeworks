const database = [
  {
    name: "ADVENTURE",
    img: "./images/adventure.png",
    description: [
      "Usually designed as a jack of all trades, Adventure bikes tend to feature long travel suspension, a decent sized screen, high seat height, extensive luggage options, optional wire-spoked wheels and decent drop protection.",
      "They aim for maximum capability, range and the odd bit of very light off-road/dirt track adventuring, although taking a large heavy bike properly off-road will be very hard work. Some older definitions also referred to them as dual purpose, dual sport and on / off-road bikes.",
      "The bikes tend to be so good at commuting, touring, sports and more recently looking good, that they are generally taking over from the other types of bike, particularly sports bikes with their aggressive and uncomfortable geometry.",
    ],
    models: ["BMW R1250GS", "Honda Africa Twin", "BMW S1000XR"],
    avgPrice: "Average price: $15.000",
  },
  {
    name: "NAKED",
    img: "./images/naked.png",
    description: [
      'Roughly half of naked bikes tend to start off life as last season\'s range topping sports bikes, which then have their fairing removed to make them "naked". Other tweaks usually involve making the geometry less aggressive, flatter handlebars, no screen, single light cluster and some tidying up of wiring etc to showcase the engine.',
      "The engine is sometimes from a previous generation sports bike to save cost. They are also referred to as roadsters, especially by BMW, or standard bikes while the highest power models are sometimes called muscle bikes, street fighters or hyper-nakeds.",
    ],
    models: [
      "Kawasaki Z H2",
      "KTM 1290 Super Duke R",
      "Ducati Streetfighter V4 S",
    ],
    avgPrice: "Average price: $9.000",
  },
  {
    name: "CRUISER",
    img: "./images/cruiser.png",
    description: [
      "Cruisers tend to have a very relaxed feet forward riding position with the body upright or leaning slightly back, a very low seat, large rear tyre, raked out fork and an engine focused on low down torque rather than top end power. They also tend to be really heavy and the power figure will often look at odds with the size of the engine, for instance only getting 165bhp out of a 2.5 litre engine in the Triumph Rocket 3 R.",
      "They are more about looking and sounding good at low speeds than getting from A to B as fast as possible and getting your knee down in the corners although they will also munch motorway miles with ease. The plentiful low down torque also allows a more relaxed approached to gear changes.",
      "Ducati like to be a bit different and have worked out how to make a bike with cruiser styling perform like an outright sports bike with the XDiavel. In the USA cruisers are the most popular style of motorbike by some margin with Harley Davidson being a main player.",
    ],
    models: [
      "Kawasaki Vulcan S",
      "Ducati XDiavel S",
      "Harley Davidson Street Rod",
    ],
    avgPrice: "Average price: $15.000",
  },
  {
    name: "TOURING",
    img: "./images/touring.png",
    description: [
      "You can tour on almost any motorbike or scooter if you put your mind to it, however some are more suited to touring than others. Touring bikes are all about luggage capacity, range, comfort for two, all the toys you could want and sometimes even camping gear to boot.",
      "They aren't about light weight performance or, like sports tourers, a compromise between sportiness and outright touring capability. Unfortunately there is a down side to all that capability; they tend to be some of the heaviest bikes on the road. Some are built specifically for the job, like the Honda Goldwing, while others are based around sports tourers or adventure bikes like the Yamaha Tracer 900 GT.",
      'They often feature fixed panniers or a fancy system to remove the luggage quickly without ruining the looks of the bike. Cruiser derived tourers are sometimes referred to as "baggers" or "fully dressed".',
    ],
    models: ["Honda Goldwing", "BMW K1600GT", "Kawasaki Ninja 1000SX"],
    avgPrice: "Average price: $25.000",
  },
  {
    name: "SPORT",
    img: "./images/sport.png",
    description: [
      "Sports bikes have one goal in mind, which is going as fast as possible from A to B. They achieve this by minimising weight while at the same time maximising power, ideally around 1bhp per 1kg of weight. They also tend to have a low aggressive riding position, full aerodynamic fairing, state of the art technology and the best lean angle possible for cornering as low as possible.",
      "The most expensive bikes are usually closely related to the manufacturer's MotoGP race bike of the time.Sales have been suffering recently though because they aren't that comfortable, pillion friendly, economical or really that practical for everyday riding and if you can only have one bike an Adventure or Sport Touring model probably makes more sense, particularly if you won't be taking it anywhere near a track.",
      "The middle capacities, around 600cc, have suffered the most though with the only real option still on sale being the gorgeous Yamaha R6.",
    ],
    models: ["BMW S1000RR", "Yamaha YZF-R1", "Kawasaki Ninja H2"],
    avgPrice: "Average price: $13.000",
  },
  {
    name: "SUPERMOTO",
    img: "./images/supermoto.png",
    description: [
      "Supermoto bikes, sometimes called Supermotard, are designed for racing on tracks made up of tarmac, dirt and jump sections. ",
      'To optimise the bikes for all three they tend to feature wire-spoke wheels, very long travel suspension, great ground clearance, very basic equipment and a noticeable high "beak" as the front fender.',
      "They also tend to be simple single cylinder engines with large wheels and chunky tyres.",
    ],
    models: [
      "Husqvarna 701 Supermoto",
      "KTM 690 SMC R",
      "Ducati Hypermotard 1100 EVO SP",
    ],
    avgPrice: "Average price: $10.000",
  },
  {
    name: "OFFROAD",
    img: "./images/offroad.png",
    description: [
      'The hallmarks of bikes specifically designed for off-road work tend to be very light weight, wire-spoked wheels, some form of protection under the engine in case of grounding, engine bars in case it drops, long travel suspension, hardly any screen in case you go over the top and usually "knobbly" tyres for improved grip.',
      "They are popular for green laning on public byways / un-tarmacked roads.",
    ],
    models: ["HONDA CRF450RX", "HUSQVARNA FX450", "KTM 450XC-F"],
    avgPrice: "Average price: $11.000",
  },
  {
    name: "RETRO",
    img: "./images/retro.png",
    description: [
      "Most of the retro models you can buy today started life as a sporty naked bike which has been modified to look more traditional, but without sacrificing all the modern tech and riding experience you would expect from a new bike.",
      "They usually feature a single round headlight, simpler rounded clocks, stitched seats, more subtle colour schemes, rounded exhausts, loads of optional shiny bits and often wire spoked wheels or cast wheels designed to look a little bit like spokes from a distance.",
      "Closely related are modern cafe racers which tend to start life as retro naked bikes but with the addition of low bars, a headlight fairing and pillion seat hump.",
    ],
    models: ["Kawasaki Z900RS", "Triumph Speed Twin", "Moto Guzzi V7 III"],
    avgPrice: "Average price: $10.000",
  },
];

const navBtnToggle = document.querySelector(".nav-btn-toggle");
const nav = document.querySelector(".nav");
const navUl = document.querySelector(".nav__ul");
const main = document.querySelector(".main");
const mainHeader = document.querySelector(".main__header");
const mainImage = document.querySelector(".main__img");
const mainDescription = document.querySelector(".main__description");
const mainDescriptionText = document.querySelector(".main__description-text");
const mainUlBikes = document.querySelector(".main__ul-bikes");
const mainAvgPrice = document.querySelector(".main__avg-price");


const handleNavBtnToggle = ({ target }) => {

    navBtnToggle.classList.toggle("nav-btn-toggle--nav-closed");
    nav.classList.toggle("nav--closed");
    main.classList.toggle("main--wide");
    navUl.classList.toggle("nav__ul--display-none");
};

const handleNavigationClick = ({ target }) => {
  
  if (target.classList.contains('nav__link')) {
    const sectionName = target.textContent;
    const section = database.find((item) => item.name.toLowerCase() === sectionName.toLowerCase());
    mainHeader.textContent = section.name;
    mainImage.setAttribute("src", section.img);
    mainAvgPrice.textContent = section.avgPrice;
  
    const fragmentBikes = document.createDocumentFragment();
    const fragmentDescription = document.createDocumentFragment();
  
    section.models.forEach((model) => {
      const bike = document.createElement("li");
      bike.textContent = model;
      fragmentBikes.appendChild(bike);
    });
    
    section.description.forEach((description) => {
      const desc = document.createElement("p");
      desc.textContent = description;
      desc.classList.add("main__description-p");
      fragmentDescription.appendChild(desc);
    });
    
    const navLinks = document.querySelectorAll(".nav__link");
    navLinks.forEach((link) => {
      if (link.classList.contains("nav__link--orange")) {
        link.classList.remove("nav__link--orange");
      }
      target.classList.add("nav__link--orange");
    });
    
    mainUlBikes.innerHTML = "";
    mainDescription.innerHTML = "";
    mainUlBikes.appendChild(fragmentBikes);
    mainDescription.appendChild(fragmentDescription);
  }
};

const loadNavLi = () => {

  const fragmentUlList = document.createDocumentFragment();
  database.forEach(section => {
    const li = document.createElement('li');
    li.classList.add('nav__li');
    const link = document.createElement('a');
    link.classList.add('nav__link');
    link.textContent = section.name;
    li.append(link);
    fragmentUlList.append(li);
  })
  navUl.append(fragmentUlList);
}

const initApp = () => {

  loadNavLi();
  navBtnToggle.addEventListener("click", handleNavBtnToggle);
  navUl.addEventListener("click", handleNavigationClick);
}

document.addEventListener('DOMContentLoaded', initApp)
