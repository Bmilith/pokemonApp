import { render } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has default classes for medium size and default appearance', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass('w-8 h-8 border-4');
    expect(container.firstChild).toHaveClass(
      'border-gray-300 border-t-blue-500'
    );
    expect(container.firstChild).toHaveClass('rounded-full animate-spin');
  });

  it('applies small size classes', () => {
    const { container } = render(<Spinner size="small" />);
    expect(container.firstChild).toHaveClass('w-4 h-4 border-2');
  });

  it('applies large size classes', () => {
    const { container } = render(<Spinner size="large" />);
    expect(container.firstChild).toHaveClass('w-16 h-16 border-8');
  });

  it('applies invert appearance classes', () => {
    const { container } = render(<Spinner appearance="invert" />);
    expect(container.firstChild).toHaveClass('border-gray-700 border-t-white');
  });
});
