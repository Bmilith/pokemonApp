import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UseCompareSelection } from '@/types/hooks';

export const useCompareSelection = (): UseCompareSelection => {
  const [compareSelected, setCompareSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  /**
   * Toggles the selection of a Pokémon for comparison.
   * If already selected, it removes it from selection.
   * If no selection or one selection exists, it adds or updates accordingly.
   * When two Pokémon are selected, navigates to the comparison page.
   */
  const toggleCompareSelection = (pokemonName: string) => {
    const isSelected = compareSelected.includes(pokemonName);

    if (isSelected) {
      setCompareSelected(
        compareSelected.filter((name) => name !== pokemonName)
      );
      return;
    }

    if (compareSelected.length === 1) {
      const [firstSelection] = compareSelected;
      const newSelection = [firstSelection, pokemonName];
      setCompareSelected(newSelection);
      navigate(`/compare/${firstSelection}/with/${pokemonName}`);
    } else {
      setCompareSelected([pokemonName]);
    }
  };

  return { compareSelected, toggleCompareSelection };
};
