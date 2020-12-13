const movies = [
  {
    name: "The Grand Budapest Hotel",
    storyline:
      "<p>THE GRAND BUDAPEST HOTEL recounts the adventures of Gustave, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.</p> <p>The story involves the theft and recovery of a priceless Renaissance painting and the battle for an enormous family fortune, all against the back-drop of a suddenly and dramatically changing Continent.</p>",
    year: " 2014",
    genres: " Adventure | Comedy | Crime",
    img: "./img/grand.jpg",
  },
  {
    name: "Moonrise Kingdom",
    storyline:
      "<p>Set on an island off the coast of New England in the 1960s, as a young boy and girl fall in love they are moved to run away together. Various factions of the town mobilize to search for them and the town is turned upside down - which might not be such a bad thing.</p>",
    year: " 2012",
    genres: " Comedy | Drama | Romance",
    img: "./img/moonrise.jpg",
  },
  {
    name: "The Darjeeling Limited",
    storyline:
      "<p>A year after the accidental death of their father, three brothers, each suffering from depression - meet for a train trip across India. Francis, the eldest, has organized it. The brothers argue, sulk, resent each other, and fight.</p><p> The youngest, Jack, estranged from his girlfriend, is attracted to one of the train's attendants. Peter has left his pregnant wife at home, and he buys a venomous snake. After a few days, Francis discloses their surprising and disconcerting destination. Amid foreign surroundings, can the brothers sort out their differences? A funeral, a meditation, a hilltop ritual, and the Bengal Lancer figure in the reconciliation.</p>",
    year: " 2007",
    genres: " Comedy | Drama | Adventure",
    img: "./img/limited.jpg",
  },
  {
    name: "The Royal Tenenbaums",
    storyline:
      "<p>Three grown prodigies, all with a unique genius of some kind, and their mother are staying at the family household. Their father, Royal had left them long ago, and comes back to make things right with his family.</p>",
    year: " 2001",
    genres: " Comedy | Drama",
    img: "./img/the-royal.jpg",
  },
  {
    name: "Fantastic Mr. Fox",
    storyline:
      '<p>This is the story of Mr. Fox and his wild ways of hen heckling, turkey taking, and cider sipping, nocturnal, instinctive adventures. He has to put his wild days behind him and do what fathers do best: be responsible. He is too rebellious. He is too wild. He is going to try "just one more raid" on the three nastiest, meanest farmers that are Walter Boggis, Nathan Bunce, and Franklin Bean.</p><p> It is a tale of crossing the line of family responsibilities and midnight adventure and the friendships and awakenings of this country life that is inhabited by Fantastic Mr. Fox and his friends.</p>',
    year: " 2009",
    genres: " Comedy | Adventure | Animation",
    img: "./img/fox.jpg",
  },
  {
    name: "Hotel Chevalier",
    storyline:
      "<p>Grief? Depression? Ambiguity in a Paris hotel room. Jack Whitman lies on a bed, ordering a grilled cheese sandwich from room service. His phone rings; it's a woman on her way to see him, a surprise.</p><p> He readies the room, moving without affect, drawing a bath, changing his clothes. She arrives, as does the food, and the complications of their relationship emerge in bits and pieces. He invites her out on the balcony to see his view. Will they make love? Is the relationship over?</p>",
    year: " 2007",
    genres: " Short | Drama | Romance",
    img: "./img/hotel.jpg",
  },
];
const sideMenu = document.querySelector(".menu");
const iconMenu = document.querySelector(".menu_icon")
const name = document.querySelector(".name");
const genres = document.querySelector(".genres");
const year = document.querySelector(".year");
const pic = document.querySelector(".pic");
const text = document.querySelector(".text");
const iconClick = () => {
    iconMenu.classList.toggle('open');
    if (iconMenu.classList.contains('open')) {
        sideMenu.classList.add('open');
    }
    else {
        sideMenu.classList.remove('open');
    }
};
const btnClick = (event) => {
  movies.forEach(function (obj) {
    if (event.target.textContent === obj.name){
      name.textContent = obj.name;
      pic.setAttribute("src", obj.img);
      pic.style.display="block";
      text.innerHTML = obj.storyline;
      year.innerHTML = "Year:" + obj.year;
      genres.innerHTML = "Genres:" + obj.genres;
    }
  });
};
sideMenu.addEventListener("click", btnClick);
iconMenu.addEventListener('click', iconClick);
