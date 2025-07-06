import { render, screen, fireEvent } from '@testing-library/react';
import { ModalCard } from './ModalCard';
import type { Pokemon } from '@/types/pokemons';

jest.mock('@/utils/dataExport', () => ({
  exportToJSON: jest.fn(),
}));

jest.mock('@/constants/pokemonConstants', () => ({
  MAX_STAT_VALUE: 200,
}));

jest.mock('./helper', () => ({
  getGenerationColor: (gen: string) => `bg-gen-${gen}`,
}));

const mockPokemon: Pokemon = {
  name: 'pikachu',
  image: 'https://example.com/pikachu.png',
  types: ['electric'],
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
  },
  generationKeys: ['Gen I'],
  abilities: ['static', 'lightning-rod'],
};

describe('ModalCard Integration Test', () => {
  it('renders all major elements correctly', () => {
    render(
      <ModalCard
        pokemon={mockPokemon}
        compareSelected={false}
        onCompareToggle={jest.fn()}
      />
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /compare/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /export/i })).toBeInTheDocument();

    expect(screen.getByText(/electric/i)).toBeInTheDocument();

    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();

    expect(screen.getByText(/hp/i)).toBeInTheDocument();
    expect(screen.getByText(/attack/i)).toBeInTheDocument();
    expect(screen.getByText(/defense/i)).toBeInTheDocument();
    expect(screen.getByText(/Gen I/)).toBeInTheDocument();
  });

  it('calls onCompareToggle when Compare button is clicked', () => {
    const mockToggle = jest.fn();

    render(
      <ModalCard
        pokemon={mockPokemon}
        compareSelected={false}
        onCompareToggle={mockToggle}
      />
    );

    const compareButton = screen.getByRole('button', { name: /compare/i });
    fireEvent.click(compareButton);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('calls exportToJSON when Export button is clicked', () => {
    const { exportToJSON } = require('@/utils/dataExport');

    render(
      <ModalCard
        pokemon={mockPokemon}
        compareSelected={false}
        onCompareToggle={jest.fn()}
      />
    );

    const exportButton = screen.getByRole('button', { name: /export/i });
    fireEvent.click(exportButton);

    expect(exportToJSON).toHaveBeenCalledWith(mockPokemon);
  });

  it('shows "Comparing" label when compareSelected is true', () => {
    render(
      <ModalCard
        pokemon={mockPokemon}
        compareSelected={true}
        onCompareToggle={jest.fn()}
      />
    );

    expect(
      screen.getByRole('button', { name: /comparing/i })
    ).toBeInTheDocument();
  });
});
