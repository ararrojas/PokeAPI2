import PokemonImage from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";
import { getPokemonList } from "@/lib/pokemonAPI";

interface PokemonProps {
    name: string;
    details: {
        sprites: {
            other: {
                'official-artwork': {
                    front_default: string;
                    front_shiny: string;
                }
            }
        };
        weight: number;
        stats: {
            stat: {
                name: string;
            };
            base_stat: number;
        }[];
    };
}

export default async function PokemonPage({ params } : { params : { pokemonName:string }}) {

    const { pokemonName } = params;
    const { pokemon } = await getPokemonList();

    const pokemonObject = pokemon.find(p => p.name === pokemonName);

    if (!pokemonObject) {
        return <div>Pokemon not found</div>;
    }

    const { details } = pokemonObject;
    //console.log(details);
    
    const frontDefaultImage = details.sprites.other['official-artwork'].front_default;
    const frontShinyImage = details.sprites.other['official-artwork'].front_shiny;

    const capitalizedName = pokemonObject.name.charAt(0).toUpperCase() + pokemonObject.name.slice(1);

    return (
        <>
        <div className="flex flex-col text-center m-6 p-6 border-2 border-gray-700 rounded-md bg-slate-800 bg-opacity-60 backdrop-blur-md">
            <h1 className="text-4xl text-bold pt-4 ">{capitalizedName}</h1>
            <div className="m-4 flex">
                <div className="m-2" style={{ position:"relative", width:"300px", height:"300px"}}>
                    <PokemonImage 
                        image={frontDefaultImage}
                        name={"Picture of " + capitalizedName}
                    />
                </div>
                <div className="m-2" style={{ position:"relative", width:"300px", height:"300px"}}>
                    <PokemonImage 
                        image={frontShinyImage}
                        name={"Shiny Picture of " + capitalizedName}
                    />
                </div>
            </div>
            <div className="flex-col">
                <h3>Weight: {details.weight}</h3>
                    {details.stats.map( (statData:any) => {
                    
                    const statName = statData.stat.name;
                    const statValue = statData.base_stat;
                    
                    return (
                        <div className="flex mr-auto items-stretch" style={{width:"500px"}} key={statName}>
                            <h3 className="text-start mr-auto p-3 w-2/4">{statName} : {statValue}</h3>
                            <Progress className="w-2/4 m-auto" value={statValue}/>
                        </div>
                    )
                    })}
            </div>
        </div>
        </>
    )
}