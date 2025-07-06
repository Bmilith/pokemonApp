import type { PokemonAxiosDataInfo } from '@/types/context';
import type { Pokemon } from '@/types/pokemons';

export const getTotalStats = (pokemon?: Pokemon): number =>
  pokemon?.stats ? Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;

export const findPokemonsByNames = (
  pokemons: Pokemon[],
  name1: string,
  name2: string
): [Pokemon | undefined, Pokemon | undefined] => {
  const first = pokemons.find((p) => p.name === name1);
  const second = pokemons.find((p) => p.name === name2);
  return [first, second];
};

export function transformToPokemon(res: PokemonAxiosDataInfo): Pokemon {
  return {
    name: res.name,
    image: res.sprites.other.home.front_default,
    types: res.types.map((t: any) => t.type.name),
    stats: res.stats.reduce((acc: Record<string, number>, cur: any) => {
      acc[cur.stat.name] = cur.base_stat;
      return acc;
    }, {}),
    generationKeys: Object.keys(res.sprites.versions || {}),
    abilities: res.abilities.map((t: any) => t.ability.name),
  };
}
