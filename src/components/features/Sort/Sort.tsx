import { Button } from '@/components/core';
import { useQueryParams } from '@/hooks';

type Option = {
  label: string;
  value: string;
};

type PokemonSortSelectorProps = {
  label?: string;
  options: Option[];
};

export function PokemonSortSelector({
  label = 'Sort',
  options,
}: PokemonSortSelectorProps) {
  const [params, updateParams] = useQueryParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateParams({ sort: value || undefined });
  };

  const selected = params.sort || '';

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
        <label className="text-sm font-medium text-gray-700">{label}:</label>
        <select
          value={selected}
          onChange={handleChange}
          className="px-2 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-300 w-full sm:w-auto"
        >
          <option value="">None</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-auto">
        <Button
          onClick={() =>
            updateParams({ page: '1', pageSize: '20' }, { replaceAll: true })
          }
          variant={'primary'}
          label="Reset filters"
          className="w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
