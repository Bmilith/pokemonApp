import { MAX_STAT_VALUE } from '@/constants/pokemonsConstants';

interface MetricBarProps {
  label: string;
  value: number;
  maxValue: number;
}

export function MetricBar({ label, value, maxValue }: MetricBarProps) {
  const max = maxValue || MAX_STAT_VALUE;
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="mb-4">
      <div className="text-sm font-semibold capitalize mb-1 text-left dark:text-white">
        {label} ({value})
      </div>
      <div className="relative bg-gray-200 h-6 rounded overflow-hidden">
        <div
          className="bg-blue-500 h-6 flex items-center justify-end pr-2 text-white font-semibold text-xs rounded"
          style={{ width: `${percentage}%` }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
