"use strict";
window.onload = function() {

// data for displaing
  const alboms = [
    {
      "title": "Got to Be There (1972)",
      "cover": "gtbt",
      "songs": [
        "Ain’t No Sunshine",
        "I Wanna Be Where You Are",
        "Girl Don’t Take Your Love From Me",
        "In Our Small Way",
        "Got to Be There",
        "Rockin’ Robin",
        "Wings of My Love",
        "Maria (You Were the Only One)",
        "Love Is Here And Now You’re Gone",
        "You’ve Got a Friend"
      ],
      "bgColor": 32
    },
    {
      "title": "Ben (1972)",
      "cover": "ben",
      "songs": [
        "Ben",
        "The Greatest Show on Earth",
        "People Make the World Go Round",
        "We've Got a Good Thing Going",
        "Everybody's Somebody's Fool",
        "My Girl",
        "What Goes Around Comes Around",
        "In Our Small Way",
        "Shoo-Be-Doo-Be-Doo-Da-Day",
        "You Can Cry on My Shoulder"
      ],
      "bgColor": 43
    },
    {
      "title": "Music & Me (1973)",
      "cover": "music_and_me",
      "songs": [
        "With a Child's Heart",
        "Up Again",
        "All the Things You Are",
        "Happy",
        "Too Young",
        "Doggin' Around",
        "Euphoria",
        "Morning Glow",
        "Johnny Raven",
        "Music and Me"
      ],
      "bgColor": 164
    },
    {
      "title": "Forever, Michael (1975)",
      "cover": "forever_michael",
      "songs": [
        "We're Almost There",
        "Take Me Back",
        "One Day in Your Life",
        "Cinderella Stay Awhile",
        "We've Got Forever",
        "Just a Little Bit of You",
        "You Are There",
        "Dapper Dan",
        "Dear Michael",
        "I'll Come Home to You"
      ],
      "bgColor": 13
    },
    {
      "title": "Off the Wall (1979)",
      "cover": "off_the_wall",
      "songs": [
        "Don't Stop 'Til You Get Enough",
        "Rock with You",
        "Workin' Day and Night",
        "Get on the Floor",
        "Off the Wall",
        "Girlfriend",
        "She's Out of My Life",
        "I Can't Help It",
        "It's the Falling in Love",
        "Burn This Disco Out"
      ],
      "bgColor": 19
    },
    {
      "title": "Thriller (1982)",
      "cover": "thriller",
      "songs": [
        "Wanna Be Startin' Somethin'",
        "Baby Be Mine",
        "The Girl Is Mine",
        "Thriller",
        "Beat It",
        "Billie Jean",
        "Human Nature",
        "P.Y.T. (Pretty Young Thing)",
        "The Lady in My Life"
      ],
      "bgColor": 18
    },
    {
      "title": "Bad (1987)",
      "cover": "bad",
      "songs": [
        "Bad",
        "The Way You Make Me Feel",
        "Speed Demon",
        "Liberian Girl",
        "Just Good Friends",
        "Another Part of Me",
        "Man in the Mirror",
        "I Just Can't Stop Loving You",
        "Dirty Diana",
        "Smooth Criminal",
        "Leave Me Alone"
      ],
      "bgColor": 0
    },
    {
      "title": "Dangerous (1991)",
      "cover": "dangerous",
      "songs": [
        "Jam",
        "Why You Wanna Trip on Me",
        "In the Closet",
        "She Drives Me Wild",
        "Remember the Time",
        "Can't Let Her Get Away",
        "Heal the World",
        "Black or White",
        "Who Is It",
        "Give in to Me",
        "Will You Be There",
        "Keep the Faith",
        "Gone Too Soon",
        "Dangerous"
      ],
      "bgColor": 29
    },
    {
      "title": "HIStory: Past, Present and Future, Book I (1995)",
      "cover": "history",
      "songs": [
        "Scream",
        "They Don’t Care About Us",
        "Stranger in Moscow",
        "This Time Around",
        "Earth Song",
        "D.S.",
        "Money",
        "Come Together",
        "You Are Not Alone",
        "Childhood",
        "Tabloid Junkie",
        "2 Bad",
        "HIStory",
        "Little Susie",
        "Smile"
      ],
      "bgColor": 332
    },
    {
      "title": "Invincible (2001)",
      "cover": "invincible",
      "songs": [
        "Unbreakable",
        "Heartbreaker",
        "Invincible",
        "Break of Dawn",
        "Heaven Can Wait",
        "You Rock My World",
        "Butterflies",
        "Speechless",
        "2000 Watts",
        "You Are My Life",
        "Privacy",
        "Don't Walk Away",
        "Cry",
        "The Lost Children",
        "Whatever Happens",
        "Threatened"
      ],
      "bgColor": 215
    },
    {
      "title": "Michael (2010)",
      "cover": "michael",
      "songs": [
        "Hold My Hand",
        "Hollywood Tonight",
        "Keep Your Head Up",
        "(I Like) The Way You Love Me",
        "Monster",
        "Best of Joy",
        "Breaking News",
        "(I Can't Make It) Another Day",
        "Behind the Mask",
        "Much Too Soon"
      ],
      "bgColor": 8
    },
    {
      "title": "Xscape (2014)",
      "cover": "xscape",
      "songs": [
        "Love Never Felt So Good",
        "Chicago",
        "Loving You",
        "A Place with No Name",
        "Slave to the Rhythm",
        "Do You Know Where Your Children Are",
        "Blue Gangsta",
        "Xscape"
      ],
      "bgColor": 33
    }
  ];

  // definition of page elements
  var doc = document.querySelector("body");
  var navTab = document.querySelector(".navigation");
  var infoTab = document.querySelector(".info");

  // filling the menu block
  navTab.innerHTML = "";
  var navTabBtn;
  for (var i = 0; i < alboms.length; i++) {
    navTabBtn = document.createElement("button");
    navTabBtn.classList.add("navigation_btn");
    navTabBtn.innerText = alboms[i].title;
    navTab.append(navTabBtn);
  };
  var navTabBtns = document.querySelectorAll(".navigation_btn");
  var navTabBtnsArray = Array.prototype.slice.call(navTabBtns);

  // listening for click events for buttons
  navTab.addEventListener("click", menuHandler);

  function menuHandler(e) {
    var selectedBtnIndex = navTabBtnsArray.indexOf(e.target);
    var infoList;
    var infoLine;
    infoTab.innerHTML = "";
    doc.style.setProperty("--background_color_h", alboms[selectedBtnIndex].bgColor);
    infoTab.style.backgroundImage = "url(img/" + alboms[selectedBtnIndex].cover + ".jpg)";
    infoList = document.createElement("ul");
    for (var i = 0; i < alboms[selectedBtnIndex].songs.length; i++) {
      infoLine = document.createElement("li");
      infoLine.innerText = alboms[selectedBtnIndex].songs[i];
      infoList.append(infoLine);
    };
    infoTab.append(infoList);
  };
};
