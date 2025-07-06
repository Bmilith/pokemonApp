import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, type ButtonProps } from './Button';

jest.mock('../index', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe('Button component', () => {
  const defaultProps: ButtonProps = {
    variant: 'primary',
    label: 'Click me',
    onClick: jest.fn(),
  };

  it('renders label and calls onClick when clicked', () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled and loading states', () => {
    const { rerender } = render(<Button {...defaultProps} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();

    rerender(<Button {...defaultProps} isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders icon on left by default', () => {
    render(<Button {...defaultProps} icon={<span data-testid="icon" />} />);
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toContainElement(icon);
    expect(button).toHaveTextContent(defaultProps.label ?? '');
  });

  it('renders icon on right when iconPosition="right"', () => {
    render(
      <Button
        {...defaultProps}
        icon={<span data-testid="icon" />}
        iconPosition="right"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const spans = button.querySelectorAll('span');
    expect(spans[spans.length - 1]).toContainElement(
      screen.getByTestId('icon')
    );
  });

  it('applies selected styles correctly', () => {
    render(<Button {...defaultProps} selected={true} />);
    const button = screen.getByRole('button');

    expect(button.style.color).toBe('white');
    expect(button.style.backgroundColor).toBe('green');
    expect(button.style.borderColor).toBe('green');
  });

  it('applies width style when provided', () => {
    render(<Button {...defaultProps} width={200} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ width: '200px' });
  });
});
