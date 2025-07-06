import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { extractFilterParams } from './helpers/filter';
import { DEFAULT_QUERY_PARAMS } from '@/constants/baseConstants';
import { POKEMON_STAT } from '@/constants/pokemonConstants';
import type { Pokemon } from '@/types/pokemons';

export function usePokemonFilter(pokemons: Pokemon[]) {
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search')?.toLowerCase() || '';

  // Extract keys from query params excluding default ones (like pagination, sorting, etc.)
  // These keys represent filter categories (e.g., abilities, types)
  const filterKeys = Array.from(searchParams.keys()).filter(
    (key) => !DEFAULT_QUERY_PARAMS.includes(key)
  );

  // Build a filters object where each key maps to an array of selected filter values
  // For example, abilities: ['overgrow', 'chlorophyll']
  const filters = filterKeys.reduce(
    (acc, key) => {
      const val = searchParams.get(key);
      if (val) {
        // Split by comma for multi-select filter values, otherwise single value in array
        const vals = val.includes(',') ? val.split(',') : [val];
        acc[key] = vals.map((v) => v.toLowerCase());
      }
      return acc;
    },
    {} as Record<string, string[]>
  );
  const filteredPokemons = useMemo(() => {
    return pokemons
      .filter((p) => (search ? p.name.toLowerCase().includes(search) : true))
      .filter(
        (p) =>
          !filters.abilities ||
          extractFilterParams(p.abilities, filters.abilities)
      )
      .filter(
        (p) => !filters.types || extractFilterParams(p.types, filters.types)
      )
      .filter(
        (p) =>
          !filters.gen || extractFilterParams(p.generationKeys, filters.gen)
      )
      .filter((p) =>
        POKEMON_STAT.every((statKey) => {
          if (!filters[statKey]) return true;
          const maxValue = Number(filters[statKey][0]);
          return (
            !isNaN(maxValue) &&
            p.stats[statKey] !== undefined &&
            p.stats[statKey] <= maxValue
          );
        })
      );
  }, [pokemons, search, filters]);

  return filteredPokemons;
}
