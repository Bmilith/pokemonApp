import { useEffect, useState } from 'react';
import { FAVORITES_KEY } from '@/constants/baseConstants';
import type { UseFavorites } from '@/types/hooks';

export const useFavorites = (): UseFavorites => {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    try {
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    /**
     * Toggles the favorite status for a given Pokémon name.
     * If the name is already a favorite, remove it.
     * Otherwise, add it to favorites.
     */
    setFavorites((prev) => {
      const newFavorites = { ...prev };
      if (newFavorites[name]) {
        delete newFavorites[name];
      } else {
        newFavorites[name] = true;
      }
      return newFavorites;
    });
  };

  const isFavorite = (name: string) => !!favorites[name];

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
