"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { PokemonCard } from "./pokemon-card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LoadMoreButton } from "./loadmore-button";

interface PokemonLayoutProps{
    pokemonList: string[];
    next: string | null;
}

export  function PokemonLayout({ pokemonList:initialPokemonList, next:initialNext }:PokemonLayoutProps) {
    //console.log("-------------------POKEMON LIST ------------------------------\n", initialPokemonList);
    //console.log("---------------------NEXT----------------------\n", initialNext);

    const [ searchText, setSearchText ] = useState("");
    const [ pokemonList, setPokemonList ] = useState(initialPokemonList || []);
    const [ next, setNext ] = useState(initialNext || null);
    const [ loading, setLoading ] = useState(false);

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

    useEffect(() => {
        if (initialPokemonList.length) {
            setPokemonList(initialPokemonList);
        }
        if (initialNext) {
            setNext(initialNext);
        }
    }, [initialPokemonList, initialNext]);

    return (
        <>
            <div className="relative">
                <Image 
                    src={"/search.png"}
                    width={300}
                    height={300}
                    alt="hola"
                    className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 rounded-md bg-slate-800 bg-opacity-60 backdrop-blur-md">
                <h3 className="text-2xl py-4 text-center">Search for your favorite pokemon!</h3>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pokemonName" className="text-lg shadow-lg bold">Pokemon Name:</Label>
                    <Input 
                        type="text" 
                        value={searchText} 
                        autoComplete="off"
                        id="pokemonName"
                        placeholder="enter the pokemon name here..."
                        onChange={(e) => setSearchText(e.target.value)}
                        className="bg-gray-600"
                    />
                </div>
            </div>
            </div>
                <h3 className="text-3xl pt-12 pb-6 text-center">Pokemon Collection</h3>
            

            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
                {filteredPokemonList.map((pokemon: any) => {
                    return (
                        <PokemonCard name={pokemon} key={pokemon + "Card"} />
                    )
                })}
            </div>
            { next && (
                <LoadMoreButton onLoadMore={loadMorePokemons} loading={loading} />
            )}
        </>
    )
}