import { useTranslation } from 'react-i18next';
import { Heading, Hero } from '@/components/core';
import { FilterPanel, PokemonList } from '@/components/features';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-[1rem] bg-gradient-to-br dark:from-gray-900 dark:via-red-900 dark:to-black">
      <Hero />
      <div className="grid mt-3 text-center">
        <Heading
          title={t('home_heading.title')}
          subTitle={t('home_heading.subtitle')}
        />
        <FilterPanel />
        <PokemonList />
      </div>
    </div>
  );
};
