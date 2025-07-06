import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHandshake, FaTrophy } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import { useParams, useNavigate } from 'react-router-dom';
import { Dropdown } from '@/components/core';
import { CompareCard } from '@/components/features';
import { usePokemonContext } from '@/context/PokemonContext';
import { findPokemonsByNames, getTotalStats } from '@/utils/pokemon';

export const ComparePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pokemonOne = '', pokemonTwo = '' } = useParams();
  const { pokemons } = usePokemonContext();

  const [selectedNames, setSelectedNames] = useState({
    left: pokemonOne,
    right: pokemonTwo,
  });

  useEffect(() => {
    if (selectedNames.left && selectedNames.right) {
      if (
        selectedNames.left !== pokemonOne ||
        selectedNames.right !== pokemonTwo
      ) {
        navigate(`/compare/${selectedNames.left}/with/${selectedNames.right}`, {
          replace: true,
        });
      }
    }
  }, [selectedNames, pokemonOne, pokemonTwo, navigate]);

  const [leftPokemon, rightPokemon] = findPokemonsByNames(
    pokemons,
    selectedNames.left,
    selectedNames.right
  );

  const leftTotal = useMemo(() => getTotalStats(leftPokemon), [leftPokemon]);
  const rightTotal = useMemo(() => getTotalStats(rightPokemon), [rightPokemon]);

  const renderBattleResult = () => {
    if (leftTotal === rightTotal) {
      return (
        <>
          <FaHandshake className="text-yellow-500" />
          {t('compare.tie')}
        </>
      );
    }
    const winner = leftTotal > rightTotal ? leftPokemon : rightPokemon;
    return (
      <>
        <FaTrophy className="text-yellow-500" />
        <span className="capitalize">{winner?.name}</span>{' '}
        {t('compare.stronger')}
      </>
    );
  };

  return (
    <div className="mx-auto p-6 w-full bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 dark:from-gray-900 dark:via-red-900 dark:to-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        {t('compare.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Dropdown
          label={t('compare.pokemon1')}
          options={pokemons.map((p) => p.name)}
          selectedValues={[selectedNames.left]}
          onToggle={(value) =>
            setSelectedNames((prev) => ({
              ...prev,
              left: value,
            }))
          }
          multiSelect={false}
        />
        <Dropdown
          label={t('compare.pokemon2')}
          options={pokemons.map((p) => p.name)}
          selectedValues={[selectedNames.right]}
          onToggle={(value) =>
            setSelectedNames((prev) => ({
              ...prev,
              right: value,
            }))
          }
          multiSelect={false}
        />
      </div>

      {leftPokemon && rightPokemon && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CompareCard pokemon={leftPokemon} />
            <CompareCard pokemon={rightPokemon} />
          </div>
          <div className="mt-6 p-4 sm:p-6 bg-red-50 dark:bg-gray-800 rounded-lg text-center shadow-md">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-black dark:text-red-400">
              <GiCrossedSwords className="text-lg sm:text-2xl" />
              <span>{t('compare.battleResult')}</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              <div className="flex items-center justify-center gap-1 text-red-600 break-words text-center capitalize">
                {leftPokemon.name}: {leftTotal} {t('compare.points')}
              </div>
              <div className="flex items-center justify-center gap-1 text-green-600 break-words text-center capitalize">
                {rightPokemon.name}: {rightTotal} {t('compare.points')}
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-100 text-base sm:text-lg font-semibold flex items-center justify-center gap-2 text-center">
              {renderBattleResult()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
