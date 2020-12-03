export class CardsComponent {
  constructor(events, container) {
    this.container = container;
    this.pokemons = null;
    this.events = events;

    this.subscribe();
  }

  subscribe() {
    this.events.subscribe(({ type, data }) => {
      if (type === "pokemons") {
        this.pokemons = data;
        this.render();
      }
    });
  }

  render() {
    this.container.innerHTML = this.generateCards();
  }

  generateCards() {
    return `
      <ul class="cards">
          ${this.pokemons.map((pokemon) => this.generateCard(pokemon)).join("")}
      </ul>
    `;
  }

  generateCard(pokemon) {
    const name = pokemon.name;
    const image = pokemon.sprites.other["official-artwork"].front_default;

    return `
      <li class='card'>
        <p class='card__title'>${name || "unknown"}</p>
        <img src='${image}' alt='${name} image' class='card__img'>
        <ul class='card__list'>${this.generateStats(pokemon)}</ul>
      </li>
    `;
  }

  generateStats(pokemon) {
    return Object.entries(pokemon.stats)
      .map(([name, value]) => {
        return `
        <li class="card__list-item">
          <p>${name}</p>
          <p>${value}</p>
        </li>
      `;
      })
      .join("");
  }
}
