import { useState, useEffect, useCallback, useMemo } from 'react';
import { RangeSlider } from '@/components/core/RangeSlider/RangeSlider';
import { DEFAULT_RANGE_LIMIT } from '@/constants/baseConstants';
import { useQueryParams } from '@/hooks/useQueryParams';

interface RangeInputProps {
  label?: string;
  min?: number;
  max?: number;
}

export const RangeSelector = ({
  label = 'Range',
  min = 0,
  max = DEFAULT_RANGE_LIMIT,
}: RangeInputProps) => {
  const [params, updateParams] = useQueryParams();
  const key = label.toLowerCase().replace(/\s+/g, '');

  const paramValue = useMemo(() => Number(params[key]), [params, key]);
  const [value, setValue] = useState(() =>
    isNaN(paramValue) ? max : paramValue
  );

  useEffect(() => {
    if (isNaN(paramValue)) {
      if (value !== max) setValue(max);
    } else if (paramValue !== value) {
      setValue(paramValue);
    }
  }, [paramValue]);

  const handleChange = useCallback(
    (newValue: number) => {
      setValue(newValue);
      updateParams({
        [key]: newValue === min ? undefined : newValue.toString(),
        page: '1',
      });
    },
    [key, min, updateParams]
  );

  const handleClear = useCallback(() => {
    setValue(max);
    updateParams({ [key]: undefined });
  }, [key, max, updateParams]);

  return (
    <RangeSlider
      label={label}
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
      onClear={handleClear}
    />
  );
};
