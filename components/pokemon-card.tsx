import Link from "next/link"

interface PokemonCardProps {
    name: string
}

export function PokemonCard({ name } : PokemonCardProps ){
    return (
        <Link
            href={"/details/" + `${name}`} 
            className="group rounded-lg border border-transparent m-3 px-5 py-4 transition-colors dark:border-gray-500 hover:border-gray-400 hover:bg-neutral-700"
            key={name + "Card"}
        >
            <h2 className={`text-2xl font-semibold`}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
                &nbsp; &rarr;
            </h2>
        </Link>
    )
}