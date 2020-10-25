const init = () => {
  const imgBaseUrl = "http://image.tmdb.org/t/p/w300/";
  const API_KEY = "6a4ca56d29d657ff19ba2cf05591a088";

  const cardsContainer = document.querySelector(".cards-container");
  const genreList = document.querySelectorAll("[data-genre]");
  const menuChevron = document.querySelector(".menu-chevron");

  const getMoviesByGenre = async (movieGenre) => {
    const reqUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=${movieGenre}`;
    const response = await fetch(reqUrl);
    const data = await response.json();
    render(data);
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

  const handler = ({ target }) => {
    const genreId = target.dataset.genre;
    const currentActive = document.querySelector(".sidebar a.active");
    const mainHeader = document.querySelector(".main-header");
    mainHeader.textContent = `Movies in category ${target.textContent}`;
    currentActive.classList.remove("active");
    target.classList.add("active");
    getMoviesByGenre(genreId);
    toggleSidebar();
  };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("show");
    menuChevron.classList.toggle("activated");
  };

  const addClickHandler = (el) => el.addEventListener("click", handler);

  genreList.forEach(addClickHandler);

  menuChevron.addEventListener("click", toggleSidebar);

  getMoviesByGenre(28); //First initiation with Action genre id
};

init();
