import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders the title with default size and color', () => {
    const title = 'Main Title';
    render(<Heading title={title} />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(title);
    expect(heading).toHaveClass('font-bold', 'text-3xl', 'text-black');
  });

  it('renders the subtitle if provided', () => {
    const title = 'Main Title';
    const subTitle = 'Subheading text';
    render(<Heading title={title} subTitle={subTitle} />);
    const sub = screen.getByText(subTitle);

    expect(sub).toBeInTheDocument();
    expect(sub.tagName).toBe('P');
    expect(sub).toHaveClass('text-lg', 'text-gray-500', 'font-semibold');
  });

  it('applies small size classes when size="sm"', () => {
    render(<Heading title="Small Title" size="sm" />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveClass('text-2xl');
  });

  it('applies secondary color classes when color="secondary"', () => {
    render(<Heading title="Colored Title" color="secondary" />);
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveClass('text-white');
  });
});
