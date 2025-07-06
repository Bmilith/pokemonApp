import { render, screen, within } from '@testing-library/react';
import { FilterPanel } from './FilterPanel';
import { MemoryRouter } from 'react-router-dom';

test('renders all expected filters', () => {
  render(
    <MemoryRouter>
      <FilterPanel />
    </MemoryRouter>
  );
  const abilitiesElements = screen.getAllByText(/Abilities/i);
  expect(abilitiesElements.length).toBeGreaterThan(0);

  const typesLabel = screen.getByText(
    (content, element) =>
      element?.tagName.toLowerCase() === 'label' && /Types/i.test(content)
  );
  const typesContainer = typesLabel.closest('div');
  if (!typesContainer) throw new Error('Types container div not found');
  const typesButton = within(typesContainer).getByRole('button');
  expect(typesButton).toHaveTextContent(/\s*-- Select Types --\s*/);

  const generationsLabel = screen.getByText(
    (content, element) =>
      element?.tagName.toLowerCase() === 'label' && /Generations/i.test(content)
  );
  const generationsContainer = generationsLabel.closest('div');
  if (!generationsContainer)
    throw new Error('Generations container div not found');
  const generationsButton = within(generationsContainer).getByRole('button');
  expect(generationsButton).toHaveTextContent(/\s*-- Select Generations --\s*/);

  const resetButton = screen.getByRole('button', { name: /Reset filters/i });
  expect(resetButton).toBeInTheDocument();

  expect(screen.getByLabelText(/Attack/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Defense/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Speed/i)).toBeInTheDocument();

  expect(screen.getByRole('combobox')).toBeInTheDocument();
});
