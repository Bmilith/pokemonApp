import { render, screen } from '@testing-library/react';
import { CompareStat } from './CompareStat';

describe('CompareStat', () => {
  it('renders labels, colors, and progress bars correctly when valueA is better', () => {
    const props = {
      label: 'Speed',
      valueA: 150,
      valueB: 100,
      maxValue: 200,
      nameA: 'Pikachu',
      nameB: 'Bulbasaur',
    };

    render(<CompareStat {...props} />);

    const leftLabel = screen.getByText('Pikachu: 150');
    const rightLabel = screen.getByText('Bulbasaur: 100');
    const centerLabel = screen.getByText('Speed');

    expect(leftLabel).toBeInTheDocument();
    expect(rightLabel).toBeInTheDocument();
    expect(centerLabel).toBeInTheDocument();

    expect(leftLabel).toHaveClass('text-red-600');
    expect(rightLabel).toHaveClass('text-gray-600');

    const leftProgressBar =
      leftLabel.parentElement?.querySelector('div[style]');
    const rightProgressBar =
      rightLabel.parentElement?.querySelector('div[style]');

    expect(leftProgressBar).toBeInTheDocument();
    expect(rightProgressBar).toBeInTheDocument();

    expect(leftProgressBar).toHaveStyle({ width: '75%' });
    expect(rightProgressBar).toHaveStyle({ width: '50%' });
  });

  it('renders gray colors when values tie (no betterA or betterB)', () => {
    const props = {
      label: 'Attack',
      valueA: 100,
      valueB: 100,
      maxValue: 200,
      nameA: 'Charmander',
      nameB: 'Squirtle',
    };

    render(<CompareStat {...props} />);

    const leftLabel = screen.getByText('Charmander: 100');
    const rightLabel = screen.getByText('Squirtle: 100');

    expect(leftLabel).toHaveClass('text-gray-600');
    expect(rightLabel).toHaveClass('text-gray-600');
  });
});
