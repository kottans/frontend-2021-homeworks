import { movies } from "./data.js";

const main = document.querySelector(".main");
const navList = document.querySelector(".navbar__list");
const headerTitle = document.querySelector(".header__title");

render(movies.all);

headerTitle.addEventListener("click", function () {
	render(movies.all);
});

navList.addEventListener("click", function (event) {
	render(movies[event.target.id]);
});

function render(genre) {
	main.innerHTML = '';

	const filmCards = document.createElement("div");
	filmCards.className = "main__container";

	genre.forEach(function (film) {
		const filmData = document.createElement("div");
		const filmDescr = document.createElement("p");
		const card = document.createElement("div");
		const cover = document.createElement("img");
		const title = document.createElement("h2");
		const year = document.createElement("p");
		const rating = document.createElement("p");
		const director = document.createElement("p");

		cover.setAttribute("src", film.cover);
		cover.setAttribute("alt", "cover");

		filmDescr.classList.add("film__descr");
		cover.classList.add("film__cover", "film__cover-active");
		title.classList.add("film__title");
		year.classList.add("film__year");
		rating.classList.add("film__rating");
		director.classList.add("film__director");
		filmData.classList.add("film__data", "film__data-active");
		card.classList.add("main__container__item");

		title.textContent = `${film.title}`;
		year.textContent = `year: ${film.year}`;
		rating.textContent = `imdb: ${film.rating}`;
		filmDescr.textContent = `${film.description}`;
		director.textContent = `${film.director}`;

		filmData.append(title, year, rating, director);
		card.append(cover, filmData, filmDescr);
		filmCards.append(card);

		card.addEventListener("click", function () {
			filmDescr.classList.toggle("film__descr-active");
			cover.classList.toggle("film__cover-active");
			filmData.classList.toggle("film__data-active");
		});
	});

	main.append(filmCards);
}
