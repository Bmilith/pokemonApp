import { render, screen } from '@testing-library/react';
import { MetricBar } from './MetricBar';
import { MAX_STAT_VALUE } from '@/constants/pokemonConstants';

describe('MetricBar', () => {
  it('renders the label and value correctly', () => {
    render(<MetricBar label="attack" value={80} maxValue={100} />);
    expect(screen.getByText(/attack \(80\)/i)).toBeInTheDocument();
    expect(screen.getAllByText('80')).toHaveLength(1);
  });

  it('calculates and sets correct width percentage', () => {
    const { container } = render(
      <MetricBar label="hp" value={50} maxValue={100} />
    );
    const bar = container.querySelector('div.bg-blue-500') as HTMLDivElement;
    expect(bar).toHaveStyle({ width: '50%' });
  });

  it('caps the bar width at 100% when value > maxValue', () => {
    const { container } = render(
      <MetricBar label="defense" value={150} maxValue={100} />
    );
    const bar = container.querySelector('div.bg-blue-500') as HTMLDivElement;
    expect(bar).toHaveStyle({ width: '100%' });
  });

  it('uses MAX_STAT_VALUE as fallback when maxValue is 0 or undefined', () => {
    const { container } = render(
      <MetricBar label="speed" value={60} maxValue={0} />
    );
    const expectedWidth = (60 / MAX_STAT_VALUE) * 100;
    const bar = container.querySelector('div.bg-blue-500') as HTMLDivElement;
    const widthValue = parseFloat(bar.style.width);

    expect(widthValue).toBeCloseTo(expectedWidth, 1);
  });
});
