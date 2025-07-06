import type { Pokemon } from '@/types/pokemons';

export const exportToJSON = (pokemon: Pokemon) => {
  const filename = `${pokemon.name}.json`;
  const json = JSON.stringify(pokemon, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
