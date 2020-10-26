  const imgBaseUrl = "http://image.tmdb.org/t/p/w300/";
  const API_KEY = "6a4ca56d29d657ff19ba2cf05591a088";
  const INITIAL_GENRE = 28;

  const cardsContainer = document.querySelector(".cards-container");
  const genreList = document.querySelector(".genre__list");
  const menuChevron = document.querySelector(".menu-chevron");
  const mainHeader = document.querySelector(".main-header");
  const genreLinks = Array.from(document.querySelectorAll(".genre__list-link"));

  const getMoviesByGenre = async (movieGenre) => {
    const reqUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=${movieGenre}`;

    try {
      const response = await fetch(reqUrl);
      const data = await response.json();
      render(data);
    }
    catch(error) {
      console.log(error);
    }
  };

  const deleteActiveLink = () => genreLinks.map((el) => el.classList.contains('active') ? el.classList.remove('active') : null);

  const handler = ({ target }) => {
    if (target.matches(".genre__list-link")) {
      const genreId = target.dataset.genre;
      mainHeader.textContent = `Movies in category ${target.textContent}`;
      console.log(target)
      deleteActiveLink();
      toggleSidebar();
      getMoviesByGenre(genreId);
      target.classList.toggle("active");
    }
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("show");
    menuChevron.classList.toggle("activated");
  };

  const render = (data) => {
    let cards = "";
    data.results.forEach((el) => {
      const imgUrl = `${imgBaseUrl}${el.poster_path}`;
      cards += `<div class="movie-card">
      <img class="card-img" src="${imgUrl}" />
        <div class="title">
          <div class="card-header">
            <h5 class="movie-title">${el.title}</h5>
            <h6 class="movie-rating">${el.vote_average}</h6>
          </div>
          <p class="card-description">
          ${el.overview.slice(0, 150)}...
          </p>
        </div>
      </div>`;
      cardsContainer.innerHTML = cards;
    });
  };

const init = () => {
  genreList.addEventListener('click', handler);
  menuChevron.addEventListener("click", toggleSidebar);
  getMoviesByGenre(INITIAL_GENRE); //First initiation with Action genre id
};

window.onload = init;
