import React from 'react';
import { render, screen } from '@testing-library/react';
import { Summary } from './Summary';

describe('Summary component', () => {
  const items = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Age', value: 30 },
    { label: 'Status', value: <span data-testid="status">Active</span> },
  ];

  it('renders title and items correctly', () => {
    render(<Summary title="User Info" items={items} />);

    expect(screen.getByText('User Info')).toBeInTheDocument();
    items.forEach(({ label, value }) => {
      expect(
        screen.getByText(new RegExp(`${label}:`, 'i'))
      ).toBeInTheDocument();

      if (typeof value === 'string' || typeof value === 'number') {
        expect(screen.getByText(value.toString())).toBeInTheDocument();
      }
    });

    expect(screen.getByTestId('status')).toHaveTextContent('Active');
  });

  it('renders with optional className', () => {
    const { container } = render(
      <Summary title="Title" items={items} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
