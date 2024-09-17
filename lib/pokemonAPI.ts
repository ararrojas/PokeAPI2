interface Pokemon{
    name:string
    url:string
}

const baseURL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonList() {
    const res = await fetch(baseURL);
    const data = await res.json();

    const nextPokemon = data.next;

    const pokemonList:Pokemon[] = data.results;

    const detailsPokemon = await Promise.all(
        pokemonList.map( async (pokemon) => {
            const detailsRes = await fetch(pokemon.url);
            const details = await detailsRes.json();
            return {
                name: pokemon.name,
                details,
            }
        })
    );
    //console.log(detailsPokemon);
    return {
        next: nextPokemon,
        pokemon: detailsPokemon
    }
}