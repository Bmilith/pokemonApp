import { useTranslation } from 'react-i18next';
import { Button, Heading } from '@/components/core';
import type { Pokemon } from '@/types/pokemons';

interface SidebarProps {
  favorites: Pick<Pokemon, 'name' | 'image'>[];
  team: string[];
  onAddToTeam: (pokemonName: string) => void;
  onToggleFavorite: (pokemonName: string) => void;
}

export function Sidebar({
  favorites,
  team,
  onAddToTeam,
  onToggleFavorite,
}: SidebarProps) {
  const { t } = useTranslation();

  return (
    <aside className="w-full bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 p-4 border-r md:border-r box-border">
      <Heading size="sm" color="secondary" title={t('team.favorite')} />
      {favorites && favorites.length > 0 ? (
        <ul className="space-y-4">
          {favorites.map((p, i) => (
            <li
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-orange-100 p-2 rounded shadow"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <img src={p.image} alt={p.name} className="w-12 h-12" />
                <span className="text-base">{p.name}</span>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => onAddToTeam(p.name)}
                  disabled={team.includes(p.name) || team.length >= 20}
                  label="Add to team"
                  variant="primary"
                />
                <Button
                  onClick={() => onToggleFavorite(p.name)}
                  label="Remove"
                  variant="primary"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-base md:text-xl text-red-500 font-semibold mt-5">
          {t('sidebar.noFavorites')}
        </p>
      )}
    </aside>
  );
}
