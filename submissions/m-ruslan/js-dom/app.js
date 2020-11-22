document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is loaded");
  loadPageData("info");

  for (i in pageSections) {
    document
      .querySelector("#" + pageSections[i].id)
      .addEventListener("click", (event) => {
        console.log(event.path[0].id);
        let section = event.path[0].id;
        loadPageData(section);
      });
  }
});

let loadPageData = (section) => {
  let sectionData = pageSections[section];
  let imgHTMLText =
    '<img src="' +
    sectionData.imgSrc +
    '" alt="' +
    sectionData.altText +
    '" class="article-content__item article-content__img" id="article-content__img">';
  document.querySelector("#article__header").innerHTML = sectionData.h2Text;
  document.querySelector("#article-content__text").innerHTML =
    imgHTMLText + sectionData.pText;
};

let pageSections = {
  info: {
    id: "info",
    h2Text: "General Info",
    pText:
      "The Lord of the Rings is an epic high fantasy novel by the English author and scholar J. R. R. Tolkien. Set in Middle-earth, the world at some distant time in the past, the story began as a sequel to Tolkien's 1937 children's book The Hobbit, but eventually developed into a much larger work.<br>Written in stages between 1937 and 1949, The Lord of the Rings is one of the best-selling books ever written, with over 150 million copies sold.",
    imgSrc: "./img/book.gif",
    altText: "Book cover",
  },
  books: {
    id: "books",
    h2Text: "Books",
    pText:
      "Although generally known to readers as a trilogy, the work was initially intended by Tolkien to be one volume of a two-volume set along with The Silmarillion, but this idea was dismissed by his publisher. For economic reasons, The Lord of the Rings was published in three volumes over the course of a year from 29 July 1954 to 20 October 1955.<br>The three volumes were titled The Fellowship of the Ring, The Two Towers and The Return of the King. Structurally, the work is divided internally into six books, two per volume, with several appendices of background material at the end. Some editions print the entire work into a single volume, following the author's original intent.",
    imgSrc: "./img/ltr_book.png",
    altText: "LOTR Books trilogy",
  },
  radio: {
    id: "radio",
    h2Text: "Radio",
    pText:
      "The book has been adapted for radio four times. In 1955 and 1956, the BBC broadcast The Lord of the Rings, a 13-part radio adaptation of the story. In the 1960s radio station WBAI produced a short radio adaptation. A 1979 dramatization of The Lord of the Rings was broadcast in the United States and subsequently issued on tape and CD. In 1981, the BBC broadcast The Lord of the Rings, a new dramatization in 26 half-hour instalments.",
    imgSrc: "./img/radio.jpg",
    altText: "LOTR on the Radio",
  },
  films: {
    id: "films",
    h2Text: "Films",
    pText:
      "The most successful adaptation is Peter Jackson's live action The Lord of the Rings film trilogy, produced by New Line Cinema and released in three instalments as The Lord of the Rings: The Fellowship of the Ring (2001), The Lord of the Rings: The Two Towers (2002), and The Lord of the Rings: The Return of the King (2003). All three parts won multiple Academy Awards, including consecutive Best Picture nominations.<br> The final instalment of this trilogy was the second film to break the one-billion-dollar barrier and won a total of 11 Oscars (something only two other films in history, Ben-Hur and Titanic, have accomplished), including Best Picture, Best Director and Best Adapted Screenplay.<br>Commentators including Tolkien scholars, literary critics and film critics are divided on how faithfully Jackson adapted Tolkien's work, or whether a film version is inevitably different, and if so the reasons for any changes, and the effectiveness of the result.",
    imgSrc: "./img/films.jpg",
    altText: "LOTR Films Poster",
  },
  vgames: {
    id: "vgames",
    h2Text: "Video Games",
    pText:
      "Numerous computer and video games have been inspired by J. R. R. Tolkien's works set in Middle-earth. Titles have been produced by studios such as Electronic Arts, Vivendi Games, Melbourne House, and Warner Bros. Interactive Entertainment.",
    imgSrc: "./img/video_game.jpg",
    altText: "LOTR video game poster",
  },
  bgame: {
    id: "bgame",
    h2Text: "Board Game",
    pText:
      "Lord of the Rings is a board game based on the high fantasy novel The Lord of the Rings by J. R. R. Tolkien. Published in 2000 by Kosmos in Germany, Wizards of the Coast in the U.S., and Parker Brothers in the U.K., the game is designed by Reiner Knizia and features artwork by illustrator John Howe. It won a Spiel des Jahres special award for best use of literature in a game and in 2004 it won the Games Magazine Games 100 Honor in the Family Strategy category. A slightly revised version was later published by Fantasy Flight Games.<br>The board game was highly unusual when it was published, because it is a cooperative board game — each player plays a hobbit in the party, and the party will succeed or fail as a group to destroy the One Ring, thus winning or losing the game.",
    imgSrc: "./img/board_game.jpg",
    altText: "LOTR board Game poster",
  },
  tv: {
    id: "tv",
    h2Text: "Television",
    pText:
      "In 2017, Amazon acquired the global television rights to The Lord of the Rings for a multi-season television series of new stories set before The Hobbit and The Lord of the Rings, based on Tolkien's descriptions of events of the Second Age of Middle-earth.<br>Amazon bought the television rights for The Lord of the Rings for $250 million in November 2017, making a five season production commitment worth at least $1 billion. This would make it the most expensive television series ever.<br>Filming began in February 2020 in Auckland, New Zealand, after negotiations between Amazon and the New Zealand government ensured the series could be produced in the country where the film trilogy was made. Production was placed on hold in March due to the COVID-19 pandemic, but resumed in September.<br>The Lord of the Rings is expected to premiere on Prime Video in 2021. A second season was formally ordered in November 2019.",
    imgSrc: "./img/tv.jpg",
    altText: "LOTR and Amazon poster",
  },
};
