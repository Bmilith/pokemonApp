import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the title text correctly', () => {
    const testTitle = 'My Logo';
    render(<Logo title={testTitle} />);
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(testTitle);
  });

  it('has the correct CSS classes', () => {
    const testTitle = 'Test';
    render(<Logo title={testTitle} />);
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toHaveClass(
      'text-red-500',
      'font-semibold',
      'tracking-widest',
      'text-2xl',
      'uppercase',
      'sm:text-3xl'
    );
  });
});
