import { Events } from './events.js';
export class SidebarComponent {
  SORT_DIRECTION_TOP = "top";
  SORT_DIRECTION_BOTTOM = "bottom";
  FILTER_ACTIVE = "active";

  constructor(events, container) {
    this.container = container;
    this.events = events;

    this.cache = {};

    this.activeFilter = "";
    this.activeFilterBtn = null;

    this.activeSort = "";
    this.activeSortState = "";
    this.activeSortBtn = null;

    this.pokemons = [];
    this._pokemons = [];

    this.filters = [];
    this.sorts = [];
    this.search = "";

    this.subscribe();
  }

  subscribe() {
    this.events.subscribe(({ type, data }) => {
      if (type === Events.api) {
        this.setPokemons(data);
        this.sendPokemons();

        // I`m using two separate methods for more
        // readable code
        // In production better way is to use one
        // iteration per pokemons for creating
        // filters and sorts.
        this.createFilters();
        this.createSorts();
        this.render();
        this.addEventListeners();
      }
    });
  }

  setPokemons(data) {
    const pokemons = data.map((pokemon) => {
      const newStats = {};
      const newTypes = pokemon.types.map(({ type }) => type.name);

      pokemon.stats.forEach((stat) => {
        newStats[stat.stat.name] = stat.base_stat;
      });

      pokemon.stats = newStats;
      pokemon.types = newTypes;

      return pokemon;
    });

    this.pokemons = pokemons;
    this._pokemons = pokemons;
  }

  sendPokemons() {
    this.events.next({
      type: "pokemons",
      data: this.pokemons,
    });
  }

  addEventListeners() {
    this.container.addEventListener("click", (event) => {
      this.clickHandler(event);
    });

    this.container
      .querySelector('[type="search"]')
      .addEventListener("input", (event) => {
        this.searchHandler(event.target.value);
      });
  }

  clickHandler({ target }) {
    const btn = target.closest("button");

    if (btn) {
      const method = btn.dataset.click;

      this[method](btn);
    }
  }

  searchHandler(value) {
    value ? this.handleSearch(value) : this.handleEmptySearch();
  }

  handleEmptySearch() {
    this.pokemons =
      this.activeFilter || this.activeSort
        ? this.cache[this.getHash()]
        : this._pokemons;

    this.sendPokemons(this.pokemons);
  }

  handleSearch(value) {
    const pokemonsToFilter =
      this.activeFilter || this.activeSort
        ? this.cache[this.getHash()]
        : this._pokemons;

    this.pokemons = pokemonsToFilter.filter(({ name }) =>
      name.includes(value.toLowerCase())
    );

    this.sendPokemons(this.pokemons);
  }

  sortClick(btn) {
    const sortCategory = btn.dataset.sort;

    if (!this.activeSort) {
      this.setNewSort(btn);
    } else if (this.activeSort === sortCategory) {
      this.updateActiveSort();
    } else {
      this.activeSortBtn.dataset.sortType = "";
      this.setNewSort(btn);
    }

    const sortedPokemons = this.sortPokemons(this.pokemons);

    this.pokemons = sortedPokemons;
    this.setPokemonsToCache(sortedPokemons);
    this.sendPokemons(sortedPokemons);
  }

  setNewSort(btn) {
    const sortCategory = btn.dataset.sort;

    this.activeSortBtn = btn;
    this.activeSort = sortCategory;
    this.activeSortState = this.SORT_DIRECTION_BOTTOM;
    this.activeSortBtn.dataset.sortType = this.SORT_DIRECTION_BOTTOM;
  }

  updateActiveSort() {
    if (this.activeSortState === this.SORT_DIRECTION_BOTTOM) {
      this.activeSortState = this.SORT_DIRECTION_TOP;
      this.activeSortBtn.dataset.sortType = this.SORT_DIRECTION_TOP;
    } else {
      this.activeSort = "";
      this.activeSortState = "";
      this.activeSortBtn.dataset.sortType = "";
      this.activeSortBtn = null;
    }
  }

  sortPokemons(pokemonsToSort) {
    let pokemons = this.getPokemonFromCache();

    if (pokemons) {
      return pokemons;
    }

    if (this.activeSortState === this.SORT_DIRECTION_BOTTOM) {
      pokemons = [...pokemonsToSort].sort((pokemonA, pokemonB) => {
        return (
          pokemonB.stats[this.activeSort] - pokemonA.stats[this.activeSort]
        );
      });
    } else {
      pokemons = [...pokemonsToSort].sort((pokemonA, pokemonB) => {
        return (
          pokemonA.stats[this.activeSort] - pokemonB.stats[this.activeSort]
        );
      });
    }

    return pokemons;
  }

  getPokemonFromCache() {
    const hash = this.getHash();

    if (hash === "") {
      return this._pokemons;
    }

    if (this.cache[hash]) {
      return this.cache[hash];
    }
  }

  getHash() {
    return (
      this.search + this.activeSort + this.activeSortState + this.activeFilter
    );
  }

  setPokemonsToCache(pokemons) {
    this.cache[this.getHash()] = pokemons;
  }

  filterClick(btn) {
    const filterCategory = btn.dataset.filter;

    if (!this.activeFilter) {
      this.setNewFilter(btn);
    } else if (this.activeFilter === filterCategory) {
      this.updateActiveFilter();
    } else {
      this.activeFilterBtn.dataset.filterType = "";

      this.setNewFilter(btn);
    }

    const filteredPokemons = this.filterPokemons();

    this.pokemons = filteredPokemons;
    this.setPokemonsToCache(filteredPokemons);
    this.sendPokemons(filteredPokemons);
  }

  setNewFilter(btn) {
    this.activeFilterBtn = btn;
    this.activeFilter = btn.dataset.filter;
    this.activeFilterBtn.dataset.filterType = this.FILTER_ACTIVE;
  }

  updateActiveFilter() {
    this.activeFilter = "";
    this.activeFilterBtn.dataset.filterType = "";
    this.activeFilterBtn = null;
  }

  filterPokemons() {
    if (this.getPokemonFromCache()) {
      return this.getPokemonFromCache();
    }

    const hash = this.getHash();
    let pokemonsToFilter;

    if (this.activeSort && this.cache[hash]) {
      pokemonsToFilter = this.cache[hash];
    } else if (this.activeSort && !this.cache[hash]) {
      pokemonsToFilter = this.sortPokemons(this._pokemons);
    } else {
      pokemonsToFilter = this._pokemons;
    }

    return pokemonsToFilter.filter(({ types }) =>
      types.includes(this.activeFilter)
    );
  }

  createFilters() {
    const filters = [];

    this.pokemons.forEach(({ types }) => {
      types.forEach((type) => {
        if (!filters.includes(type)) {
          filters.push(type);
        }
      });
    });

    this.filters = filters;
  }

  createSorts() {
    // As all pokemon`s stats are the same I`m using only one pokemon
    // to generate sorts
    this.sorts = Object.keys(this.pokemons[0].stats);
  }

  render() {
    const searchBlock = this.generateSearchBlock();
    const sortBlock = this.generateSortBlock();
    const filterBlock = this.generateFilterBlock();

    this.container.innerHTML = searchBlock + sortBlock + filterBlock;
  }

  generateSearchBlock() {
    return `
      <label class="search">
        Search: 
        <input type="search" class="search__input" placeholder="Any name">
      </label>
    `;
  }

  generateSortBlock() {
    return `
      <p class="sidebar__title">Sort:</p>
      <ul class="btn-list">
        ${this.generateSortItems()}
      </ul>
    `;
  }

  generateSortItems() {
    return this.sorts
      .map((sortCategory) => {
        return `
        <li class="btn-list__item">
          <button 
            class="btn-list__btn" 
            data-sort="${sortCategory}" 
            data-sort-type="" 
            data-click="sortClick"
            >
            By ${sortCategory}
          </button>
        </li>
      `;
      })
      .join("");
  }

  generateFilterBlock() {
    return `
      <p class="sidebar__title">Filter:</p>
      <ul class="btn-list">
        ${this.generateFilterItems()}
      </ul>     
    `;
  }

  generateFilterItems() {
    return this.filters
      .map((filterCategory) => {
        return `
        <li class="btn-list__item">
          <button 
            class="btn-list__btn" 
            data-filter="${filterCategory}"
            data-filter-type=""
            data-click="filterClick"
            >
            ${filterCategory}
          </button>
        </li> 
      `;
      })
      .join("");
  }
}
