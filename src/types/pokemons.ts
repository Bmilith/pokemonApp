export interface Pokemon {
  name: string;
  stats: Record<string, number>;
  types: string[];
  image: string;
  generationKeys: string[];
  abilities: string[];
}
