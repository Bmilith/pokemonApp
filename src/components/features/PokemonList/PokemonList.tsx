import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/components/core';
import {
  PokemonCard,
  Modal,
  Pagination,
  ModalCard,
} from '@/components/features';
import { usePokemonContext } from '@/context/PokemonContext';
import {
  useTeam,
  usePokemonFilter,
  useSortedPokemons,
  useFavorites,
  usePaginationQuery,
  useCompareSelection,
} from '@/hooks';
import type { Pokemon } from '@/types/pokemons';
import { paginate } from '@/utils/paginate';

export const PokemonList = () => {
  const { pokemons, loading } = usePokemonContext();
  const [_searchParams, _setSearchParams] = useSearchParams();
  const { page, pageSize, updatePage } = usePaginationQuery();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToTeam, removeFromTeam, isInTeam, team } = useTeam();
  const filteredPokemons = usePokemonFilter(pokemons);
  const sortedPokemons = useSortedPokemons(filteredPokemons);
  const { compareSelected, toggleCompareSelection } = useCompareSelection();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
    undefined
  );

  const totalPages = Math.ceil(filteredPokemons.length / pageSize);
  const paginatedPokemons = paginate(sortedPokemons, page, pageSize);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col  min-h-screen items-center">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPokemons.map((pokemon: Pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
                isFavorite={isFavorite(pokemon.name)}
                onToggleFavorite={() => toggleFavorite(pokemon.name)}
                addToTeam={addToTeam}
                removeFromTeam={removeFromTeam}
                isInTeam={isInTeam}
                teamCount={team.length}
              />
            );
          })}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={updatePage}
        />
      </div>
      {selectedPokemon && (
        <Modal isOpen={true} onClose={() => setSelectedPokemon(undefined)}>
          <ModalCard
            pokemon={selectedPokemon}
            compareSelected={compareSelected.includes(selectedPokemon.name)}
            onCompareToggle={() => toggleCompareSelection(selectedPokemon.name)}
          />
        </Modal>
      )}
    </>
  );
};
