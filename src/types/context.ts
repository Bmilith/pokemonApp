import type { Pokemon } from './pokemons';

export interface PokemonData {
  name: string;
  url: string;
}

export interface PokemonAxiosData {
  results: PokemonData[];
  count: number;
  next: string | null;
  previous: string | null;
}

interface Sprites {
  other: {
    home: {
      front_default: string;
    };
  };
  versions: Record<string, unknown>;
}
interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
interface Stats {
  base_stat: string;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Abilities {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonAxiosDataInfo extends Omit<PokemonData, 'url'> {
  sprites: Sprites;
  types: Types[];
  stats: Stats[];
  abilities: Abilities[];
}

export interface PokemonContextType {
  pokemons: Pokemon[];
  loading: boolean;
}
