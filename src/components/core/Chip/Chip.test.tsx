import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip component', () => {
  it('renders the label text', () => {
    render(<Chip label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Chip label="Default Class" />);
    const chip = screen.getByText('Default Class');
    expect(chip).toHaveClass('inline-block');
    expect(chip).toHaveClass('rounded-full');
    expect(chip).toHaveClass('font-semibold');
  });

  it('applies additional className when provided', () => {
    render(<Chip label="Extra Class" className="bg-red-500" />);
    const chip = screen.getByText('Extra Class');
    expect(chip).toHaveClass('bg-red-500');
  });

  it('capitalizes the label', () => {
    render(<Chip label="lowercase label" />);
    const chip = screen.getByText('lowercase label');
    expect(chip).toHaveClass('capitalize');
  });
});
