import { useTranslation } from 'react-i18next';
import { FaHeart, FaUserMinus, FaUserPlus } from 'react-icons/fa6';
import { Button, StatsList } from '@/components/core';
import type { Pokemon } from '@/types/pokemons';

interface CardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  isInTeam: boolean;
  onImageClick?: () => void;
  onToggleFavorite: () => void;
  onToggleTeam: () => void;
  teamCount: number;
}

export const Card = ({
  pokemon,
  isFavorite,
  isInTeam,
  onImageClick,
  onToggleFavorite,
  onToggleTeam,
  teamCount,
}: CardProps) => {
  const { t } = useTranslation();
  const { name, image, types, stats } = pokemon;

  return (
    <div className="card-container animate-float cursor-grab hover:translate-y-3 duration-300">
      <div className="card w-72 sm:w-80 rounded-xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 p-3 rounded-xl">
          <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <h2
              className="text-xl text-left font-bold text-white capitalize tracking-widest truncate max-w-full sm:max-w-[60%]"
              title={name}
            >
              {name}
            </h2>
            <div className="flex items-center gap-4 mt-2 sm:mt-0 relative">
              <Button
                icon={<FaHeart size={25} />}
                iconClassName={isFavorite ? 'text-red-600' : 'text-green-600'}
                onClick={onToggleFavorite}
                variant="secondary"
                width={10}
              />
              <Button
                disabled={!isInTeam && teamCount >= 20}
                onClick={onToggleTeam}
                label={isInTeam ? t('card.remove') : t('card.add')}
                variant="primary"
                icon={isInTeam ? <FaUserMinus /> : <FaUserPlus />}
                iconPosition="left"
                iconClassName="text-white"
                className="flex items-center gap-1 font-semibold"
              />
            </div>
          </div>
          <div onClick={onImageClick}>
            <div className="relative aspect-square mb-3 rounded-lg overflow-hidden border-4 border-double border-white">
              <img src={image} alt={name} />
            </div>
            <div className="bg-white/90 backdrop-blur rounded-lg p-3 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-md py-1 rounded-full text-gray-500 tracking-wider">
                  {t('card.types')}:
                </span>
                {types.map((type, i) => (
                  <div key={type}>
                    <span className="text-md font-semibold text-red-400 mr-2">
                      {type}
                    </span>
                    {i !== types.length - 1 && <span>/</span>}
                  </div>
                ))}
              </div>
              <StatsList stats={stats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
