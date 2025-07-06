import { render, screen } from '@testing-library/react';
import { StatsList } from './StatsList';

describe('StatsList', () => {
  const mockStats = {
    hp: 45,
    attack: 49,
    defense: 49,
    'special-attack': 65,
    speed: 'fast',
  };

  it('capitalizes stat labels correctly', () => {
    render(<StatsList stats={{ 'special-defense': 80 }} />);
    const label = screen.getByText(/special-defense:/i);
    expect(label).toHaveClass('capitalize');
  });

  it('applies custom className to the root container', () => {
    const { container } = render(
      <StatsList stats={mockStats} className="custom-class" />
    );
    const root = container.firstChild;
    expect(root).toHaveClass('custom-class');
  });

  it('always includes default base classes', () => {
    const { container } = render(<StatsList stats={mockStats} />);
    const root = container.firstChild;
    expect(root).toHaveClass(
      'flex',
      'flex-col',
      'items-start',
      'text-xs',
      'pt-2',
      'border-t',
      'border-neutral-200'
    );
  });

  it('renders correctly with numeric-only stats', () => {
    const { container } = render(<StatsList stats={{ hp: 100, speed: 120 }} />);
    const divs = container.querySelectorAll('div > div');
    expect(divs.length).toBe(3);
  });

  it('renders correctly with long stat names', () => {
    const longKeyStats = { 'super-extra-long-stat-name': 999 };
    render(<StatsList stats={longKeyStats} />);
    expect(
      screen.getByText(/super-extra-long-stat-name:/i)
    ).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('supports numbers and strings as stat values', () => {
    const stats = { speed: 'fast', stamina: 99 };
    render(<StatsList stats={stats} />);
    expect(screen.getByText('fast')).toBeInTheDocument();
    expect(screen.getByText('99')).toBeInTheDocument();
  });
});
