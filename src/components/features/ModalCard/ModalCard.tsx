import { getGenerationColor } from './helper';
import { Button, Chip, Heading, MetricBar } from '@/components/core';
import { MAX_STAT_VALUE } from '@/constants/pokemonConstants';
import type { Pokemon } from '@/types/pokemons';
import { exportToJSON } from '@/utils/dataExport';

interface PokemonDetailCardProps {
  pokemon: Pokemon;
  compareSelected: boolean;
  onCompareToggle: () => void;
}

export const ModalCard = ({
  pokemon,
  compareSelected,
  onCompareToggle,
}: PokemonDetailCardProps) => {
  const { name, image, types, stats, generationKeys, abilities } = pokemon;

  return (
    <>
      <div className="mb-6 flex flex-wrap ">
        {generationKeys.map((gen) => (
          <Chip key={gen} label={gen} className={getGenerationColor(gen)} />
        ))}
      </div>
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-10  bg-gradient-to-br dark:from-gray-900 dark:via-red-900 dark:to-black">
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
            <h2 className="text-xl sm:text-3xl font-bold capitalize dark:text-white">
              {name}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Button
              onClick={() => onCompareToggle()}
              label={compareSelected ? 'Comparing' : 'Compare'}
              variant="primary"
            />
            <Button
              onClick={() => exportToJSON(pokemon)}
              label="Export"
              variant="primary"
            />
          </div>
          <div className="mb-2 text-left ">
            <Heading subTitle="Types" />
            <div className="flex gap-3 flex-wrap">
              {types.map((type, index) => (
                <Chip
                  key={index}
                  label={type}
                  className="bg-yellow-300 text-black"
                />
              ))}
            </div>
          </div>
          <div className="mb-2 text-left">
            <Heading subTitle="Abilities" />
            <div className="flex gap-3 flex-wrap">
              {abilities.map((ability, index) => (
                <Chip
                  key={index}
                  label={ability}
                  className="bg-green-300 text-black"
                />
              ))}
            </div>
          </div>
          <div className="text-left">
            <Heading title="Stats" size="sm" />
            {Object.entries(stats).map(([statName, statValue]) => (
              <div key={statName}>
                <MetricBar
                  label={statName}
                  value={statValue}
                  maxValue={MAX_STAT_VALUE}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full sm:w-64 flex-shrink-0 flex items-center justify-center mb-6 sm:mb-0">
          <img
            src={image}
            alt={name}
            className="object-contain rounded-lg max-h-96"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};
