export class Api {
  aliases = { list: "https://pokeapi.co/api/v2/pokemon?limit=50" };

  constructor() { }

  async getPokemons() {
    const response = await fetch(this.aliases.list);
    const { results } = await response.json();

    const streamPokemons = await Promise.all(
      results.map((pokeApi) => fetch(pokeApi.url))
    );
    const pokemons = await Promise.all(
      streamPokemons.map((streamPokemon) => streamPokemon.json())
    );

    return pokemons;
  }
}
