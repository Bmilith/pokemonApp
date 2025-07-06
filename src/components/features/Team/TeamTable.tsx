import { useMemo } from 'react';
import { TeamRow } from './TeamRow';
import { TeamSummary } from './TeamSummary';
import { Button, TableHeader } from '@/components/core';
import { teamColumns } from '@/constants/teamConstants';
import type { Pokemon } from '@/types/pokemons';

interface DataTablePokemonProps {
  team: Pokemon[];
  onRemove: (name: string) => void;
}

export function TeamTable({ team, onRemove }: DataTablePokemonProps) {
  if (team.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No Pokémon in your team yet.
      </p>
    );
  }

  const rows = useMemo(() => {
    return team.map((pokemon, index) => (
      <TeamRow
        key={pokemon.name}
        pokemon={pokemon}
        index={index}
        onRemove={onRemove}
      />
    ));
  }, [team, onRemove]);

  return (
    <>
      <div className="sm:hidden space-y-4 dark:bg-white">
        {team.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border p-4 rounded shadow bg-white"
            role="group"
            aria-label={`Pokemon ${pokemon.name}`}
          >
            <div className="flex items-center gap-3 mb-3">
              {pokemon.image && (
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-10 h-10"
                  loading="lazy"
                />
              )}
              <h4 className="font-semibold text-lg">{pokemon.name}</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-2">
              <p>
                <strong>HP:</strong> {pokemon.stats?.hp ?? '-'}
              </p>
              <p>
                <strong>Attack:</strong> {pokemon.stats?.attack ?? '-'}
              </p>
              <p>
                <strong>Defense:</strong> {pokemon.stats?.defense ?? '-'}
              </p>
              <p>
                <strong>Speed:</strong> {pokemon.stats?.speed ?? '-'}
              </p>
              <p className="col-span-2">
                <strong>Types:</strong> {pokemon.types.join(', ') || '-'}
              </p>
            </div>
            <Button
              onClick={() => onRemove(pokemon.name)}
              label="Remove"
              variant="primary"
            />
          </div>
        ))}
      </div>

      <div className="hidden sm:block overflow-x-auto dark:bg-white">
        <table className="w-full table-auto border-collapse border border-gray-300 min-w-[600px]">
          <TableHeader columns={teamColumns} />
          <tbody>{rows}</tbody>
        </table>
      </div>
      <TeamSummary team={team} />
    </>
  );
}
