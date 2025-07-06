import { Button } from '@/components/core';
import { TableRow } from '@/components/core/Table/TableRow';
import type { Pokemon } from '@/types/pokemons';

interface TeamRowProps {
  pokemon: Pokemon;
  index: number;
  onRemove: (name: string) => void;
}

export function TeamRow({ pokemon, index, onRemove }: TeamRowProps) {
  const cells = [
    { key: 'index', content: index + 1 },
    {
      key: 'name',
      content: (
        <div className="flex items-center gap-2 text-left">
          {pokemon.image && (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-6 h-6 sm:w-8 sm:h-8"
              loading="lazy"
            />
          )}
          {pokemon.name}
        </div>
      ),
      className: 'text-left',
    },
    { key: 'hp', content: pokemon.stats?.hp ?? '-' },
    { key: 'attack', content: pokemon.stats?.attack ?? '-' },
    { key: 'defense', content: pokemon.stats?.defense ?? '-' },
    {
      key: 'speed',
      content: pokemon.stats?.speed ?? '-',
      className: 'hidden sm:table-cell',
    },
    {
      key: 'type',
      content: pokemon.types.join(', ') || '-',
      className: 'hidden md:table-cell',
    },
    {
      key: 'action',
      content: (
        <div className="flex justify-center">
          <Button
            onClick={() => onRemove(pokemon.name)}
            label={`Remove`}
            variant="primary"
          />
        </div>
      ),
    },
  ];

  return <TableRow cells={cells} />;
}
