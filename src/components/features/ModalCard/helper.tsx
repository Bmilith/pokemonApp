import { PokemonGeneration } from '@/constants/pokemonConstants';

export const getGenerationColor = (gen: string) => {
  switch (gen.toLowerCase()) {
    case PokemonGeneration.GENERATION_ONE:
      return 'bg-red-500 text-white';
    case PokemonGeneration.GENERATION_TWO:
      return 'bg-yellow-400 text-black';
    case PokemonGeneration.GENERATION_THREE:
      return 'bg-green-500 text-white';
    case PokemonGeneration.GENERATION_FOUR:
      return 'bg-blue-500 text-white';
    case PokemonGeneration.GENERATION_FIVE:
      return 'bg-indigo-600 text-white';
    case PokemonGeneration.GENERATION_SIX:
      return 'bg-purple-600 text-white';
    case PokemonGeneration.GENERATION_SEVEN:
      return 'bg-pink-500 text-white';
    case PokemonGeneration.GENERATION_EIGHT:
      return 'bg-teal-500 text-white';
    default:
      return 'bg-gray-300 text-black';
  }
};
