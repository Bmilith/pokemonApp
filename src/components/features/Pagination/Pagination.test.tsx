import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { jest } from '@jest/globals';

import { Pagination } from './Pagination';

jest.mock('@/components/core', () => {
  const actual = jest.requireActual<any>('@/components/core');
  return {
    ...actual,
    Button: ({ label, onClick, selected, ...props }: any) => (
      <button
        data-testid={`button-${label}`}
        onClick={onClick}
        aria-current={selected ? 'page' : undefined}
        {...props}
      >
        {label}
      </button>
    ),
  };
});

jest.mock('@/components/features', () => ({
  QueryDropdown: ({ options }: any) => (
    <select data-testid="page-size-dropdown">
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
}));

jest.mock('@/utils/paginate', () => ({
  generatePageList: (
    currentPage: number,
    totalPages: number,
    pageRange: number
  ) => {
    if (totalPages <= pageRange + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, '...', currentPage, '...', totalPages];
  },
}));

describe('Pagination Component', () => {
  it('renders page buttons and highlights current page', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );

    expect(screen.getByTestId('button-1')).toBeInTheDocument();
    expect(screen.getByTestId('button-5')).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByTestId('button-10')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
  });

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByTestId('button-3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when Previous and Next are clicked', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables Previous when on first page and disables Next on last page', () => {
    const onPageChange = jest.fn();

    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={onPageChange} />
    );
    expect(screen.getByText('Previous')).toBeDisabled();

    cleanup();

    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={onPageChange} />
    );
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('renders the page size dropdown with provided options', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
        pageSizeOptions={['5', '10', '15']}
      />
    );

    const dropdown = screen.getByTestId('page-size-dropdown');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent('5');
    expect(dropdown).toHaveTextContent('10');
    expect(dropdown).toHaveTextContent('15');
  });
});
