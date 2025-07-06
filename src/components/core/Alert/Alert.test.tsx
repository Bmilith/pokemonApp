import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

jest.mock('@/assets', () => ({
  Sucess: 'success-icon.svg',
}));

describe('Alert component', () => {
  it('renders success icon and styles when type is success', () => {
    render(<Alert type="success">Success message</Alert>);

    const icon = screen.getByAltText(/success/i);
    expect(icon).toBeInTheDocument();

    expect(screen.getByText('Success message')).toBeInTheDocument();

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();

    expect(alert).toHaveClass('bg-success-100');
    expect(alert).toHaveClass('border-success-200');
  });

  it('renders error icon and styles when type is error', () => {
    render(<Alert type="error">Error message</Alert>);

    const icon = screen.getByAltText(/error/i);
    expect(icon).toBeInTheDocument();

    expect(screen.getByText('Error message')).toBeInTheDocument();

    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();

    expect(alert).toHaveClass('bg-error-100');
    expect(alert).toHaveClass('border-error-200');
  });

  it('renders children correctly', () => {
    render(
      <Alert type="success">
        <p>Test children</p>
      </Alert>
    );
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });

  it('has role alert for accessibility', () => {
    render(<Alert type="success">Alert message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
