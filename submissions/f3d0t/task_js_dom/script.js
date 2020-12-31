const pokemons = [
	{
		id: 121,
		name: "Starmie",
		description: "This Pokémon has an organ known as its core. The organ glows in seven colors when Starmie is unleashing its potent psychic powers.",
		imagePath: "./img/121.png",
	},
	{
		id: 201,
		name: "Unown",
		description: "This Pokémon is shaped like ancient writing. It is a mystery as to which came first, the ancient writings or the various Unown. Research into this topic is ongoing but nothing is known.",
		imagePath: "./img/201.png",
	},
	{
		id: 337,
		name: "Lunatone",
		description: "The phase of the moon apparently has some effect on its power. It’s active on the night of a full moon.",
		imagePath: "./img/337.png",
	},
	{
		id: 338,
		name: "Solrock",
		description: "When it rotates itself, it gives off light similar to the sun, thus blinding its foes.",
		imagePath: "./img/338.png",
	},
	{
		id: 790,
		name: "Cosmoem",
		description: "The king who ruled Alola in times of antiquity called it the “cocoon of the stars” and built an altar to worship it.",
		imagePath: "./img/790.png",
	},
];

const createMenuList = (arrayOfPokemons, container) => {
	const wrapper = document.createElement("ul");
	arrayOfPokemons.forEach((element) => {
		const li = document.createElement("li");
		li.textContent = element.name;
		li.dataset.id = element.id;
		wrapper.appendChild(li);
	});
	container.appendChild(wrapper);
};

const getPokemonContent = (id) => {
	const wrapper = document.createElement("div");
	const currentPokemon = pokemons.find((item) => item.id == id);
	if (currentPokemon !== undefined) {
		const h2 = document.createElement("h2");
		h2.classList.add("main__name");
		h2.innerText = currentPokemon.name;
		const img = document.createElement("img");
		img.classList.add("main__img");
		img.src = currentPokemon.imagePath;
		img.alt = currentPokemon.name;
		const p = document.createElement("p");
		p.classList.add("main__text");
		p.innerText = currentPokemon.description;
		wrapper.append(h2, img, p);
		return wrapper;
	} else return false;
};

document.addEventListener("DOMContentLoaded", () => {
	const nav = document.getElementById("navigation");
	const main = document.getElementById("main");
	createMenuList(pokemons, nav);

	nav.addEventListener("click", function ({ target }) {
		const currentId = target.dataset.id;
		const oldId = nav.querySelector(".active")?.dataset.id;
		if (target.nodeName === "LI" && oldId !== currentId) {
			nav.querySelector(".active")?.classList.toggle("active");
			target.classList.toggle("active");
			let newPokemon = getPokemonContent(currentId);
			if (newPokemon) {
				main.innerHTML = "";
				main.appendChild(newPokemon);
			}
		}
	});
	document.getElementById("nav_switch").addEventListener("click", function () {
		nav.classList.toggle("active");
		this.classList.toggle("active");
	});
});
