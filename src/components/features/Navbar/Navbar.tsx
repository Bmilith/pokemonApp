import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { DarkMode } from '../DarkMode/DarkMode';
import { Button, Dropdown, Logo } from '@/components/core';
import { SearchInput } from '@/components/features';

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const MenuLinks = [
    { nameKey: 'nav.home', link: '/home' },
    { nameKey: 'nav.teamBuilder', link: '/team-builder' },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-white duration-200 shadow-md">
      <div className="py-4">
        <div className="p-[1rem] flex justify-between items-center">
          <section className="flex gap-4 items-center">
            <div className="lg:hidden">
              <Button
                onClick={() => setMobileOpen(!mobileOpen)}
                variant="secondary"
                icon={
                  <RxHamburgerMenu
                    size={30}
                    className="text-black dark:text-white"
                  />
                }
                className="text-gray-600 dark:text-gray-300"
              />
            </div>
            <Logo title={t('logoTitle')} />
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li
                    key={index}
                    className="inline-block px-4 text-gray-500 hover:text-black dark:hover:text-white duration-200"
                  >
                    <Link to={data.link} className="your-css-classes">
                      {t(data.nameKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <div className="flex gap-4">
            <section className="flex justify-between items-center gap-4">
              <SearchInput />
              <DarkMode />
            </section>
            <div className="hidden lg:flex gap-4">
              <Dropdown
                multiSelect={false}
                options={['en']}
                selectedValues={[i18n.language]}
                onToggle={(lang) => changeLanguage(lang)}
              />
            </div>
          </div>
        </div>
        {mobileOpen && (
          <div className="block lg:hidden px-4 pt-2 border-t border-gray-200 dark:border-gray-700 ">
            <ul className="flex flex-col gap-5">
              {MenuLinks.map((data, index) => (
                <li key={index}>
                  <Link to={data.link} className="your-css-classes">
                    {t(data.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="w-1/3 mt-4">
              <Dropdown
                multiSelect={false}
                options={['en']}
                selectedValues={[i18n.language]}
                onToggle={(lang) => changeLanguage(lang)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
