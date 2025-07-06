import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const mockPokemons = ['Pikachu', 'Bulbasaur', 'Charmander'];

describe('Dropdown', () => {
  it('renders the label and placeholder', () => {
    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={[]}
        onToggle={() => {}}
      />
    );
    expect(screen.getByText('Pokemons')).toBeInTheDocument();
    expect(screen.getByText('-- Select Pokemons --')).toBeInTheDocument();
  });

  it('toggles dropdown open and close when button clicked', () => {
    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={[]}
        onToggle={() => {}}
      />
    );
    const button = screen.getByRole('button');
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });

  it('shows selected values as badges', () => {
    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={['Bulbasaur', 'Charmander']}
        onToggle={() => {}}
        multiSelect
      />
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('calls onToggle with correct value on option click (single select)', () => {
    const onToggle = jest.fn();
    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={[]}
        onToggle={onToggle}
        multiSelect={false}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(onToggle).toHaveBeenCalledWith('bulbasaur');
  });

  it('closes dropdown on single select option click', () => {
    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={[]}
        onToggle={() => {}}
        multiSelect={false}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Pikachu'));
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
  });

  it('does not close dropdown on multi select option click', () => {
    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={[]}
        onToggle={() => {}}
        multiSelect={true}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Pikachu'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('allows selecting only one item in single select mode', () => {
    const onToggle = jest.fn();

    render(
      <Dropdown
        label="Pokemons"
        options={mockPokemons}
        selectedValues={[]}
        onToggle={onToggle}
        multiSelect={false}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Pikachu'));
    expect(onToggle).toHaveBeenCalledWith('pikachu');

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(onToggle).toHaveBeenCalledWith('bulbasaur');

    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
  });
});
