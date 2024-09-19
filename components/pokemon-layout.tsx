"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { PokemonCard } from "./pokemon-card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LoadMoreButton } from "./loadmore-button";

interface PokemonLayoutProps{
    pokemonList: string[];
    next: string | null;
}

interface Pokemon {
    name: string;
    url: string;
}

type PokemonName = string;

interface Pokemon {
    name: PokemonName;
}

export  function PokemonLayout({ pokemonList:initialPokemonList, next:initialNext }:PokemonLayoutProps) {
    //console.log("-------------------POKEMON LIST ------------------------------\n", initialPokemonList);
    //console.log("---------------------NEXT----------------------\n", initialNext);

    const [ searchText, setSearchText ] = useState("");
    const [ pokemonList, setPokemonList ] = useState(initialPokemonList || []);
    const [ next, setNext ] = useState(initialNext || null);
    const [ loading, setLoading ] = useState(false);

    const [ allPokemons, setAllPokemons ] = useState<Pokemon[]>([]);
    const [ filteredPokemonSearch, setFilteredPokemonSearch ] = useState<PokemonName[]>([]);

    const searchFilter = (pokemonList: string[]) => {
   
        return pokemonList.filter(
            (pokemon) => pokemon.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    const filteredPokemonList = searchFilter(pokemonList);
  
    const loadMorePokemons = async () => {
        if (next) {
            setLoading(true);
            try {
                const res = await fetch(next);
                const data = await res.json();
                //console.log(data);
                
                const newPokemons = data.results.map((pokemon: { name:string }) => pokemon.name);
                //console.log("new onessss", newPokemons);
                
                setPokemonList(prevList => [...prevList, ...newPokemons]);
                setNext(data.next);
            } catch (e) {
                console.error("Error loading more pokes!", e);
            } finally {
                setLoading(false);
            }
        }
    }
    
    /* ------------------------------------------------------- */

    async function getAllPokemons() {
        let allPokemons: Pokemon[] = [];
        let nextURL: string | null = next;
        const limit = 1000;
        let fetchedPokes = 0;
        
        while (nextURL && fetchedPokes < limit) {
            const res = await fetch(nextURL);
            const data = await res.json();

            const rest = limit - fetchedPokes;
            const toAdd = data.results.slice(0, rest);
            
            allPokemons = allPokemons.concat(toAdd);
            fetchedPokes = allPokemons.length;

            if (fetchedPokes >= limit){
                break;
            }

            nextURL = data.next;
        }    
        //console.log(allPokemons);
        setAllPokemons(allPokemons);
    }
    useEffect(() => {
        getAllPokemons().catch(error => console.error("Error fetching all Pokémon:", error));
    }, []);

    const pokemonsName:PokemonName[]= allPokemons.map(p => p.name);
    
    //console.log(pokemonsName);
    

    const handleChange = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const searchValue = searchText.toLowerCase();
            setSearchText(searchValue);

            const filter: PokemonName[] = pokemonsName.filter(pokemon => pokemon.toLowerCase().includes(searchValue))

            setFilteredPokemonSearch(filter);
        }
    }

    return (
        <>
            <div className="relative">
                <Image 
                    src={"/search.png"}
                    width={400}
                    height={400}
                    alt="hola"
                    className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 rounded-md bg-slate-800 bg-opacity-60 backdrop-blur-md">
                <h3 className="text-xl py-4 text-center font-mono">Search for your favorite pokemon!</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pokemonName" className="text-sm text-gray-300 shadow-lg bold font-mono">Pokemon's Name:</Label>
                    <Input 
                        type="text" 
                        value={searchText} 
                        autoComplete="off"
                        id="pokemonName"
                        placeholder="enter the pokemon name here..."
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleChange}
                        className="bg-gray-600"
                    />
                    <p className="m-4 text-center text-gray-300">Can't find your fave pokemon? 
                    <span className="block text-sm text-gray-300 mt-1">Type it in and hit <span className="inline-block text-md bg-green-500 text-black border border-green-700 rounded-full px-2 py-1 ml-1 font-semibold">Enter</span> to search for the card!</span>
                    </p>
                </div>
            </div>
            </div>
            <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
            

            <div className="mb-2 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            {filteredPokemonList.map((pokemon: any) => (
                <Suspense fallback={<p>Loading ... Please wait 😗 </p>}>
                    <PokemonCard name={pokemon} next={next} key={pokemon + "Card"} />                    
                </Suspense>
                )
            )}
            {filteredPokemonSearch.map((pokemonsName: PokemonName) => (
                <Suspense key={pokemonsName} fallback={<p>Loading ... Please wait 😗 </p>}>
                    <PokemonCard name={pokemonsName} next={next} key={pokemonsName + "Card"}/>
                </Suspense>
            ))}
            </div>
            { next && (
                <LoadMoreButton onLoadMore={loadMorePokemons} loading={loading} />
            )}
        </>
    )
}