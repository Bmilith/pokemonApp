import { FaArrowRotateLeft } from 'react-icons/fa6';
import { Button } from '@/components/core';

interface RangeSliderProps {
  label?: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
  onClear?: () => void;
}

export const RangeSlider = ({
  label = 'Range',
  min = 0,
  max = 100,
  value,
  onChange,
  onClear,
}: RangeSliderProps) => {
  const key = label.toLowerCase().replace(/\s+/g, '');

  return (
    <div className="rounded-lg w-full max-w-xl border border-gray-400 p-2 bg-white">
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={`range-${key}`} className="text-gray-400 font-semibold">
          {label} ({min} - {value})
        </label>
        {onClear && (
          <Button
            onClick={onClear}
            variant="secondary"
            className="ml-2 hover:text-gray-300 focus:outline-none hover:text-gray-900"
            aria-label={`Clear ${label} filter`}
            title={`Clear ${label} filter`}
            icon={<FaArrowRotateLeft size={20} color="black" />}
          />
        )}
      </div>
      <input
        type="range"
        id={`range-${key}`}
        className="w-full accent-red-500"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
