import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';

const mockFavorites = [
  { name: 'Pikachu', image: '/pikachu.png' },
  { name: 'Charmander', image: '/charmander.png' },
];

describe('Sidebar', () => {
  it('renders favorite Pokémon with buttons', () => {
    render(
      <Sidebar
        favorites={mockFavorites}
        team={[]}
        onAddToTeam={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getAllByText(/Add to team/i)).toHaveLength(2);
    expect(screen.getAllByText(/Remove/i)).toHaveLength(2);
  });

  it('disables "Add to team" if already in team or team is full', () => {
    render(
      <Sidebar
        favorites={mockFavorites}
        team={['Pikachu']}
        onAddToTeam={jest.fn()}
        onToggleFavorite={jest.fn()}
      />
    );

    const pikachuButton = screen.getAllByText(/Add to team/i)[0];
    expect(pikachuButton).toBeDisabled();

    const charmanderButton = screen.getAllByText(/Add to team/i)[1];
    expect(charmanderButton).toBeEnabled();
  });

  it('calls callbacks when buttons are clicked', () => {
    const handleAdd = jest.fn();
    const handleToggle = jest.fn();

    render(
      <Sidebar
        favorites={mockFavorites}
        team={[]}
        onAddToTeam={handleAdd}
        onToggleFavorite={handleToggle}
      />
    );

    fireEvent.click(screen.getAllByText(/Add to team/i)[0]);
    expect(handleAdd).toHaveBeenCalledWith('Pikachu');

    fireEvent.click(screen.getAllByText(/Remove/i)[0]);
    expect(handleToggle).toHaveBeenCalledWith('Pikachu');
  });
});
