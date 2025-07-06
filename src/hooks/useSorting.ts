import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getGenerationRank,
  getStatValue,
  getTotalPower,
} from './helpers/sorting';
import { PokemonStat } from '@/constants/pokemonsConstants';
import { PokemonSortType } from '@/constants/sortConstants';
import type { Pokemon } from '@/types/pokemons';

export function useSortedPokemons(pokemons: Pokemon[]): Pokemon[] {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  const sortedPokemons = useMemo(() => {
    const sorted = [...pokemons];

    switch (sort) {
      case PokemonSortType.NAME_ASC:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case PokemonSortType.NAME_DESC:
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case PokemonSortType.POWER:
        return sorted.sort((a, b) => getTotalPower(b) - getTotalPower(a));
      case PokemonSortType.GEN_ASC:
        return sorted.sort(
          (a, b) => getGenerationRank(a, false) - getGenerationRank(b, false)
        );
      case PokemonSortType.SPEED_DESC:
        return sorted.sort(
          (a, b) =>
            getStatValue(b, PokemonStat.SPEED) -
            getStatValue(a, PokemonStat.SPEED)
        );
      case PokemonSortType.DEFENSE_DESC:
        return sorted.sort(
          (a, b) =>
            getStatValue(b, PokemonStat.DEFENSE) -
            getStatValue(a, PokemonStat.DEFENSE)
        );
      case PokemonSortType.ATTACK_DESC:
        return sorted.sort(
          (a, b) =>
            getStatValue(b, PokemonStat.ATTACK) -
            getStatValue(a, PokemonStat.ATTACK)
        );
      default:
        return sorted;
    }
  }, [pokemons, sort]);

  return sortedPokemons;
}
