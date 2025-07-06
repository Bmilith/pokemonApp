import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { pikachu, BackgroundImage } from '@/assets';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div
      className="h-screen mx-auto grid place-items-center text-center px-8"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="flex flex-col items-center">
        <img src={pikachu} className="w-100 h-80 mx-auto" />
        <h1 className="mt-10 !text-3xl !leading-snug md:!text-4xl text-white font-semibold">
          {t('notFound.title')}
        </h1>
        <p className="mt-8 mb-14 text-[18px] font-normal text-white font-semibold mx-auto md:max-w-sm">
          {t('notFound.subtitle')}
        </p>
        <Link
          className="p-2 px-8 bg-white text-red-600 font-semibold hover:bg-black rounded-md"
          to="/home?page=1&pageSize=20"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
};
