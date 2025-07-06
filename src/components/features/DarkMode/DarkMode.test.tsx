import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@/assets', () => ({
  NightMode: 'night-mode.png',
  LightMode: 'light-mode.png',
}));

import { DarkMode } from './DarkMode';

describe('DarkMode component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  test('renders with default light theme', () => {
    render(<DarkMode />);
    const lightIcon = screen.getByAltText(/switch to light mode/i);
    const darkIcon = screen.getByAltText(/switch to dark mode/i);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(darkIcon.classList.contains('opacity-100')).toBe(true);
    expect(lightIcon.classList.contains('opacity-0')).toBe(true);
  });

  test('initializes with dark theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(<DarkMode />);
    const lightIcon = screen.getByAltText(/switch to light mode/i);
    const darkIcon = screen.getByAltText(/switch to dark mode/i);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(lightIcon.classList.contains('opacity-100')).toBe(true);
    expect(darkIcon.classList.contains('opacity-0')).toBe(true);
  });

  test('toggles theme when clicking icons', () => {
    render(<DarkMode />);
    const darkIcon = screen.getByAltText(/switch to dark mode/i);
    const lightIcon = screen.getByAltText(/switch to light mode/i);

    fireEvent.click(darkIcon);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(darkIcon.classList.contains('opacity-0')).toBe(true);
    expect(lightIcon.classList.contains('opacity-100')).toBe(true);

    fireEvent.click(lightIcon);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
    expect(lightIcon.classList.contains('opacity-0')).toBe(true);
    expect(darkIcon.classList.contains('opacity-100')).toBe(true);
  });
});
