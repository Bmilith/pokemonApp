import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/core';

interface HeroSlideItemProps {
  title: string;
  title2: string;
  description: string;
  image: string;
  index: number;
}

export const HeroSlideItem = ({
  title,
  title2,
  description,
  image,
  index,
}: HeroSlideItemProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <section className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold text-red-400">
            {title}
          </h1>
          <h1 className="text-2xl sm:text-5xl lg:text-7xl font-bold text-red-700">
            {title2}
          </h1>
          <h1 className="text-2xl uppercase text-white dark:text-white/50 sm:text-4xl md:text-8xl xl:text-[120px] font-bold">
            {description}
          </h1>
          <div className="p-2 mx-auto sm:mx-0">
            <Button
              label={
                index === 0
                  ? t('heroSlider.button.compare')
                  : t('heroSlider.button.team')
              }
              onClick={() => {
                if (index === 0) {
                  navigate(`/compare/pikachu/with/accelgor`);
                } else {
                  navigate('/team-builder');
                }
              }}
              variant="primary"
              width={210}
            />
          </div>
        </section>
        <section className="order-1 sm:order-2">
          <div>
            <img
              src={image}
              alt={title}
              className="mx-auto max-w-full h-auto sm:max-w-[450px] sm:h-[450px] sm:scale-105 lg:scale-110 object-contain drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
