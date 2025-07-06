import { getStatComparison } from './helper';

interface CompareStatProps {
  label: string;
  valueA: number;
  valueB: number;
  maxValue: number;
  nameA: string;
  nameB: string;
}

export const CompareStat = ({
  label,
  valueA,
  valueB,
  maxValue,
  nameA,
  nameB,
}: CompareStatProps) => {
  const { percentA, percentB, betterA, betterB } = getStatComparison(
    valueA,
    valueB,
    maxValue
  );

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex flex-col items-end w-1/3">
        <span
          className={`font-semibold ${
            betterA ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          {nameA}: {valueA}
        </span>
        <div className="w-full bg-red-200 rounded-full h-4">
          <div
            className="bg-red-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentA}%` }}
          />
        </div>
      </div>
      <div className="w-1/3 text-center font-bold text-gray-700">{label}</div>
      <div className="flex flex-col items-start w-1/3">
        <span
          className={`font-semibold ${
            betterB ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          {nameB}: {valueB}
        </span>
        <div className="w-full bg-green-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percentB}%` }}
          />
        </div>
      </div>
    </div>
  );
};
