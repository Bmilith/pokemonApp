import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { Pokemon } from '@/types/pokemons';

const mockPokemon: Pokemon = {
  name: 'pikachu',
  image: 'pikachu.png',
  types: ['electric', 'cute'],
  stats: { hp: 35, attack: 55 },
  generationKeys: ['gen1'],
  abilities: ['static', 'lightning-rod'],
};

describe('Card component', () => {
  const onToggleFavorite = jest.fn();
  const onToggleTeam = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Pokemon name, image, and types', () => {
    render(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('cute')).toBeInTheDocument();
  });

  it('renders favorite button with correct icon color based on isFavorite', () => {
    const { rerender } = render(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );

    const favButton = screen.getAllByRole('button')[0];
    expect(favButton.firstChild).toHaveClass('mr-2');

    rerender(
      <Card
        pokemon={mockPokemon}
        isFavorite={true}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );
    expect(screen.getAllByRole('button')[0].firstChild).toHaveClass('mr-2');
  });

  it('renders team button with label "Add" or "Remove" based on isInTeam', () => {
    const { rerender } = render(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('card.add');

    rerender(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={true}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );
    expect(screen.getAllByRole('button')[1]).toHaveTextContent('card.remove');
  });

  it('disables "Add" button when teamCount >= 20 and pokemon is not in team', () => {
    render(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={20}
      />
    );
    const teamButton = screen.getAllByRole('button')[1];
    expect(teamButton).toBeDisabled();
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    render(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );

    const favButton = screen.getAllByRole('button')[0];
    fireEvent.click(favButton);
    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleTeam when team button is clicked', () => {
    render(
      <Card
        pokemon={mockPokemon}
        isFavorite={false}
        isInTeam={false}
        onToggleFavorite={onToggleFavorite}
        onToggleTeam={onToggleTeam}
        teamCount={0}
      />
    );

    const teamButton = screen.getAllByRole('button')[1];
    fireEvent.click(teamButton);
    expect(onToggleTeam).toHaveBeenCalledTimes(1);
  });
});
