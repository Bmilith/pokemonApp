import { render, screen } from '@testing-library/react';
import { CompareCard } from './CompareCard';
import { Pokemon } from '@/types/pokemons';

const mockPokemon: Pokemon = {
  name: 'pikachu',
  image: 'https://pokeapi.co/media/sprites/pokemon/25.png',
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
  },
  abilities: ['static', 'lightning-rod'],
  types: [],
  generationKeys: [],
};

describe('CompareCard', () => {
  it('renders pokemon name, image, stats, and abilities', () => {
    render(<CompareCard pokemon={mockPokemon} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'pikachu'
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'pikachu');
    expect(image).toHaveAttribute('src', mockPokemon.image);

    expect(screen.getByText(/HP \(35\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Attack \(55\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Defense \(40\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Speed \(90\)/i)).toBeInTheDocument();

    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning-rod')).toBeInTheDocument();
  });

  it('renders fallback when no abilities are present', () => {
    const noAbilitiesPokemon = { ...mockPokemon, abilities: [] };
    render(<CompareCard pokemon={noAbilitiesPokemon} />);

    expect(screen.getByText('No abilities found')).toBeInTheDocument();
  });
});
