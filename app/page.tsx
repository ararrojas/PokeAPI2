import { PokemonLayout } from "@/components/pokemon-layout";
import { getPokemonList } from "@/lib/pokemonAPI";

interface PokemonResponse {
  name: string,
}
export default async function Home() {

    const { pokemon, next } = await getPokemonList();

    const pokemonName = pokemon.map(p => p.name);
    //console.log(pokemon);
    

    return (
    <PokemonLayout pokemonList={pokemonName} next={next} />
  );
}
