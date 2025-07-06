import { useState } from 'react';
import { Alert, Card } from '@/components/core';
import type { AlertType } from '@/types/base';
import type { Pokemon } from '@/types/pokemons';

interface Props {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
  addToTeam: (name: string) => void;
  removeFromTeam: (name: string) => void;
  isInTeam: (name: string) => boolean;
  teamCount: number;
}

export const PokemonCard = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onClick,
  addToTeam,
  removeFromTeam,
  isInTeam,
  teamCount,
}: Props) => {
  const { name } = pokemon;

  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 1200);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite();
    showAlert(
      isFavorite ? 'success' : 'error',
      isFavorite
        ? `${name} removed from favorites`
        : `${name} added to favorites`
    );
  };

  const handleToggleTeam = () => {
    if (isInTeam(name)) {
      removeFromTeam(name);
      showAlert('success', `${name} removed from team`);
    } else {
      addToTeam(name);
      showAlert('success', `${name} added to team`);
    }
  };

  return (
    <>
      <Card
        pokemon={pokemon}
        isFavorite={isFavorite}
        isInTeam={isInTeam(name)}
        onImageClick={onClick}
        onToggleFavorite={handleToggleFavorite}
        onToggleTeam={handleToggleTeam}
        teamCount={teamCount}
      />

      {alert && (
        <div className="fixed bottom-10 right-10 z-50 bg-gray-300 dark:bg-white">
          <Alert type={alert.type}>{alert.message}</Alert>
        </div>
      )}
    </>
  );
};
