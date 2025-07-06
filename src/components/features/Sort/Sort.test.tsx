import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonSortSelector } from './Sort';

const mockUpdateParams = jest.fn();

jest.mock('@/hooks', () => ({
  useQueryParams: () => [{ sort: '' }, mockUpdateParams],
}));

describe('PokemonSortSelector integration', () => {
  const options = [
    { label: 'Name', value: 'name' },
    { label: 'Type', value: 'type' },
  ];

  beforeEach(() => {
    mockUpdateParams.mockClear();
  });

  it('renders correctly with default label and options', () => {
    render(<PokemonSortSelector options={options} />);
    expect(screen.getByText('Sort:')).toBeInTheDocument();

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'None' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Type' })).toBeInTheDocument();
  });

  it('renders correctly with custom label', () => {
    render(<PokemonSortSelector options={options} label="Order By" />);
    expect(screen.getByText('Order By:')).toBeInTheDocument();
  });

  it('calls updateParams with correct sort when an option is selected', () => {
    render(<PokemonSortSelector options={options} />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'name' } });

    expect(mockUpdateParams).toHaveBeenCalledWith({ sort: 'name' });
  });

  it('calls updateParams with undefined sort when None option is selected', () => {
    render(<PokemonSortSelector options={options} />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '' } });

    expect(mockUpdateParams).toHaveBeenCalledWith({ sort: undefined });
  });

  it('calls updateParams with reset parameters when reset button is clicked', () => {
    render(<PokemonSortSelector options={options} />);

    const resetButton = screen.getByRole('button', { name: /reset filters/i });
    fireEvent.click(resetButton);

    expect(mockUpdateParams).toHaveBeenCalledWith(
      { page: '1', pageSize: '20' },
      { replaceAll: true }
    );
  });

  it('select shows the current sort param value', () => {
    jest.resetModules();
    const customMockUpdateParams = jest.fn();
    jest.doMock('@/hooks', () => ({
      useQueryParams: () => [{ sort: 'type' }, customMockUpdateParams],
    }));

    const { PokemonSortSelector: SelectorWithSort } = require('./Sort');

    render(<SelectorWithSort options={options} />);
    const select = screen.getByRole('combobox');
    expect((select as HTMLSelectElement).value).toBe('type');
  });
});
