import { GENERATION_ORDER_MAP } from '@/constants/pokemonsConstants';
import { Pokemon } from '@/types/pokemons';

export const getTotalPower = (pokemon: Pokemon) => {
  const {
    hp = 0,
    attack = 0,
    defense = 0,
    specialAttack = 0,
    specialDefense = 0,
    speed = 0,
  } = pokemon.stats || {};
  return hp + attack + defense + specialAttack + specialDefense + speed;
};

export const getGenerationRank = (pokemon: Pokemon, useNewest = false) => {
  if (!pokemon.generationKeys || pokemon.generationKeys.length === 0) return 0;

  const ranks = pokemon.generationKeys.flatMap((gen) =>
    GENERATION_ORDER_MAP[gen] ? [GENERATION_ORDER_MAP[gen]] : []
  );

  if (ranks.length === 0) return 0;

  return useNewest ? Math.max(...ranks) : Math.min(...ranks);
};

export const getStatValue = (pokemon: Pokemon, statName: string): number => {
  return pokemon.stats?.[statName] ?? 0;
};
