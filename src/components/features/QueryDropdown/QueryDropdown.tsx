import { Dropdown } from '@/components/core';
import { useQueryParams } from '@/hooks/useQueryParams';

interface Props {
  label?: string;
  options: string[];
  queryKey?: string;
  multiSelect?: boolean;
  onChange?: (value: string) => void;
}

export const QueryDropdown = ({
  label,
  options,
  queryKey,
  multiSelect = true,
  onChange,
}: Props) => {
  const [params, updateParams] = useQueryParams();
  const key = queryKey || label?.toLowerCase().replace(/\s+/g, '') || '';
  const selectedValues = (params[key] || '').split(',').filter(Boolean);

  const handleToggle = (value: string) => {
    let newValues: string[];

    if (multiSelect) {
      if (selectedValues.includes(value)) {
        newValues = selectedValues.filter((v) => v !== value);
      } else {
        newValues = [...selectedValues, value];
      }

      updateParams({
        [key]: newValues.length > 0 ? newValues.join(',') : undefined,
        page: '1',
      });

      if (onChange) {
        onChange(newValues.join(','));
      }
    } else {
      const newValue = selectedValues.includes(value) ? undefined : value;

      updateParams({
        [key]: newValue,
        page: '1',
      });

      if (onChange && newValue) {
        onChange(newValue);
      }
    }
  };

  return (
    <Dropdown
      label={label}
      options={options}
      selectedValues={selectedValues}
      onToggle={handleToggle}
      multiSelect={multiSelect}
    />
  );
};
