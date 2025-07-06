import {
  QueryDropdown,
  RangeSelector,
  PokemonSortSelector,
} from '@/components/features';
import {
  POKEMON_GENERATION_VALUES,
  POKEMON_TYPES,
  POKEMON_ABILITIES,
} from '@/constants/pokemonsConstants';
import { sortOptions } from '@/constants/sortConstants';

export const FilterPanel = () => {
  return (
    <div className="flex justify-center mb-4 px-4">
      <div className="w-full max-w-4xl p-4 bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 rounded-lg my-4 space-y-6 border border-amber-400">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <QueryDropdown
            label="Abilities"
            queryKey="abilities"
            options={POKEMON_ABILITIES}
          />
          <QueryDropdown
            label="Types"
            queryKey="types"
            options={POKEMON_TYPES}
          />
          <QueryDropdown
            label="Generations"
            queryKey="gen"
            options={POKEMON_GENERATION_VALUES}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <RangeSelector label="Attack" min={0} max={255} />
          <RangeSelector label="Defense" min={0} max={230} />
          <RangeSelector label="Speed" min={0} max={200} />
        </div>
        <PokemonSortSelector label="Sort Pokémon" options={sortOptions} />
      </div>
    </div>
  );
};
