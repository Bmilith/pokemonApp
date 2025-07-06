export interface PaginationQuery {
  page: number;
  pageSize: number;
  updatePage: (newPage: number) => void;
}

export interface UseFavorites {
  favorites: Record<string, boolean>;
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

export interface UseCompareSelection {
  compareSelected: string[];
  toggleCompareSelection: (pokemonName: string) => void;
}

export interface UseTeam {
  team: string[];
  addToTeam: (name: string) => void;
  removeFromTeam: (name: string) => void;
  isInTeam: (name: string) => boolean;
}
