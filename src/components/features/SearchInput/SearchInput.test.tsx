import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

const mockSetQueryParams = jest.fn();

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: any) => value,
}));

jest.mock('@/hooks/useQueryParams', () => ({
  useQueryParams: () => [{}, mockSetQueryParams],
}));

const mockUseSearchParams = jest.fn();
const mockUseLocation = jest.fn();

jest.mock('react-router-dom', () => ({
  useSearchParams: () => mockUseSearchParams(),
  useLocation: () => mockUseLocation(),
}));

beforeEach(() => {
  jest.clearAllMocks();

  mockUseSearchParams.mockReturnValue([
    {
      get: (key: string) => {
        if (key === 'search') return 'initial search';
        return null;
      },
    },
  ]);
  mockUseLocation.mockReturnValue({
    pathname: '/home',
  });
});

describe('SearchInput component', () => {
  it('renders with initial search from URL params', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    expect(input.value).toBe('initial search');
  });

  it('updates internal state when typing', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'pikachu' } });
    expect(input.value).toBe('pikachu');
  });

  it('calls setQueryParams with updated search and page=1 when pathname is /home', () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'charizard' } });

    expect(mockSetQueryParams).toHaveBeenCalledWith({
      search: 'charizard',
      page: '1',
      pageSize: expect.any(String),
    });
  });

  it('does not call setQueryParams if pathname is not /home', () => {
    mockUseLocation.mockReturnValue({ pathname: '/about' });

    render(<SearchInput />);
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    expect(mockSetQueryParams).not.toHaveBeenCalled();
  });
});
