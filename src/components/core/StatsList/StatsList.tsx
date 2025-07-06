type Stats = Record<string, string | number>;

type StatsListProps = {
  stats: Stats;
  className?: string;
};

export const StatsList = ({ stats, className }: StatsListProps) => {
  return (
    <div
      className={`flex flex-col items-start text-xs pt-2 border-t border-neutral-200 ${
        className ?? ''
      }`}
    >
      {Object.entries(stats).map(([statName, statValue]) => (
        <div key={statName} className="pt-2 flex items-center w-full">
          <span className="text-neutral-600 capitalize pr-2">{statName}:</span>
          <span className="ml-1 bg-neutral-200 px-3 py-0.5 rounded-full">
            {statValue}
          </span>
        </div>
      ))}
    </div>
  );
};
