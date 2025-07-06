import { MetricBar } from '@/components/core';
import type { Pokemon } from '@/types/pokemons';

interface CompareCardProps {
  pokemon: Pokemon;
}

export const CompareCard = ({
  pokemon: { name, image, stats, abilities },
}: CompareCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center space-y-4">
    <h2 className="text-2xl font-bold capitalize dark:text-black">{name}</h2>
    <img src={image} alt={name} className="w-32 h-32 object-contain" />
    <div className="w-full mt-4 space-y-3">
      <MetricBar label="HP" value={stats.hp} maxValue={255} />
      <MetricBar label="Attack" value={stats.attack} maxValue={252} />
      <MetricBar label="Defense" value={stats.defense} maxValue={230} />
      <MetricBar label="Speed" value={stats.speed} maxValue={200} />
    </div>
    <div className="w-full mt-4">
      <h3 className="font-semibold mb-2">Abilities:</h3>
      <ul className="list-disc list-inside text-left text-black font-semibold">
        {abilities?.length ? (
          abilities.map((ability, idx) => (
            <li key={idx} className="capitalize">
              {ability}
            </li>
          ))
        ) : (
          <li>No abilities found</li>
        )}
      </ul>
    </div>
  </div>
);
