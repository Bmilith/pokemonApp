import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';

import { RangeSlider } from './RangeSlider';

describe('RangeSlider', () => {
  it('renders with default props', () => {
    render(<RangeSlider value={50} onChange={() => {}} />);
    expect(screen.getByLabelText(/range/i)).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveValue('50');
  });

  it('displays the correct label and value', () => {
    render(
      <RangeSlider
        label="Volume"
        min={10}
        max={90}
        value={30}
        onChange={() => {}}
      />
    );
    expect(screen.getByText(/Volume \(10 - 30\)/)).toBeInTheDocument();
  });

  it('calls onChange when slider value changes', () => {
    const handleChange = jest.fn();
    render(<RangeSlider value={30} onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '40' } });
    expect(handleChange).toHaveBeenCalledWith(40);
  });

  it('does not render clear button when onClear is not provided', () => {
    render(<RangeSlider value={20} onChange={() => {}} />);
    expect(
      screen.queryByLabelText(/Clear Range filter/i)
    ).not.toBeInTheDocument();
  });
});
