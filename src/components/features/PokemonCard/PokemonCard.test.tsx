import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { PokemonCard } from './PokemonCard';
import type { Pokemon } from '@/types/pokemons';
import '@testing-library/jest-dom';

jest.mock('@/components/core', () => ({
  Alert: ({ type, children }: { type: string; children: React.ReactNode }) => (
    <div data-testid="alert" data-type={type}>
      {children}
    </div>
  ),
  Card: ({ onToggleFavorite, onToggleTeam, onImageClick, pokemon }: any) => (
    <div>
      <button onClick={onToggleFavorite}>Toggle Favorite</button>
      <button onClick={onToggleTeam}>Toggle Team</button>
      <button onClick={onImageClick}>Image Click</button>
      <div>{pokemon.name}</div>
    </div>
  ),
}));

const mockPokemon: Pokemon = {
  name: 'bulbasaur',
  image: '',
  types: [],
  stats: {},
  generationKeys: [],
  abilities: [],
};

describe('PokemonCard Integration Test', () => {
  jest.useFakeTimers();

  const setup = ({
    isFavorite = false,
    isInTeamReturn = false,
    teamCount = 1,
  } = {}) => {
    const toggleFavorite = jest.fn();
    const handleClick = jest.fn();
    const addToTeam = jest.fn();
    const removeFromTeam = jest.fn();
    const isInTeam = jest.fn().mockReturnValue(isInTeamReturn);

    render(
      <PokemonCard
        pokemon={mockPokemon}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
        onClick={handleClick}
        addToTeam={addToTeam}
        removeFromTeam={removeFromTeam}
        isInTeam={isInTeam}
        teamCount={teamCount}
      />
    );

    return {
      toggleFavorite,
      handleClick,
      addToTeam,
      removeFromTeam,
      isInTeam,
    };
  };

  it('renders the card with pokemon name', () => {
    setup();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('handles toggling favorite and shows alert', () => {
    setup({ isFavorite: false });
    fireEvent.click(screen.getByText('Toggle Favorite'));

    expect(screen.getByTestId('alert')).toHaveTextContent(
      'bulbasaur added to favorites'
    );
    expect(screen.getByTestId('alert')).toHaveAttribute('data-type', 'error');

    act(() => {
      jest.advanceTimersByTime(1300);
    });

    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });

  it('handles toggling team membership (add)', () => {
    setup({ isInTeamReturn: false });
    fireEvent.click(screen.getByText('Toggle Team'));

    expect(screen.getByTestId('alert')).toHaveTextContent(
      'bulbasaur added to team'
    );
    expect(screen.getByTestId('alert')).toHaveAttribute('data-type', 'success');
  });

  it('handles toggling team membership (remove)', () => {
    setup({ isInTeamReturn: true });
    fireEvent.click(screen.getByText('Toggle Team'));

    expect(screen.getByTestId('alert')).toHaveTextContent(
      'bulbasaur removed from team'
    );
  });

  it('calls image click handler', () => {
    const { handleClick } = setup();
    fireEvent.click(screen.getByText('Image Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
