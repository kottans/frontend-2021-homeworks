const getMoviesByGenre = async (movieGenre) => {
  const API_KEY = "6a4ca56d29d657ff19ba2cf05591a088";
  const imgBaseUrl = "http://image.tmdb.org/t/p/w300/";
  const reqUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2020&with_genres=${movieGenre}`;
  const responce = await fetch(reqUrl);
  const data = await responce.json();
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";

  data.results.forEach((el) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    const img = document.createElement("img");
    const imgUrl = `${imgBaseUrl}${el.poster_path}`;
    img.setAttribute("src", imgUrl);
    movieCard.innerHTML = `
      <img src="${imgUrl}" />
      <div class="title">
        <div class="card-header">
          <h5>${el.title}</h5>
          <h6>${el.vote_average}</h6>
        </div>
        <p class="card-description">
        ${el.overview.slice(0, 150)}...
        </p>
      </div>
    `;
    cardsContainer.append(movieCard);
  });
  console.log(data);
};

const handler = (e) => {
  const { target } = e;
  const genreId = target.dataset.genre;
  const currentActive = document.querySelector("a.active");
  const mainHeader = document.querySelector("main h2");
  mainHeader.textContent = `Movies in category ${target.textContent}`;
  currentActive.classList.remove("active");
  target.classList.add("active");
  getMoviesByGenre(genreId);
  showToggle();
};

const showToggle = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("show");
};

document
  .querySelectorAll("[data-genre]")
  .forEach((el) => el.addEventListener("click", handler));

document.querySelector(".menu-chevron").addEventListener("click", showToggle);

getMoviesByGenre(28);
