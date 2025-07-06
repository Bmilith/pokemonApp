import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar, Spinner } from '@/components/core';
import { TeamTable } from '@/components/features';
import { usePokemonContext } from '@/context/PokemonContext';
import { useFavorites } from '@/hooks/useFavourites';
import { useTeam } from '@/hooks/useTeam';

export const TeamBuilderPage = () => {
  const { pokemons, loading } = usePokemonContext();
  const { team, addToTeam, removeFromTeam } = useTeam();
  const { favorites, toggleFavorite } = useFavorites();
  const { t } = useTranslation();

  const fullTeamData = useMemo(() => {
    return pokemons.filter((p) => team.includes(p.name));
  }, [team, pokemons]);

  const fullFavoriteData = useMemo(() => {
    const favoriteNames = Object.keys(favorites);
    return pokemons.filter((p) => favoriteNames.includes(p.name));
  }, [favorites, pokemons]);

  if (loading) return <Spinner size="large" />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gradient-to-br dark:from-gray-900 dark:via-red-900 dark:to-black">
      <aside className="w-full md:w-1/3 md:h-full border-b md:border-b-0 md:border-r border-gray-200 overflow-auto">
        <Sidebar
          favorites={fullFavoriteData}
          team={team}
          onAddToTeam={addToTeam}
          onToggleFavorite={toggleFavorite}
        />
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto min-h-0">
        <h1 className="text-xl sm:text-3xl font-bold mb-6 dark:text-white">
          {t('team.title')} ({team.length} / 20)
        </h1>
        <div className="min-h-[300px]">
          <TeamTable team={fullTeamData} onRemove={removeFromTeam} />
        </div>
      </main>
    </div>
  );
};
