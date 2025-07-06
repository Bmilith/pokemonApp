import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './Navbar';

const changeLanguageMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: changeLanguageMock,
      language: 'en',
    },
  }),
}));

jest.mock('@/components/core', () => ({
  Button: ({ onClick, icon, className }: any) => (
    <button
      onClick={onClick}
      className={className}
      aria-label="hamburger-button"
    >
      {icon || 'Button'}
    </button>
  ),
  Dropdown: ({ options, selectedValues, onToggle }: any) => (
    <select
      aria-label="language-dropdown"
      value={selectedValues[0]}
      onChange={(e) => onToggle(e.target.value)}
    >
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
  Logo: ({ title }: any) => <div>{title}</div>,
}));

jest.mock('../DarkMode/DarkMode', () => ({
  DarkMode: () => <input type="checkbox" aria-label="dark-mode-toggle" />,
}));

jest.mock('@/components/features', () => ({
  SearchInput: () => <input type="search" aria-label="search-input" />,
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('NavBar integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('toggles mobile menu when hamburger button clicked', () => {
    renderWithRouter(<NavBar />);
    const button = screen.getByLabelText('hamburger-button');

    expect(screen.queryByText(/nav.home/i)).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getAllByText(/nav.home/i).length).toBeGreaterThan(1);
  });

  test('renders dark mode toggle', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByLabelText('dark-mode-toggle')).toBeInTheDocument();
  });

  test('renders search input', () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByLabelText('search-input')).toBeInTheDocument();
  });
});
