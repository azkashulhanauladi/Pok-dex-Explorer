const TYPE_COLORS = {
    normal: "bg-stone-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400 text-slate-900",
    grass: "bg-emerald-500",
    ice: "bg-cyan-400 text-slate-900",
    fighting: "bg-red-700",
    poison: "bg-purple-600",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-yellow-700",
    ghost: "bg-violet-700",
    dragon: "bg-indigo-700",
    dark: "bg-neutral-700",
    steel: "bg-slate-500",
    fairy: "bg-rose-400",
};

export default function PokemonCard({ pokemon, onSelect }) {
    const primaryImage =
        pokemon.sprites?.other?.["official-artwork"]?.front_default ||
        pokemon.sprites?.front_default ||
        "";

    return (
        <article
            onClick={() => onSelect(pokemon.id)}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-red-300 hover:shadow-md sm:p-5"
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                    #{String(pokemon.id).padStart(3, "0")}
                </span>
            </div>

            <div className="my-3 flex h-32 items-center justify-center sm:h-36">
                {primaryImage ? (
                    <img
                        src={primaryImage}
                        alt={pokemon.name}
                        loading="lazy"
                        onError={(e) => {
                            if (
                                pokemon.sprites?.front_default &&
                                e.currentTarget.src !== pokemon.sprites.front_default
                            ) {
                                e.currentTarget.src = pokemon.sprites.front_default;
                            }
                        }}
                        className="h-28 w-28 object-contain transition duration-200 group-hover:scale-105 sm:h-32 sm:w-32"
                    />
                ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-slate-100 text-xs text-slate-400">
                        No Image
                    </div>
                )}
            </div>

            <h2 className="text-center text-base font-bold capitalize text-slate-800 sm:text-lg">
                {pokemon.name}
            </h2>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {pokemon.types?.map((t) => {
                    const typeName = t.type.name;
                    const badgeStyle = TYPE_COLORS[typeName] || "bg-slate-500";
                    return (
                        <span
                            key={typeName}
                            className={`rounded-full px-3 py-0.5 text-xs font-semibold capitalize text-white ${badgeStyle}`}
                        >
                            {typeName}
                        </span>
                    );
                })}
            </div>
        </article>
    );
}